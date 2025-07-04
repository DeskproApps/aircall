import { DeskproTheme } from "@deskpro/deskpro-ui"
import { ErrorText, InputGroup } from "@/components/forms"
import { HTMLInputTypeAttribute } from "react"
import useCreateContactForm from "../hooks/useCreateContactForm"

type AllowedFields = "firstName" | "lastName" | "companyName"
interface FormFieldProps {
  type?: HTMLInputTypeAttribute
  name: AllowedFields
  required?: boolean
  label: string
  form: ReturnType<typeof useCreateContactForm>["form"]
  theme: DeskproTheme
}
export function FormField(props: Readonly<FormFieldProps>) {
  const { type = "text", name, required = false, theme, label, form } = props

  return (
    <>
      <InputGroup
        type={type}
        label={label}
        name={name}
        hasError={!!form.errors[name]}
        required={required}
        register={form.register(name)}
        theme={theme}
      />
      <ErrorText theme={theme}>
        {form.errors[name]?.message}
      </ErrorText>
    </>
  )
}
