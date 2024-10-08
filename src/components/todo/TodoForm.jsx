import { useState } from "react"
import TodoFormModal from "./TodoFormModal"

const TodoForm = () => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen)
  }

  return (

    <div>
      <>
        <button
          className="bg-gray-500 text-white active:bg-blue-600 font-bold text-l w-3/4 px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-5 ease-linear transition-all duration-150"
          type="button"
          onClick={toggleOverlay}
        >
          +
        </button>
        {isOverlayOpen ? (
          <TodoFormModal toggleOverlay={toggleOverlay}/>
        ) : null}
      </>
    </div>
  )
}

export default TodoForm
