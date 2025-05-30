export default function formatDuration(start: number, end: number | undefined): string {
    // use current time if end is missing
    const endTime = end ?? Math.floor(Date.now() / 1000) 
    let duration = endTime - start

    if (duration < 0) {
        duration = 0
    }

    const hours = Math.floor(duration / 3600)
        .toString()
        .padStart(2, '0')
    const minutes = Math.floor((duration % 3600) / 60)
        .toString()
        .padStart(2, '0')
    const seconds = (duration % 60)
        .toString()
        .padStart(2, '0')

    return `${hours}:${minutes}:${seconds}`
}
