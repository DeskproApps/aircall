import { getCallsByNumber } from "@/api/calls"
import { useQueryWithClient } from "@deskpro/app-sdk"

export function useCalls(phoneNumbers: string[]) {
    const response = useQueryWithClient(
        ["contactCalls", phoneNumbers.toString()],
        (client) => {

            return Promise.all(phoneNumbers.map((phoneNumber) => {
                return getCallsByNumber(client, phoneNumber)
            }))
        },
    )

    return {
        calls: response.data?.flatMap((callResponse) => {
            return callResponse.calls
        }) ?? [],
        isLoading: response.isLoading,
    }
}