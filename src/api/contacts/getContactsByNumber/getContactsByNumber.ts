import { Contact } from "@/types/aircall";
import { createSearchParams } from "react-router-dom";
import { IDeskproClient } from "@deskpro/app-sdk";
import baseRequest from "@/api/baseRequest";

export default async function getContactsByNumber(client: IDeskproClient, phoneNumber: string) {

  return await baseRequest<{ contacts: Contact[] }>(client, {
    endpoint: `contacts/search?${createSearchParams([
      ["phone_number", phoneNumber.replace(/\s+/g, '')],
      ["per_page", "50"],
      ["fetch_contact", "true"],
      ["order", "desc"],
    ]).toString()}`,
  })
}