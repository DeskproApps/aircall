import { CreateContactFormMeta, createContactSchema, setFormDefaultValues } from "../schema"
import { useFieldArray, useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import useQueryMutationWithClient from "@/hooks/useQueryMutation"
import { createContact } from "@/api/contacts"
import { CreateContactPayload } from "@/api/contacts/createContact"
import { Contact } from "@/types/aircall"
import { useNavigate } from "react-router-dom"
import { AircallError, isErrorWithTroubleshoot } from "@/api/baseRequest"

export default function useCreateContactForm(phoneNumber: string | undefined) {
  const navigate = useNavigate()
  const [submissionError, setSubmissionError] = useState<string | null>(null)

  const { register, clearErrors, control, formState: { errors }, handleSubmit, setValue, watch: getValue } = useForm<CreateContactFormMeta>({
    resolver: zodResolver(createContactSchema),
    defaultValues: setFormDefaultValues(phoneNumber)
  })

  const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
    control,
    name: "emails",
  })

  const { fields: phoneNumberField, append: appendPhoneNumber, remove: removePhoneNumber } = useFieldArray({
    control,
    name: "phoneNumbers",
  })

  const defaultArrayField = {
    label: "",
    value: ""
  }

  const emails = {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
    default: defaultArrayField
  }

  const phoneNumbers = {
    fields: phoneNumberField,
    append: appendPhoneNumber,
    remove: removePhoneNumber,
    default: defaultArrayField
  }

  const submitFormMutation = useQueryMutationWithClient<CreateContactPayload, { contact: Contact }>(async (client, data) => {
    return await createContact(client, data)
  }
  )

  async function onSubmit(formMeta: CreateContactFormMeta): Promise<void> {
    setSubmissionError(null)

    const payload = buildCreateContactPayload(formMeta)

    await submitFormMutation.mutateAsync(payload, {
      onSuccess: (data) => {
        void navigate(`/contacts/${data.contact.id}`)
      },
      onError: (e) => {
        let errorMessage = "An unexpected error occurred while creating the contact."

        if (e instanceof AircallError && isErrorWithTroubleshoot(e.data)) {
          errorMessage = e.data.troubleshoot
        } else if (e instanceof Error) {
          errorMessage = e.message
        }
        setSubmissionError(errorMessage)
      }
    })
  }

  return {
    emails,
    phoneNumbers,
    form: {
      register,
      clearErrors,
      errors,
      values: {
        set: setValue,
        get: getValue
      },
      onSubmit: handleSubmit(onSubmit),
      isSubmitting: submitFormMutation.isLoading,
      submissionError
    }
  }
}

function buildCreateContactPayload(formMeta: CreateContactFormMeta): CreateContactPayload {
  const companyName = formMeta.companyName
  const isValidCompanyName = typeof companyName === "string" && companyName.trim() !== ""

  return {
    first_name: formMeta.firstName,
    last_name: formMeta.lastName,
    company_name: isValidCompanyName ? companyName : undefined,
    phone_numbers: formMeta.phoneNumbers.map(({ label, value }) => {
      return {
        label,
        value
      }
    }),
    emails: formMeta.emails?.map(({ label, value }) => {
      return {
        label,
        value
      }
    }) ?? [],
  }

}