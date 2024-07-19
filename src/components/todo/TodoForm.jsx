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
        <label className="block text-gray-700 mb-2">task</label>
        <input type='text' name='taskName' className="w-full p-2 border border-gray-300 rounded"/>
      </div>
      <div>
        <label className="block text-gray-700 mb-2">details</label>
        {/* <input type='text' name='description'/> */}
        <textarea className="w-full p-2 border border-gray-300 rounded"></textarea>
      </div>
      <button type='submit' className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        add
      </button>
    </form>
  )
}

export default TodoForm
