import { Button, Label, Stack } from "@deskpro/deskpro-ui";
import { ErrorText, TextArea } from "@/components/forms";
import { useDeskproAppTheme, useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { useParams } from "react-router-dom";
import Callout from "@/components/Callout";
import useCreateCallCommentForm from "./hooks/useCreateCallCommentForm";

export default function CreateCallCommentPage() {
    useInitialisedDeskproAppClient((client) => {
        client.setTitle("Create Comment")
    }, [])

    useDeskproElements(({ clearElements, registerElement }) => {
        clearElements()
        registerElement("home", { type: "home_button" })
        registerElement("refresh", { type: "refresh_button" })
        registerElement("menu", {
            type: "menu",
            items: [
                {
                    title: "View Contacts",
                    payload: {
                        type: "changePath",
                        path: "/contacts"
                    },
                }
            ]
        })
    }, [])

    const { callId } = useParams()
    const { theme } = useDeskproAppTheme()
    const { values, register, onCancel, onSubmit, errors, isSubmitting, submissionError } = useCreateCallCommentForm(callId)

    const formHasVisibleErrors = Object.keys(errors).length > 0

    return (
        <form onSubmit={(e) => { void onSubmit(e) }}>
            <Stack vertical padding={12} gap={12} style={{ width: "100%" }}>
                <Label label={"Content"}>
                    <TextArea
                        variant="inline"
                        id="comment"
                        minHeight="auto"
                        placeholder="Enter content"
                        error={!!errors.content}
                        value={values.get("content")}
                        {...register("content")}
                    />
                    <ErrorText theme={theme}>
                        {errors.content?.message}
                    </ErrorText>
                </Label>

                {submissionError && (
                    <Stack style={{ width: "100%" }}>
                        <Callout
                            accent="red"
                            style={{ width: "100%" }}
                        >
                            {submissionError}
                        </Callout>
                    </Stack>
                )}

                <Stack justify="space-between" style={{ width: "100%" }}>
                    <Button
                        type={"submit"}
                        text={"Create"}
                        loading={isSubmitting}
                        disabled={formHasVisibleErrors || isSubmitting}
                    />

                    <Button
                        type="button"
                        text="Cancel"
                        intent="secondary"
                        onClick={onCancel}
                    />
                </Stack>
            </Stack>
        </form>
    )
}