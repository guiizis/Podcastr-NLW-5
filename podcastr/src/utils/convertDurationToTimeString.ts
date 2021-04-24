export function convertDurationToTimeString(duration: number): String {

    const hours = Math.floor(duration / 3600)
    const mins = Math.floor((duration % 3600) / 60)
    const sec = duration % 60

    const finalResult = [hours, mins, sec].map(unit => String(unit)
        .padStart(2, '0')).join(":")

    return finalResult
}