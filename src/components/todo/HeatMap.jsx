import { useSelector } from 'react-redux'
import { getFormattedCurrentDate, getSameMonthTasks } from '../../selectors/todoSelectors'
import CalendarHeatmap from 'react-calendar-heatmap'
import { Tooltip } from 'react-tooltip'
import './heatmapStyles.css'
import { endOfMonth, format, startOfMonth, subDays, addDays, getMonth, getYear, getDaysInMonth } from 'date-fns'
import HeatMapHelpers from './HeatMapHelpers'
/*
  CalendarHeatmap's startDate is offset by 1 day early
  getHoursMap returns entires that are offset by 1 day late
    Ex: 8/1-8/31 becomes 8/2-9/1
  getHoursMap also offsets all tasks by 1 day late
    Ex: 8/1 task's hours logged into 8/2 entry
*/



const HeatMap = () => {
  const {utcTime, zonedTime} = useSelector(getFormattedCurrentDate)
  //Weird off by 1 error for startDate
  const startDateOffset1 = subDays(startOfMonth(zonedTime), 1)
  const endDate = endOfMonth(zonedTime)
  // console.log(startDate, " ", endDate)

  const sameMonthTasks = useSelector(state => getSameMonthTasks(state, zonedTime))
  console.log(sameMonthTasks)

  const monthStartOffset1 = addDays(startOfMonth(zonedTime), 1)
  const numDaysInMonth = getDaysInMonth(monthStartOffset1)
  // console.log('monthStartOffset1:', monthStartOffset1)
  // console.log(`num days in month: ${numDaysInMonth}`)
  const values = HeatMapHelpers.getHoursMap(sameMonthTasks, monthStartOffset1, numDaysInMonth)

  return (
    <div>
      <CalendarHeatmap
        startDate={startDateOffset1}
        endDate={endDate}
        values={
          values
        }
        horizontal={false}
        classForValue={HeatMapHelpers.getColorByValue}
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
