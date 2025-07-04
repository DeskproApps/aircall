import { getContacts } from "@/api/contacts"
import { useQueryWithClient } from "@deskpro/app-sdk"
import { useEffect, useState } from "react"

interface UseContactsParams {
  searchQuery: string
}

export const CONTACTS_PER_PAGE = 10
export default function useContacts(params: Readonly<UseContactsParams>) {
  const { searchQuery } = params

  const [currentPage, setCurrentPage] = useState<number>(1)
  const [totalContacts, setTotalContacts] = useState<number>(0)

  // Reset the page whenever the search query changes so the user isn't on a page that doesn't exist.
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery])

  const contactsResponse = useQueryWithClient(
    ["contacts", searchQuery, currentPage.toString()],
    (client) => {
      return getContacts(client, { phoneNumber: searchQuery, email: searchQuery, page: currentPage, perPage: CONTACTS_PER_PAGE })
    }
  )

  useEffect(() => {
    if (contactsResponse.data?.meta.total !== undefined) {
      setTotalContacts(contactsResponse.data.meta.total)
    }
  }, [contactsResponse.data?.meta.total])



  return {
    isLoading: contactsResponse.isLoading,
    contacts: contactsResponse.data?.contacts ?? [],
    totalContacts,
    page: currentPage,
    setPage: setCurrentPage
  }

}