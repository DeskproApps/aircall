import { Contact } from "@/types/aircall";
import { IDeskproClient } from "@deskpro/app-sdk";
import aircallRequest, { AircallError, isErrorWithTroubleshoot } from "@/api/aircallRequest";

export default async function getContactById(client: IDeskproClient, contactId: string) {
  try {
    return await aircallRequest<{ contact: Contact }>(client, {
      endpoint: `contacts/${contactId}`,
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