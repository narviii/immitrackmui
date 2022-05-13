
export default function ExcelDateToJSDate(date) {
    if (Number.isInteger(date)) {
        return new Date(Math.round((date - 25569) * 86400 * 1000));
    } else return null
}