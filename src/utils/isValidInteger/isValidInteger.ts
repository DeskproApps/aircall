export default function isValidInteger(value: string): boolean {
    if (value.trim() === '') {
        return false
    }

    const valueAsNumber = Number(value)
    return Number.isInteger(valueAsNumber)
}