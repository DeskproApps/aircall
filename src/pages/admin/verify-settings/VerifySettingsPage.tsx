import { Button, Stack } from "@deskpro/deskpro-ui";
import { CredentialStatus } from "./components/CredentialStatus";
import { useDeskproAppTheme, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import useVerifySettings from "./hooks/useVerifySettings";


interface AdminDrawerSettings {
    aircall_api_id?: string
    aircall_api_token?: string
}

export default function VerifySettingsPage(): JSX.Element {
    const { context } = useDeskproLatestAppContext<unknown, AdminDrawerSettings>()
    const { theme } = useDeskproAppTheme()
    const settings = context?.settings

    const { isLoading, isValid, onVerifyClick } = useVerifySettings({
        aircallApiId: settings?.aircall_api_id,
        aircallApiToken: settings?.aircall_api_token,
    })

    const isIncompleteSettings = !settings?.aircall_api_id?.trim() || !settings?.aircall_api_token?.trim()

    return (
        <Stack gap={8} align={"center"}>
            <Button
                text="Verify Settings"
                intent="secondary"
                disabled={isIncompleteSettings || isLoading}
                onClick={onVerifyClick}
            />

            <CredentialStatus theme={theme} isLoading={isLoading} isValid={isValid} />
        </Stack>
    )
}