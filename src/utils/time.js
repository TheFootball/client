import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
dayjs.extend(calendar)

export const unixSecondToDate = (num) => {
  const ms = num * 1000
  return new Date(ms)
}

export const getCalendar = (date) => {
  return dayjs(date).calendar()
}
