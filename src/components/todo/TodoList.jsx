import { useSelector } from "react-redux"
import TodoItem from "./TodoItem"
import { getTasksByStatus } from "../../selectors/todoSelectors"

const TodoList = ({status}) => {
  const tasks = useSelector(state => getTasksByStatus(state, status))
  console.log(tasks)

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
