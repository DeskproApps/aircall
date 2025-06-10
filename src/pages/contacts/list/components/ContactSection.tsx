import { Contact } from "@/types/aircall"
import { DeskproTheme, Stack } from "@deskpro/deskpro-ui"
import { Fragment } from "react/jsx-runtime"
import { HorizontalDivider, Link, LoadingSpinner } from "@deskpro/app-sdk"

interface ContactSectionProps {
  contacts: Contact[]
  isLoading: boolean
  theme: DeskproTheme
}

export default function ContactSection(props: Readonly<ContactSectionProps>) {
  const { contacts, isLoading, theme } = props

  if (isLoading) {
    return (
      <Stack align="center" style={{ justifyContent: "center", width: "100%" }
      }>
        <LoadingSpinner />
      </Stack>
    )
  }

  if (!contacts.length) {
    return (
      <Stack padding={12} style={{ width: "100%" }}>
        <em style={{
          color: theme.colors.grey80,
          whiteSpace: "normal",
          wordBreak: "break-word",
          fontSize: "12px"
        }}>
          No matching contacts found. Please try again.
        </em>
      </Stack>
    )
  }

  return (
    <Stack vertical gap={6} style={{ width: "100%" }}>
      {contacts.map((contact) => {
        return (
          <Fragment key={contact.id}>
            <ContactItem contact={contact} theme={theme} />
            <HorizontalDivider style={{ width: "100%", marginBottom: "0px" }} />

          </Fragment>
        )
      })}
    </Stack>
  )
}

interface ContactItemProps {
  contact: Contact
  theme: DeskproTheme
}
function ContactItem(props: Readonly<ContactItemProps>) {
  const { contact, theme } = props

  return (
    <Stack padding={12} gap={5} vertical style={{ width: "100%" }}>
      <Link
        href={`/#/contacts/${contact.id}`}
        style={{ fontSize: "11px" }}
      >
        {contact.first_name} {contact.last_name}
      </Link>

      <Stack align="center" style={{ flexWrap: "wrap", columnGap: "5px" }}>
        {contact.emails.map((email) => {
          return (
            <span style={{ fontSize: "11px", color: theme.colors.grey80 }}>{`<${email.value}>`}</span>
          )
        })}
      </Stack>

      <Stack align="center" style={{ flexWrap: "wrap", columnGap: "5px" }}>
        {contact.phone_numbers.map((phoneNumber, index) => {
          return (
            <Fragment>
              <span style={{ fontSize: "11px" }}>{phoneNumber.value}</span>
              {index + 1 !== contact.phone_numbers.length && <span>•</span>}
            </Fragment>
          )
        })}
      </Stack>

    </Stack>
  )
}