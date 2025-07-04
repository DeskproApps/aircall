
type Payload =
    { type: "changePath", path?: string }
    | { type: "unlink-contact", contactId: string }


export default function isValidPayload(payload: unknown): payload is Payload {
    if (payload && typeof payload === 'object' && 'type' in payload) {
        return true
    }
    return false
}