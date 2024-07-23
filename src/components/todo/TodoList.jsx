import { useDispatch, useSelector } from "react-redux"
import TodoItem from "./TodoItem"
import { getTasksByStatusAndDate, getFormattedCurrentDate } from "../../selectors/todoSelectors"
import { handleNextDay, handlePrevDay } from "../../reducers/todoReducer"

const TodoList = ({status}) => {

  const dispatch = useDispatch()
  const currentDate = useSelector(getFormattedCurrentDate)
  const tasks = useSelector(state => getTasksByStatusAndDate(state, status, currentDate))

  console.log('current date', currentDate)
  console.log(`TodoList ${status} tasks:`, tasks)



  return (
    <div>
      <button onClick={() => dispatch(handlePrevDay())}>
        prevDay
      </button>
      <button onClick={() => dispatch(handleNextDay())}>
        nextDay
      </button>
      <ul>
      {
        tasks.map(t => (
          <li key={t.id}>
            <TodoItem t={t} />
          </li>
        ))
      }
      </ul>
    </div>
  )
}

export default TodoList
