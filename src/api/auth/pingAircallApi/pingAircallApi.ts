import { adminGenericProxyFetch, IDeskproClient, proxyFetch } from "@deskpro/app-sdk";

interface PingAircallApiParams {
    aircallApiId: string;
    aircallApiToken: string;
}

export default async function pingAircallApi(client: IDeskproClient, params?: PingAircallApiParams): Promise<boolean> {
    const { aircallApiId, aircallApiToken } = params ?? {}

    const dpFetch = await (params ? adminGenericProxyFetch : proxyFetch)(client)

    const tokens = params? `${btoa(aircallApiId + ":" + aircallApiToken)}` : `__aircall_api_id+':'+aircall_api_token.base64___`
    try {
        const response = await dpFetch(`https://api.aircall.io/v1/ping`, {
            method: "GET",
            headers: {
                Authorization: `Basic ${tokens}`
            }
        })

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