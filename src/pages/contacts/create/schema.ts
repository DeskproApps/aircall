import isE164Compliant from "@/utils/isE164Compliant";
import { z } from "zod";

export type CreateContactFormMeta = z.infer<typeof createContactSchema>

const emailSchema = z.object({
    label: z.string().min(1, "Label cannot be empty.").max(225, "Label cannot contain more that 225 character."),
    value: z.string().email("Enter a valid email."),
})

const phoneNumberSchema = z.object({
    label: z.string().min(1, "Label cannot be empty.").max(225, "Label cannot contain more that 225 character."),
    value: z.string().refine(isE164Compliant, { message: "Phone number must be in E.164 format (e.g., +1234567890) and valid." })
})

export const createContactSchema = z.object({
    firstName: z.string().min(1, "First name cannot be empty.").max(225, "First name cannot contain more that 225 character."),
    lastName: z.string().min(1, "Last name cannot be empty.").max(225, "Last name cannot contain more that 225 character."),
    companyName: z.string().max(225, "Company name cannot contain more that 225 character.").optional(),
    emails: z.array(emailSchema).optional(),
    phoneNumbers: z.array(phoneNumberSchema).min(1, "At least one phone number is required.")
})

export function setFormDefaultValues(phoneNumber: string | undefined): CreateContactFormMeta {

    return {
        firstName: "",
        lastName: "",
        companyName: "",
        emails: [],
        phoneNumbers: [{
            label: "",
            value: phoneNumber?.replace(/\s+/g, '') ?? ""
        }]
    }
}