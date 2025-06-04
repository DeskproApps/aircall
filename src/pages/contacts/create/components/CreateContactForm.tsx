import { Button, DeskproTheme, Stack } from "@deskpro/deskpro-ui";
import { EmailFields, FormField, PhoneNumberFields } from "./";
import { FormSection } from "@/components/forms";
import useCreateContactForm from "../hooks/useCreateContactForm";

interface CreateContactFormProps {
  phoneNumber: string | undefined
  theme: DeskproTheme
}

export function CreateContactForm(props: Readonly<CreateContactFormProps>) {
  const { phoneNumber, theme } = props
  const { form, phoneNumbers, emails } = useCreateContactForm(phoneNumber)
  const formHasVisibleErrors = Object.keys(form.errors).length > 0

  return (
    <form onSubmit={(e) => { void form.onSubmit(e) }}>
      <Stack vertical gap={0} style={{ width: "100%" }}>
        <FormSection>
          <FormField name="firstName" required theme={theme} label="First Name" form={form} />
          <FormField name="lastName" required theme={theme} label="Last Name" form={form} />
          <FormField name="companyName" theme={theme} label="Company Name" form={form} />
        </FormSection>

        <FormSection headingText="Phone Numbers">
          <PhoneNumberFields
            phoneNumberErrors={form.errors.phoneNumbers}
            phoneNumbers={phoneNumbers}
            register={form.register}
            theme={theme} />
        </FormSection>

        <FormSection headingText="Emails">
          <EmailFields
            emailErrors={form.errors.emails}
            emails={emails}
            register={form.register}
            theme={theme} />
        </FormSection>

        <Stack gap={8} padding={12} justify="space-between" style={{ width: "100%" }}>
          <Button
            style={{ cursor: (formHasVisibleErrors) ? "not-allowed" : "pointer" }}
            type="submit"
            text={"Create"}
            // loading={form.isSubmitting}
            disabled={formHasVisibleErrors}
          />
        </Stack>
      </Stack>
    </form>
  )
}