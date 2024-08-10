import { endOfMonth, format, startOfMonth, subDays, addDays, getMonth, getYear, getDaysInMonth } from 'date-fns'
import { fromZonedTime } from 'date-fns-tz'

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

const getColorByValue = (value) => {
  if (!value) {
    return `color-green-0`
  }

  const count = Math.min(Math.floor(value.count), 10)
  return `color-green-${count}`
}

/*
  returns form [
    {date: '2016-01-01', count: 6}
    {date: formatted date string, count: floored integer}
  ]
*/
const getHoursMap = (tasks, startDate, daysInMonth) => {
  const map = {}
  // console.log('startDate', startDate)

  for (let i = 0; i < daysInMonth; i++) {
    const formattedDateString = format(addDays(startDate, i), 'yyyy-MM-dd') 
    map[formattedDateString] = 0
  }

  for (const task of tasks) {
    const createDate = task.createDate
    const zonedDateObject = fromZonedTime(createDate, TIMEZONE)
    const zonedDateObjectOffset1 = addDays(zonedDateObject, 1)
    const formattedDateString = format(zonedDateObjectOffset1, 'yyyy-MM-dd') 

    if (formattedDateString in map) {
      map[formattedDateString] += task.hoursSpent
    }
  }

  //floor all values and add as object to returnValue
  const returnValue = []
  for (let key of Object.keys(map)) {
    map[key] = Math.floor(map[key]);
    returnValue.push({date: key, count: map[key]});
  }

  // console.log(map)
  // console.log(returnValue)

  return returnValue
}

export default { getColorByValue, getHoursMap }
