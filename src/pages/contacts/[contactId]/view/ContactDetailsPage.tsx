import { LoadingSpinner, Property, useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { P1, P3, Stack } from "@deskpro/deskpro-ui";
import { useParams } from "react-router-dom";
import Callout from "@/components/Callout";
import isValidInteger from "@/utils/isValidInteger";
import useContact from "@/hooks/useContact";

export default function ContactDetailsPage() {
  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Contact")
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

  const { contactId } = useParams()
  const { isLoading, contact } = useContact(contactId ?? "")

  if (!contactId || !isValidInteger(contactId)) {
    return (
      <Stack padding={12}>
        <Callout accent="red" style={{ width: "100%" }}>
          Invalid url parameter: contactId.
        </Callout>
      </Stack>
    )
  }

  if (isLoading) {
    return (
      <Stack align="center" justify="center" style={{ width: "100%" }}>
        <LoadingSpinner />
      </Stack>
    )
  }

  if (!contact) {
    return (
      <Stack padding={12}>
        <Callout accent="red" style={{ width: "100%" }}>
          No contact found with the id "{contactId}".
        </Callout>
      </Stack>
    )
  }

  const contactHasEmails = contact.emails.length > 0
  const contactHasPhoneNumbers = contact.phone_numbers.length > 0
  const contactName = `${contact.first_name} ${contact.last_name}`

  return (
    <Stack vertical gap={3} padding={12}>
      <P3>{contactName}</P3>
      <Property label={"ID"} text={contactId} />
      <Property label={"Phone"} text={contactHasPhoneNumbers ? <ListArrayItems items={contact.phone_numbers} /> : undefined} />
      <Property label={"Email"} text={contactHasEmails ? <ListArrayItems items={contact.emails} /> : undefined} />
      <Property label={"Company"} text={contact.company_name} />
    </Stack>
  )

}

interface Item {
  id: number
  label: string
  value: string
}


function ListArrayItems(props: Readonly<{ items: Item[] }>) {
  const { items } = props
  return (
    <Stack gap={5} style={{ flexWrap: "wrap" }}>
      {items.map((item) => {
        return <P1 key={item.id} title={item.label}>{item.value}</P1>
      })}

    </Stack>
  )
}