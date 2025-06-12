import { pingAircallApi } from "@/api/auth";
import { useDeskproAppClient } from "@deskpro/app-sdk";
import { useState } from "react";

interface UseVerifySettingsReturn {
    isLoading: boolean
    onVerifyClick: () => Promise<void>
    isValid: boolean | undefined
}

interface UseVerifySettingsParams {
    aircallApiId: string | undefined
    aircallApiToken: string | undefined
}
export default function useVerifySettings(params: UseVerifySettingsParams): UseVerifySettingsReturn {
    const { client } = useDeskproAppClient()
    const { aircallApiId, aircallApiToken } = params
    const [isValid, setIsValid] = useState<boolean | undefined>(undefined)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onVerifyClick() {
        if (!aircallApiId || !aircallApiToken || !client) {
            return
        }

        setIsLoading(true)

        const isValid = await pingAircallApi(client,
            { aircallApiId, aircallApiToken })

        setIsValid(isValid)
        setIsLoading(false)
    }

    return {
        isLoading,
        isValid,
        onVerifyClick
    }
}