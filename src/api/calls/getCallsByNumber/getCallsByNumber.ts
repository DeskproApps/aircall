import { Call } from "@/types/aircall";
import { createSearchParams } from "react-router-dom";
import { IDeskproClient } from "@deskpro/app-sdk";
import baseRequest from "@/api/baseRequest";

export default async function getCallsByNumber(client: IDeskproClient, phoneNumber: string) {

    return await baseRequest<{ calls: Call[] }>(client, {
        endpoint: `calls/search?${createSearchParams([
            ["phone_number", phoneNumber],
            ["per_page", "100"],
            ["fetch_contact", "true"],
            ["order", "desc"],
        ]).toString()}`,
    })
}