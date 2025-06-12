import aircallRequest from "@/api/aircallRequest";
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

    return await aircallRequest<void>(client, {
        endpoint: `calls/${callId}/comments`,
        method: "POST",
        data: payload
    })

}