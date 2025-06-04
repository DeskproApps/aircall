import { Button, DeskproTheme } from "@deskpro/deskpro-ui";
import { ErrorText, InputGroup } from "@/components/forms";
import { Fragment } from "react/jsx-runtime";
import { HorizontalDivider } from "@deskpro/app-sdk";
import useCreateContactForm from "../hooks/useCreateContactForm";

type UseCreateContactFormReturn = ReturnType<typeof useCreateContactForm>

interface EmailFieldsProps {
  emails: UseCreateContactFormReturn["emails"]
  emailErrors: UseCreateContactFormReturn["form"]["errors"]["emails"]
  register: UseCreateContactFormReturn["form"]["register"]
  theme: DeskproTheme
}
export function EmailFields(props: Readonly<EmailFieldsProps>) {
  const { emails, emailErrors, register, theme } = props

  return (<>
    {emails.fields.map((emailField, index) => {
      return (
        <Fragment key={emailField.id}>
          <InputGroup
            type="text"
            label="Label"
            defaultValue={emailField.label ?? ""}
            hasError={!!emailErrors?.[index]?.label}
            required
            name={`emails.${index}.label`}
            theme={theme}
            register={register(`emails.${index}.label`)}
          />
          <ErrorText theme={theme}>
            {emailErrors?.[index]?.label?.message}
          </ErrorText>

          <InputGroup
            type="text"
            label="Email"
            defaultValue={emailField.value ?? ""}
            hasError={!!emailErrors?.[index]?.value}
            required
            name={`emails.${index}.value`}
            theme={theme}
            register={register(`emails.${index}.value`)}
          />
          <ErrorText theme={theme}>
            {emailErrors?.[index]?.value?.message}
          </ErrorText>

          <Button
            intent="secondary"
            text="Remove"
            onClick={() => { emails.remove(index) }}
          />

          {/* Don't show the divider for the last element. */}
          {index + 1 !== emails.fields.length && (<HorizontalDivider style={{ width: "100%", marginBottom: 0 }} />)}
        </Fragment>
      )
    })}

    {/* Don't allow more than 20 emails. */}
    {emails.fields.length < 20 && (<Button intent="secondary" text={`Add ${emails?.fields.length ? "another" : "an"} email`} onClick={() => {
      emails.append(emails.default)
    }} />)}

  </>)
}