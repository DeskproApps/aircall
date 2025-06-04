import { CreateContactFormMeta, createContactSchema, setFormDefaultValues } from "../schema"
import { useFieldArray, useForm } from "react-hook-form"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"

export default function useCreateContactForm(phoneNumber: string | undefined) {
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
      onSubmit: handleSubmit(() => {
        // REPLACE ME
      }),
      submissionError
    }
  }
}