import { AircallError, isErrorWithTroubleshoot } from "@/api/aircallRequest";
import { CreateCallCommentFormMeta, createCallCommentSchema, defaultFormValues } from "../schema";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import createCallComment, { CreateCallCommentParams } from "@/api/calls/createCallComment";
import isValidInteger from "@/utils/isValidInteger";
import useQueryMutationWithClient from "@/hooks/useQueryMutation";

export default function useCreateCallCommentForm(callId: string | undefined) {
    const navigate = useNavigate()
    const { register, formState: { errors }, handleSubmit, setValue, watch: getValue, } = useForm<CreateCallCommentFormMeta>({
        resolver: zodResolver(createCallCommentSchema),
        defaultValues: defaultFormValues
    })

    const [submissionError, setSubmissionError] = useState<string | null>(null)

    const submitFormMutation = useQueryMutationWithClient<CreateCallCommentParams, void>(async (client, data) => {
        return await createCallComment(client, data)
    }
    )

    async function onSubmit(formData: CreateCallCommentFormMeta): Promise<void> {
        if (!callId || !isValidInteger(callId)) {
            setSubmissionError("Invalid callId in URL.")
            return
        }
        setSubmissionError(null)

        const data = {
            callId,
            payload: {
                content: formData.content
            }
        }

        await submitFormMutation.mutateAsync(data, {
            onSuccess: () => {
                void navigate(`/calls/${callId}`)
            },
            onError: (e) => {
                let errorMessage = "An unexpected error occurred while creating the comment."

                if (e instanceof AircallError && isErrorWithTroubleshoot(e.data)) {
                    // Ideally this should never happen.
                    if (e.data.troubleshoot === "Maximum of 4 notes can be added to a call at once") {
                        errorMessage = e.data.troubleshoot
                    }
                } else if (e instanceof Error) {
                    errorMessage = e.message
                }
                setSubmissionError(errorMessage)
            }
        })
    }

    function onCancel() {
        if (!callId || !isValidInteger(callId)) {
            return
        }
        navigate(`/calls/${callId}`)
    }

    return {
        register,
        errors,
        values: {
            get: getValue,
            set: setValue
        },
        onCancel,
        onSubmit: handleSubmit(onSubmit),
        submissionError,
        isSubmitting: submitFormMutation.isLoading
    }
}