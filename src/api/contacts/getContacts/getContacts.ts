import { Contact, ResponseMeta } from "@/types/aircall";
import { IDeskproClient } from "@deskpro/app-sdk";
import baseRequest from "@/api/baseRequest";
import z from "zod";

const phoneNumberSchema = z.string().regex(/^\+?\d+$/, {
  message: "Phone number must be numeric and may optionally start with +",
})

interface GetContactsParams {
  phoneNumber?: string,
  email?: string
  perPage?: number,
  page?: number
  sort?: "asc" | "desc",
}

interface GetContactsResponse {
  contacts: Contact[]
  meta: ResponseMeta
}

export default async function getContacts(client: IDeskproClient, params: Readonly<GetContactsParams>): Promise<GetContactsResponse> {
  const { phoneNumber, email, page = 1, perPage = 50, sort = "desc" } = params

  const searchParams = new URLSearchParams()

  if (phoneNumber) {
    const trimmedPhone = phoneNumber.replace(/\s+/g, "")
    const parsedPhone = phoneNumberSchema.safeParse(trimmedPhone)
    if (parsedPhone.success) {
      searchParams.set("phone_number", trimmedPhone);
    }
  }

  if (email) {
    searchParams.set("email", email.replace(/\s+/g, ""))
  }

  searchParams.set("per_page", perPage.toString())
  searchParams.set("page", page.toString())
  searchParams.set("order", sort)


  return await baseRequest<GetContactsResponse>(client, {
    endpoint: `contacts/search?${searchParams.toString()}`,
  })
}