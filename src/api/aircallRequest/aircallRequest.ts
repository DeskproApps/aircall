import { IDeskproClient, proxyFetch } from "@deskpro/app-sdk";

interface AircallRequestParams {
    endpoint: string,
    method?: "GET" | "POST",
    data?: unknown
}

/**
 * Wrapper fetch function for requests to the Aircall API.
 *
 * @template T - The type of the response data.
 * 
 * @throws {AircallError} If the HTTP status code indicates a failed request (not 2xx or 3xx).
 */
export default async function aircallRequest<T>(client: IDeskproClient, params: AircallRequestParams): Promise<T> {
    const { endpoint, method, data } = params

    const baseURL = `https://api.aircall.io/v1`
    const requestURL = `${baseURL}/${endpoint}`

    const dpFetch = await proxyFetch(client)

    const options: RequestInit = {
        method,
        headers: {
            Authorization: `Basic __aircall_api_id+':'+aircall_api_token.base64__`,
            "Content-Type": "application/json",
        },
    }

    if (data) {
        options.body = JSON.stringify(data)
    }

    const response = await dpFetch(requestURL, options)

    if (isResponseError(response)) {
        let errorData: unknown
        const rawText = await response.text()

        try {
            errorData = JSON.parse(rawText)
        } catch {
            errorData = { message: "Unexpected response from Aircall. The error format was not recognised.", raw: rawText }
        }

        throw new AircallError("API Request Failed", { statusCode: response.status, data: errorData })

    }

    return await response.json() as T
}

interface AircallErrorPayload {
    statusCode: number
    data?: unknown
}

export class AircallError extends Error {
    data: AircallErrorPayload["data"]
    statusCode: AircallErrorPayload["statusCode"]

    constructor(message: string, payload: AircallErrorPayload) {
        super(message)
        this.name = "AircallError"
        this.data = payload.data
        this.statusCode = payload.statusCode
    }
}

function isResponseError(response: Response): boolean {
    return response.status < 200 || response.status >= 400
}

