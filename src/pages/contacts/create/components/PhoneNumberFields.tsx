import { Button, DeskproTheme } from "@deskpro/deskpro-ui";
import { ErrorText, InputGroup } from "@/components/forms";
import { Fragment } from "react/jsx-runtime";
import { HorizontalDivider } from "@deskpro/app-sdk";
import useCreateContactForm from "../hooks/useCreateContactForm";

type UseCreateContactFormReturn = ReturnType<typeof useCreateContactForm>
interface PhoneNumberFieldsProps {
  phoneNumbers: UseCreateContactFormReturn["phoneNumbers"]
  phoneNumberErrors: UseCreateContactFormReturn["form"]["errors"]["phoneNumbers"]
  register: UseCreateContactFormReturn["form"]["register"]
  theme: DeskproTheme
}
export function PhoneNumberFields(props: Readonly<PhoneNumberFieldsProps>) {
  const { phoneNumbers, phoneNumberErrors, register, theme } = props

  return (<>
    {phoneNumbers.fields.map((phoneNumberField, index) => {
      return (
        <Fragment key={phoneNumberField.id}>
          <InputGroup
            type="text"
            label="Label"
            defaultValue={phoneNumberField.label ?? ""}
            hasError={!!phoneNumberErrors?.[index]?.label}
            required
            name={`phoneNumbers.${index}.label`}
            theme={theme}
            register={register(`phoneNumbers.${index}.label`)}
          />
          <ErrorText theme={theme}>
            {phoneNumberErrors?.[index]?.label?.message}
          </ErrorText>

          <InputGroup
            type="text"
            label="Number"
            defaultValue={phoneNumberField.value ?? ""}
            hasError={!!phoneNumberErrors?.[index]?.value}
            required
            name={`phoneNumbers.${index}.value`}
            theme={theme}
            register={register(`phoneNumbers.${index}.value`)}
          />
          <ErrorText theme={theme}>
            {phoneNumberErrors?.[index]?.value?.message}
          </ErrorText>

          {/* A contact must have at least one number. */}
          {index !== 0 && (<Button intent="secondary" text="Remove" onClick={() => {
            phoneNumbers.remove(index)
          }} />)}

          {/* Don't show the divider for the last element. */}
          {index + 1 !== phoneNumbers.fields.length && (<HorizontalDivider style={{ width: "100%", marginBottom: 0 }} />)}
        </Fragment>
      )
    })}

    {/* Don't allow more than 20 numbers. */}
    {phoneNumbers.fields.length < 20 && (<Button intent="secondary" text={`Add ${phoneNumbers?.fields.length ? "another" : "a"} number`} onClick={() => {
      phoneNumbers.append(phoneNumbers.default)
    }} />)}

  </>)
}