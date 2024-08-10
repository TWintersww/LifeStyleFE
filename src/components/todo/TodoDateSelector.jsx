import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"
import { getFormattedCurrentDate } from "../../selectors/todoSelectors"
import { handleNextDay, handlePrevDay, setDate } from "../../reducers/todoReducer"
import { format } from "date-fns"
import { forwardRef } from "react"
import DatePicker from "react-datepicker"
import { fromZonedTime } from 'date-fns-tz'

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone

const TodoDateSelector = () => {
  const dispatch = useDispatch()
  const {utcTime, zonedTime} = useSelector(getFormattedCurrentDate)
  const formattedZonedTimeString = format(zonedTime, 'MM/dd/yyyy')


  const CalendarToggleButton = forwardRef(
    ({onClick, className}, ref) => (
      <button onClick={onClick} ref={ref} className={className}>
        <FontAwesomeIcon icon={faCalendar}/>
      </button>
    )
  )
  
  return (
    <div className="w-full flex justify-center items-center">
      <button 
        onClick={() => dispatch(handlePrevDay())}
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        &lt;
      </button>
      <div className="flex items-center">
        <span className="bg-indigo-500 text-white p-1 rounded-l text-1xl text-center font-bold w-28">
          {formattedZonedTimeString}
        </span>
        <DatePicker 
          //popup's date state is synchronized with currentDate in reducer
          selected={zonedTime}
          //popup's date change synchronized with reducer's setDate(isostring)
          onChange={(date) => dispatch(setDate(date.toISOString()))}
          customInput={<CalendarToggleButton className="bg-indigo-200 p-1 px-3 rounded-r hover:bg-indigo-300"/>}
        />
      </div>
      <button 
        onClick={() => dispatch(handleNextDay())}
        className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
      >
        &gt;
      </button>
    </div>
  )
}

export default TodoDateSelector
