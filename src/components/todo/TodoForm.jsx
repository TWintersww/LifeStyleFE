import { useDispatch } from "react-redux"
import { handleCreateTask } from "../../reducers/todoReducer"

const TodoForm = () => {
  const dispatch = useDispatch()

  const handleFormSubmit = (e) => {
    e.preventDefault()
    dispatch(
      handleCreateTask({
        taskName: e.target.taskName.value,
        description: e.target.description.value,
        status: "todo",
        createDate: new Date(),
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
        <textarea name='description' className="w-full p-2 border border-gray-300 rounded"></textarea>
      </div>
      <button type='submit' className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        add
      </button>
    </form>
  )
}

export default TodoForm
