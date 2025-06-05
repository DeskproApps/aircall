import { Contact } from "@/types/aircall";
import { IDeskproClient } from "@deskpro/app-sdk";
import baseRequest from "@/api/baseRequest";

export interface CreateContactPayload {
  first_name: string
  last_name: string
  company_name?: string
  information?: string
  emails: {
    label: string
    value: string
  }[]
  phone_numbers: {
    label: string
    value: string
  }[]
}

export default async function createContact(client: IDeskproClient, payload: CreateContactPayload): Promise<{ contact: Contact }> {
  return await baseRequest<{ contact: Contact }>(client, { endpoint: "contacts", method: "POST", data: payload })
}