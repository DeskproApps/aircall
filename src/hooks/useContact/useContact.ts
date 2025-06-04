import { getContactById } from "@/api/contacts"
import { useQueryWithClient } from "@deskpro/app-sdk"
import isValidInteger from "@/utils/isValidInteger"

export default function useContact(contactId: string) {
    const isValidContactId = isValidInteger(contactId)

    const contactResponse = useQueryWithClient(
        ["contact", contactId],
        (client) => {
            return getContactById(client, contactId)
        },
        {
            enabled: isValidContactId
        }
    )

    return {
        isLoading: isValidContactId && contactResponse.isLoading,
        contact: contactResponse.data?.contact
    }
}