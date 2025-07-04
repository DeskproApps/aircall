import { getCallById } from "@/api/calls"
import { useQueryWithClient } from "@deskpro/app-sdk"
import isValidInteger from "@/utils/isValidInteger"

export default function useCall(callId: string) {
    const isValidCallId = isValidInteger(callId)

    const callResponse = useQueryWithClient(
        ["call", callId],
        (client) => {
            return getCallById(client, callId)
        },
        {
            enabled: isValidCallId
        }
    )

    return {
        isLoading: isValidCallId && callResponse.isLoading,
        call: callResponse.data
    }
}