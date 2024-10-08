import HeatMapHelpers from './HeatMapHelpers'
import { getFormattedCurrentDate, getSameMonthTasks } from '../../selectors/todoSelectors'
import { useSelector } from 'react-redux'
import { startOfMonth, getDaysInMonth, addDays, subDays, isSameWeek } from 'date-fns'

const TDLStats = () => {
  const {utcTime, zonedTime} = useSelector(getFormattedCurrentDate)
  const sameMonthTasks = useSelector(state => getSameMonthTasks(state, zonedTime))
  const monthStartOffset1 = addDays(startOfMonth(zonedTime), 1)
  const numDaysInMonth = getDaysInMonth(monthStartOffset1)

  //All dates in [] are ahead by 1 day. Shift back for week calculation
  const hoursMap = HeatMapHelpers.getHoursMap(sameMonthTasks, monthStartOffset1, numDaysInMonth);
  console.log('TDLStats', hoursMap)

  const stats = {
    daysLoggedMonth: 0,
    daysLoggedWeek: 0,
    totalHoursInMonth: 0,
    totalHoursInWeek: 0
  }
  for (const entry of hoursMap) {
    if (entry.count > 0) {
      stats.daysLoggedMonth++;
      stats.totalHoursInMonth += entry.count;

      const adjustedDate = subDays(entry.date, 1)
      if (isSameWeek(adjustedDate, zonedTime)) {
        stats.daysLoggedWeek++;
        stats.totalHoursInWeek += entry.count;
      }
    }
  }
  console.log('TDLStats stats', stats)

  

  return (
    <div className="text-xl font-medium mt-10">
      <div>
        Days Logged in Month: {stats.daysLoggedMonth}
      </div>
      <div>
        Monthly Hours Logged: {stats.totalHoursInMonth}
      </div>
      <div>
        Weekly Hours Logged: {stats.totalHoursInWeek}
      </div>
      <div>
        Monthly Average Hours: {(stats.totalHoursInMonth / stats.daysLoggedMonth).toFixed(2)}
      </div>
      <div>
        Weekly Average Hours: {(stats.totalHoursInWeek / stats.daysLoggedWeek).toFixed(2)}
      </div>
    </div>
  )
}

export default TDLStats;
