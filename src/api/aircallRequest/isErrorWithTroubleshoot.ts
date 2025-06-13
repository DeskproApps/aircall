interface AircallTroubleshootError {
    errors?: {
        status: number,
        title: string,
        detail: string
    }[],
    troubleshoot: string
}
export function isErrorWithTroubleshoot(data: unknown): data is AircallTroubleshootError {
    if (data && typeof data === "object" && "troubleshoot" in data && typeof data.troubleshoot === "string") {
        return true
    }
    return false
}