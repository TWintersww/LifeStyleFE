import { useDispatch } from "react-redux"
import { createTask } from "../../reducers/todoReducer"

const TodoForm = () => {
  const dispatch = useDispatch()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(
      createTask({
        taskName: e.target.taskName.value,
        description: e.target.description.value
      })
    )

    e.target.taskName.value = ''
    e.target.description.value = ''
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        task
        <input type='text' name='taskName'/>
      </div>
      <div>
        details
        <input type='text' name='description'/>
      </div>
      <button type='submit'>
        add
      </button>
    </form>
  )
}

export default TodoForm
