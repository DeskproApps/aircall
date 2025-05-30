import { useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Button, Stack, TSpan } from "@deskpro/deskpro-ui";
import useVerifySettings from "./hooks/useVerifySettings";

interface AdminDrawerSettings {
    aircall_api_id?: string
    aircall_api_token?: string
}

export default function VerifySettingsPage(): JSX.Element {
    const { context } = useDeskproLatestAppContext<unknown, AdminDrawerSettings>()
    const settings = context?.settings

    const { isLoading, isValid, onVerifyClick } = useVerifySettings({
        aircallApiId: settings?.aircall_api_id,
        aircallApiToken: settings?.aircall_api_token,
    })

    const errorMessage = "Failed verifying settings."
    const successMessage = "Settings verified successfully."

    const isIncompleteSettings = !settings?.aircall_api_id?.trim() || !settings?.aircall_api_token?.trim()

    return (
        <Stack gap={8} align={"center"}>
            <Button
                text="Verify Settings"
                intent="secondary"
                disabled={isIncompleteSettings || isLoading}
                loading={isLoading}
                onClick={onVerifyClick}
            />

            {isValid !== undefined &&
                (
                    <TSpan> {isValid ? successMessage : errorMessage}</TSpan>
                )
            }
        </Stack>
    )
}