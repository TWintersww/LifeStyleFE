import { useSelector, useDispatch } from 'react-redux'
import { createTask } from '../reducers/todoReducer'
import TodoForm from './todo/TodoForm'
import TodoList from './todo/TodoList'

const Todo = () => {
  // const dispatch = useDispatch()
  // const tasks = useSelector(state => state.todo.tasks)
  // console.log(tasks)

  return (
    <div className='todoContainer'>
      <div className='todo'>
        todo

        <TodoForm />
        <TodoList status='todo'/>

      </div>
      <div className='completed'>
        completed

        <TodoList status='completed'/>
      </div>
      <div className='logging'>
        logging
      </div>
    </div>
  )
}

export default Todo
