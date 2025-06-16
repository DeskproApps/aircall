import { Button, Stack } from "@deskpro/deskpro-ui";
import { CredentialStatus } from "./components/CredentialStatus";
import { useDeskproAppClient, useDeskproAppEvents, useDeskproAppTheme } from "@deskpro/app-sdk";
import { useState } from "react";
import useVerifySettings from "./hooks/useVerifySettings";

interface AdminDrawerSettings {
    aircall_api_id?: string
    aircall_api_token?: string
}

export default function VerifySettingsPage(): JSX.Element {
    const { client } = useDeskproAppClient()
    const [settings, setSettings] = useState<AdminDrawerSettings | null>(null)

    useDeskproAppEvents({
        onAdminSettingsChange: setSettings,
    }, [client])

    const { theme } = useDeskproAppTheme()

    const { isLoading, isValid, onVerifyClick } = useVerifySettings({
        aircallApiId: settings?.aircall_api_id,
        aircallApiToken: settings?.aircall_api_token,
    })

    const isIncompleteSettings = !settings?.aircall_api_id?.trim() || !settings?.aircall_api_token?.trim()
    const isDisabled = isIncompleteSettings || isLoading

    return (
        <Stack gap={8} align={"center"}>
            <Button
                style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
                text="Verify Settings"
                intent="secondary"
                disabled={isDisabled}
                onClick={onVerifyClick}
            />

            <CredentialStatus theme={theme} isLoading={isLoading} isValid={isValid} />
        </Stack>
    )
}