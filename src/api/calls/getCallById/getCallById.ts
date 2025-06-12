import { Call } from "@/types/aircall";
import { createSearchParams } from "react-router-dom";
import { IDeskproClient } from "@deskpro/app-sdk";
import aircallRequest, { AircallError, isErrorWithTroubleshoot } from "@/api/aircallRequest";

export default async function getCallById(client: IDeskproClient, callId: string) {
    try {
        return await aircallRequest<{ call: Call }>(client, {
            endpoint: `calls/${callId}?${createSearchParams([
                ["fetch_contact", "true"],
            ]).toString()}`,
        })
    } catch (e) {
        if (e instanceof AircallError) {
            if (isErrorWithTroubleshoot(e.data) && e.data.troubleshoot === "Check ID of the resource") {
                return null
            }
        }

        throw e
    }


}