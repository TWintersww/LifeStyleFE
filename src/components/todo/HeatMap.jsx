import { useSelector } from 'react-redux'
import { getFormattedCurrentDate, getSameMonthTasks } from '../../selectors/todoSelectors'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Tooltip } from 'react-tooltip'
import './heatmapStyles.css'
import { endOfMonth, format, startOfMonth, subDays, addDays, getMonth, getYear, getDaysInMonth } from 'date-fns'

const getColorByValue = (value) => {
  if (!value) {
    return `color-green-0`
  }

  const count = Math.min(Math.floor(value.count), 10)
  return `color-green-${count}`
}

const getHoursMap = (tasks, startDate, daysInMonth) => {
  const map = {}
  console.log('startDate', startDate)

  for (let i = 0; i < daysInMonth; i++) {
    const dateObject = new Date(addDays(startDate, i))
    const normalizedDate = dateObject.toISOString().split('T')[0]
    // console.log(normalizedDate)
    map[normalizedDate] = 0
  }

  for (const task of tasks) {
    const dateObject = addDays(new Date(task.createDate), 1)
    const normalizedDate = dateObject.toISOString().split('T')[0]

    if (normalizedDate in map) {
      map[normalizedDate] += task.hoursSpent
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


const HeatMap = () => {
  const currentDate = useSelector(getFormattedCurrentDate)
  //Weird off by 1 error for startDate
  const startDate = subDays(startOfMonth(currentDate), 1)
  const endDate = endOfMonth(new Date(currentDate))
  // console.log(startDate, " ", endDate)

  const sameMonthTasks = useSelector(state => getSameMonthTasks(state, currentDate))
  console.log(sameMonthTasks)

  const currMonth = getMonth(endDate)
  const currYear = getYear(endDate)
  const monthStart = addDays(startOfMonth(currentDate), 1)
  const numDaysInMonth = getDaysInMonth(new Date(currYear, currMonth))
  // console.log(`num days in month ${currMonth}, year ${currYear}: ${numDaysInMonth}`)
  const values = getHoursMap(sameMonthTasks, monthStart, numDaysInMonth)
  console.log(values)

  return (
    <div>
      <CalendarHeatmap
        startDate={startDate}
        endDate={endDate}
        values={
          // [
          // {date: new Date(2024, 7, 1), count: 4},
          // {date: new Date(2024, 7, 2), count: 9},
          // {date: new Date(2024, 7, 3), count: 10},
          // {date: new Date(2024, 7, 4), count: 2},
          // {date: new Date(2024, 7, 31), count: 2},
          // ]
          values
        }
        horizontal={false}
        classForValue={getColorByValue}
        tooltipDataAttrs={value => {
          if (!value || !value.date) {
            return {
              'data-tooltip-content': 'No Entry',
              'data-tooltip-id': 'heatmapDates'
            }
          }

          // console.log('value date:', value.date)
          const formattedDate = format(value.date, 'MM/dd')
          // console.log('after format:', value.date)
          const hours = (value.count) ? value.count : 0
          return {
            'data-tooltip-content': `${formattedDate}: ${hours} Hours`,
            'data-tooltip-id': 'heatmapDates'
          };
        }}
        weekdayLabels={['M', 'T', 'W', 'Th', 'F', 'Sa', 'S']}
        showWeekdayLabels={false}
        showMonthLabels={false}
      />
      <Tooltip id='heatmapDates' />
    </div>
  )
}

export default HeatMap
