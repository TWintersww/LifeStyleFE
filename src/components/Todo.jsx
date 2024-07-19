import { useSelector, useDispatch } from 'react-redux'
import { createTask } from '../reducers/todoReducer'
import TodoForm from './todo/TodoForm'
import TodoList from './todo/TodoList'

const Todo = () => {
  // const dispatch = useDispatch()
  // const tasks = useSelector(state => state.todo.tasks)
  // console.log(tasks)

  return (
    <div className="w-full flex justify-between p-4">
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          todo
        </h2>

        <TodoForm />
        <TodoList status='todo'/>

      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          completed
        </h2>

        <TodoList status='completed'/>
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold mb-4">
          logging
        </h2>
      </div>
    </div>
  )
}

export default Todo
