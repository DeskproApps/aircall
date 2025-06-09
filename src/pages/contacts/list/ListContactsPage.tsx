import { Required } from "@/components/forms";
import useDebounce from "@/hooks/useDebounce";
import { HorizontalDivider, Search, useDeskproAppTheme, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { P8, Stack } from "@deskpro/deskpro-ui";
import { useState } from "react";
import useContacts from "./hooks/useContacts";

export default function ListContactsPage() {

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Contacts")
  }, [])

  const { theme } = useDeskproAppTheme()

  const [searchQuery, setSearchQuery] = useState("")
  const { debouncedValue: debouncedSearchQuery } = useDebounce(searchQuery, 500)

  const { isLoading, contacts } = useContacts({ searchQuery: debouncedSearchQuery })




  return (
    <Stack vertical>
      <Stack vertical padding={12} gap={5}>
        <label htmlFor="searchInput">
          <P8 style={{ color: theme?.colors?.grey80 }}>
            Phone number or email address <Required theme={theme} />
          </P8>
        </label>
        <Search
        isFetching={isLoading}
          marginBottom={0}
          onChange={(search) => {
            setSearchQuery(search)
          }}
          inputProps={{
            id: "searchInput",
            placeholder: `Search contact`
          }}
        />
      </Stack>

      <HorizontalDivider style={{ width: "100%", marginBottom: "0px" }} />

      <Stack vertical padding={12}>
        {contacts.map((contact)=>{
          return (<div>{contact.first_name} {contact.last_name}</div>)
        })}
      </Stack>
    </Stack>
  )
}