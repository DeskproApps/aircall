import "./ListContactsPage.css"
import { HorizontalDivider, Search, useDeskproAppTheme, useDeskproElements, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { P8, Pagination, Stack } from "@deskpro/deskpro-ui";
import { Required } from "@/components/forms";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import ContactSection from "./components/ContactSection";
import useContacts, { CONTACTS_PER_PAGE } from "./hooks/useContacts";
import useDebounce from "@/hooks/useDebounce";

export default function ListContactsPage() {
  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Contacts")
  }, [])

  useDeskproElements(({ clearElements, registerElement, deRegisterElement }) => {
    clearElements()
    deRegisterElement("menu")
    registerElement("home", { type: "home_button" })
    registerElement("refresh", { type: "refresh_button" })
  }, [])

  const { theme } = useDeskproAppTheme()

  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const defaultSearch = searchParams.get('filter')

  const [searchQuery, setSearchQuery] = useState<string>(defaultSearch ?? "")
  const { debouncedValue: debouncedSearchQuery } = useDebounce(searchQuery, 500)

  const { isLoading, contacts, totalContacts, page, setPage } = useContacts({ searchQuery: debouncedSearchQuery })

  return (
    <Stack vertical>
      <Stack className={"searchSection"} vertical padding={12} gap={5} style={{ width: "100%" }}>
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
            value: searchQuery,
            placeholder: `Search contact`
          }}
        />
      </Stack>

      <HorizontalDivider style={{ width: "100%", marginBottom: "0px" }} />

      <ContactSection theme={theme} contacts={contacts} isLoading={isLoading} />

      {/* Only showing pagination when necessary here because navArrow is buggy when totalItems is 0. */}
      {totalContacts > CONTACTS_PER_PAGE && (
        <Stack padding={12}>
          <Pagination
            perPage={CONTACTS_PER_PAGE}
            currentPage={page}
            totalItems={totalContacts}
            displayItems={["pageSelect", "navArrows", "total",]}
            itemsPerPageText="hug"
            uniqueItemsText=""
            ofTotalText="of {total}"
            onPageChange={(page) => { setPage(page) }}
          />
        </Stack>
      )}

    </Stack>
  )
}