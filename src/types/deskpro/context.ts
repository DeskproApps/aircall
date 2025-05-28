import { NameID } from "../general"

interface DeskproAppMetadata {
    description: string | undefined,
    id: string
    instanceId: string
    name: string
    title: string
}

interface UserPhoneNumber {
    ext: string
    guessedType: string
    id: string
    label: string | null
    number: string //e.g "+447000000000"
}

interface DeskproUser {
    id: string
    name: string
    firstName: string
    lastName: string
    titlePrefix: string
    isDisabled: boolean
    isAgent: boolean
    isConfirmed: boolean
    emails: string[]
    primaryEmail: string
    customFields: Record<string, unknown>
    language: string
    locale: string
    phoneNumbers: UserPhoneNumber[]
}

interface DeskproTicketUser {
    id: string
    phoneNumbers: UserPhoneNumber[]
    locale: string
    firstName: string
    lastName: string
    emails: string[]
    email: string
    customFields: Record<string, unknown>
    language: string
    displayName: string
    contacts: unknown[]
}

interface DeskproTicketLabel extends NameID { }

interface DeskproAgent {
    id: string
    firstName: string
    lastName: string
    primaryEmail: string
    locale: string
    emails: string[]
    isAdmin: boolean
    isAgent: boolean
    isUser: boolean
}

interface DeskproTicket{
    customFields: Record<string, unknown>
    id: string
    subject: string
    primaryUser: DeskproTicketUser
    urgency: number
    labels: DeskproTicketLabel[]
}


export interface ContextData {
    app: DeskproAppMetadata,
    currentAgent: DeskproAgent
    user?: DeskproUser
    ticket?: DeskproTicket
    env: {
        envId: string
        release?: string
        releaseBuildTime: number
        isCloud?: boolean
        isDemo?: boolean
        trialDaysLeft?: number
    }
}

export interface ContextSettings { } 