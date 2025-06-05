export default function formatTimestamp(unixTimestamp: number): string {
    const date = new Date(unixTimestamp * 1000)

    const days = ["Sun", "Mon", "Tues", "Weds", "Thurs", "Fri", "Sat"]
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ]

    const dayName = days[date.getDay()]
    const day = date.getDate()
    const month = months[date.getMonth()]
    const year = date.getFullYear()

    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')

    const ordinalSuffix = (n: number) => {
        if (n > 3 && n < 21) {
            return "th"
        }
        switch (n % 10) {
            case 1: return "st"
            case 2: return "nd"
            case 3: return "rd"
            default: return "th"
        }
    };

    const formatted = `${dayName} ${day}${ordinalSuffix(day)} ${month} ${year}, ${hours}:${minutes}`
    return formatted
}