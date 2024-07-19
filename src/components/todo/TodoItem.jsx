import { useState } from "react"


import TodoItemModal from "./TodoItemModel"

const TodoItem = ({t}) => {
  // const dispatch = useDispatch()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const toggleOverlay = () => {
    // console.log('clicked')
    setIsOverlayOpen(!isOverlayOpen)
  }

  return (

    <div>
    <>
      <button
        className="bg-pink-500 text-white active:bg-pink-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
