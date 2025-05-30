import { ContextData, UserPhoneNumber } from "@/types/deskpro/context";

interface DeskproUser {
    name: string
    email: string
    phoneNumbers: UserPhoneNumber[]
}

export default function getDeskproUserFromContext(data: ContextData | undefined): DeskproUser | null {
    const user = data?.user
    const ticket = data?.ticket
    if (user) {
        return {
            phoneNumbers: user.phoneNumbers,
            email: user.primaryEmail,
            name: `${user.firstName} ${user.lastName}`,
        }
    }

    if (ticket) {
        return {
            phoneNumbers: ticket.primaryUser.phoneNumbers,
            email: ticket.primaryUser.email,
            name: `${ticket.primaryUser.firstName} ${ticket.primaryUser.lastName}`,
        }
    }

    return null
}