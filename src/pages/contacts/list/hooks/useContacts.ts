import { getContacts } from "@/api/contacts"
import { useQueryWithClient } from "@deskpro/app-sdk"

interface UseContactsParams {
  searchQuery: string
}

export default function useContacts(params: Readonly<UseContactsParams>) {
  const { searchQuery } = params


  const contactsResponse = useQueryWithClient(
    ["contacts", searchQuery],
    (client) => {
      return getContacts(client, { phoneNumber: searchQuery, email: searchQuery })
    }
  )

  return {
    isLoading: contactsResponse.isLoading,
    contacts: contactsResponse.data?.contacts ?? []
  }

}