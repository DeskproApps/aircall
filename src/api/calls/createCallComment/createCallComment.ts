import baseRequest from "@/api/baseRequest";
import { IDeskproClient } from "@deskpro/app-sdk";

interface CallCommentPayload {
    content: string
}

export interface CreateCallCommentParams {
    callId: string,
    payload: CallCommentPayload
}

export default async function createCallComment(client: IDeskproClient, params: CreateCallCommentParams) {
    const { callId, payload } = params

    return await baseRequest<void>(client, {
        endpoint: `calls/${callId}/comments`,
        method: "POST",
        data: payload
    })

}