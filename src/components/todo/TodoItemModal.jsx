import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { handleDeleteTask, handleMarkComplete, handleEditTask } from "../../reducers/todoReducer"
import { useState } from "react"


const TodoItemModal = ({t, toggleOverlay}) => {
  const dispatch = useDispatch()

  const [taskName, setTaskName] = useState(t.taskName)
  const [description, setDescription] = useState(t.description)

  // console.log(taskName)
  // console.log(description)

  const handleMC = () => {
    toggleOverlay()
    dispatch(handleMarkComplete(t))
  }
  const handleDelete = () => {
    toggleOverlay()
    dispatch(handleDeleteTask(t.id))
  }
  const handleEdit = () => {
    toggleOverlay()
    const editedTask = {
      ...t,
      taskName: taskName,
      description: description
    }
    dispatch(handleEditTask(editedTask))
  }

  return (
    <>
      <div
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-3/4 my-6 mx-auto max-w-6xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}
            <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
              <input 
                type='text' 
                name='taskName' 
                value={taskName} 
                onChange={e => setTaskName(e.target.value)}
                className="text-2xl border border-gray-300 p-2 rounded box-border flex-grow mr-4"
              />
              <div>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm w-12 h-12 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={handleDelete}
                >
                  <FontAwesomeIcon icon={faTrash}/>
                </button>
                <button
                  className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={handleMC}
                >
                  Mark Complete
                </button>
              </div>
            </div>
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <textarea 
                className="w-full p-2 border border-gray-300 rounded"
                value={description}
                onChange={e => setDescription(e.target.value)}
              >
                 

              </textarea>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-between p-6 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex-1"
                type="button"
                onClick={toggleOverlay}
              >
                Close
              </button>
              <button
                className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 flex-1"
                type="button"
                onClick={handleEdit}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  )
}

export default TodoItemModal
