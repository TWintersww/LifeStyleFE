import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"
import { getTasksByStatusAndDate, getFormattedCurrentDate } from "../../selectors/todoSelectors"


const TodoList = ({status}) => {

  const currentDate = useSelector(getFormattedCurrentDate)
  const tasks = useSelector(state => getTasksByStatusAndDate(state, status, currentDate))

  console.log('current date', currentDate)
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
