import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"
import { getTasksByStatusAndDate, getFormattedCurrentDate } from "../../selectors/todoSelectors"


const TodoList = ({status}) => {

  const {utcTime, zonedTime} = useSelector(getFormattedCurrentDate)
  const tasks = useSelector(state => getTasksByStatusAndDate(state, status, zonedTime))

  console.log('utcTime', utcTime, 'zonedTime', zonedTime)
  console.log('types:', typeof(utcTime), typeof(zonedTime))
  console.log(`TodoList ${status} tasks:`, tasks)



  return (
    <div>
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
