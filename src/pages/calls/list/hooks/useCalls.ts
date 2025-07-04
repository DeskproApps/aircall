import { getAllCalls } from "@/api/calls/getCalls"
import { useQueryWithClient } from "@deskpro/app-sdk"
import { useMemo } from "react"

export function useCalls(phoneNumbers: string[]) {

    const response = useQueryWithClient(
        ["contactCalls", phoneNumbers.toString()],
        (client) => {
            return Promise.all(phoneNumbers.map((phoneNumber) => {
                return getAllCalls(client, { phoneNumber })
            }))
        },
    )

    const calls = useMemo(() => {
        if (!response.data) {
            return []
        }
        // Filter out failed requests and flatten successful ones.
        const successfulResponses = response.data.filter(res => {
            return res.success
        })

        const allCalls = successfulResponses.flatMap(res => {
            return res.data
        })

        // Sort by newest first
        return allCalls.sort((a, b) => {
            return new Date(b.started_at).getTime() - new Date(a.started_at).getTime()
        }
        )
    }, [response.data])
    
    return {
        calls,
        isLoading: response.isLoading
    }
}