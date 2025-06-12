import { adminGenericProxyFetch, IDeskproClient } from "@deskpro/app-sdk";

interface verifyAircallAdminCredentialsParams {
    aircallApiId: string;
    aircallApiToken: string;
}

export default async function verifyAircallAdminCredentials(client: IDeskproClient, params: verifyAircallAdminCredentialsParams): Promise<boolean> {
    const { aircallApiId, aircallApiToken } = params;

    const dpFetch = await adminGenericProxyFetch(client)

    try {
        const response = await dpFetch(`https://${aircallApiId}:${aircallApiToken}@api.aircall.io/v1/ping`)

        if (!response.ok) {
            // eslint-disable-next-line no-console
            console.error("Failed to verify credentials: ", response.statusText);
            return false;
        }

        return true
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        // eslint-disable-next-line no-console
        console.error("Error verifying credentials: ", errorMessage );
        return false;
    }
}