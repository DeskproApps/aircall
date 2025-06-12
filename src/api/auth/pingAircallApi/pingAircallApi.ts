import { adminGenericProxyFetch, IDeskproClient, proxyFetch } from "@deskpro/app-sdk";

interface pingAircallApiParams {
    aircallApiId: string;
    aircallApiToken: string;
}

export default async function pingAircallApi(client: IDeskproClient, params?: pingAircallApiParams): Promise<boolean> {
    const { aircallApiId, aircallApiToken } = params ?? {}

    const dpFetch = await (params ? adminGenericProxyFetch : proxyFetch)(client)

    const tokens = params? `${aircallApiId}:${aircallApiToken}` : `__aircall_api_id__:__aircall_api_token__`
    try {
        const response = await dpFetch(`https://${tokens}@api.aircall.io/v1/ping`)

        if (!response.ok) {
            // eslint-disable-next-line no-console
            console.error("Failed to verify credentials: ", response.statusText);
            return false;
        }

        return true
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        // eslint-disable-next-line no-console
        console.error("Error verifying credentials: ", errorMessage);
        return false;
    }
}