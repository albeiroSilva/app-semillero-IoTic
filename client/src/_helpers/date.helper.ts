export class DateHelper {
    public dateToStr(date: Date) {
        return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
    }
}