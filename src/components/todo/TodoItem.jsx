import { useState } from "react"


import TodoItemModal from "./TodoItemModal"

const TodoItem = ({t}) => {
  // const dispatch = useDispatch()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }

  return (

    <div>
    <>
      <button
        className="bg-gray-400 text-white active:bg-gray-600 font-bold text-l w-3/4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={toggleOverlay}
      >
        {t.taskName}
      </button>
      {isOverlayOpen ? (
        <TodoItemModal t={t} toggleOverlay={toggleOverlay}/>
      ) : null}
    </>
    </div>
  )
}

export default TodoItem
