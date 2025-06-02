export default function formatTimeSince(date: string | number | Date): string {
    const now = new Date()
    const past = new Date(date)
    const differenceInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

    if (differenceInSeconds < 5) {
        return 'just now'
    }

    const intervals: { label: string; seconds: number }[] = [
        { label: 'yr', seconds: 31536000 },
        { label: 'mo', seconds: 2592000 },
        { label: 'wk', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hr', seconds: 3600 },
        { label: 'min', seconds: 60 },
        { label: 'sec', seconds: 1 },
    ]

    for (const { label, seconds } of intervals) {
        const count = Math.floor(differenceInSeconds / seconds)
        if (count >= 1) {
            const unit = `${label}${count === 1 ? "" : "s"}`
            return `${count} ${unit}`
        }
    }

    return 'just now'
}
