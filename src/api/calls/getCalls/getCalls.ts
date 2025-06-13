import { Call, ResponseMeta } from "@/types/aircall";
import { IDeskproClient } from "@deskpro/app-sdk";
import aircallRequest from "@/api/aircallRequest";
import z from "zod";

const phoneNumberSchema = z.string().regex(/^\+?\d+$/, {
  message: "Phone number must be numeric and may optionally start with +",
})

interface GetCallsParams {
  phoneNumber?: string,
  email?: string
  perPage?: number,
  page?: number
  sort?: "asc" | "desc",
  includeContacts?: boolean
}

interface GetCallsResponse {
  calls: Call[]
  meta: ResponseMeta
}

export default async function getCalls(client: IDeskproClient, params: Readonly<GetCallsParams>): Promise<GetCallsResponse> {
  const { phoneNumber, email, page = 1, perPage = 50, sort = "desc", includeContacts = false } = params

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
  searchParams.set("fetch_contact", includeContacts ? "true" : "false")


  return await aircallRequest<GetCallsResponse>(client, {
    endpoint: `calls/search?${searchParams.toString()}`,
  })
}

export async function getAllCalls(client: IDeskproClient, params: Readonly<Omit<GetCallsParams, "perPage" | "page">>) {
  const { phoneNumber, email, sort, includeContacts } = params
  const calls: Call[] = []
  let hasMorePages = true
  let hasErrors = false
  let pagesFetched = 0
  let page = 1

  while (hasMorePages && !hasErrors) {
    try {
      const response = await getCalls(client,
        { phoneNumber, email, page, sort, includeContacts })

      calls.push(...response.calls)
      pagesFetched++

      if (!response.meta.next_page_link) {
        hasMorePages = false
        break
      }

      page++
      await new Promise(resolve => setTimeout(resolve, 300))
    } catch {
      hasErrors = true
      break
    }
  }

  return {
    success: pagesFetched > 0,
    data: calls,
    hasErrors

  }
}