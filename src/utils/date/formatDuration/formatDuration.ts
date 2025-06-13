/**
 * Formats the duration between two Unix timestamps as HH:MM:SS.
 *
 * @example
 * formatDuration(1609459200, 1609459205) // '00:00:05' (5 seconds)
 * formatDuration(0, 3661) // '01:01:01' (1 hour, 1 minute, 1 second)
 * 
 */
export default function formatDuration(start: number, end: number | undefined): string {
    // use current time if end is missing
    const endTime = end ?? Math.floor(Date.now() / 1000) 
    let duration = endTime - start

    if (duration < 0) {
        duration = 0
    }

    const hours = Math.floor(duration / 3600).toString().padStart(2, '0')
    const minutes = Math.floor((duration % 3600) / 60).toString().padStart(2, '0')
    const seconds = (duration % 60).toString().padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}
