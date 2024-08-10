import { createSlice } from "@reduxjs/toolkit"
import tasksService from '../services/tasks'
import { addDays, startOfDay } from "date-fns"
import { handleLogoutWithNavigate } from "./loginReducer"


export const initializeTasks = () => {
  return async dispatch => {
    const init = await tasksService.getAll()
    dispatch(setTasks(init))
  }
}
export const handleCreateTask = (newTask, navigate) => {
  return async dispatch => {
    try {
      console.log('newTask:', newTask)
      const postedTask = await tasksService.postNew(newTask)
      console.log('postedTask:', postedTask)
      dispatch(createTask(postedTask))
    }
    catch (error) {
      console.log(error.response.data.error)
      const errorMsg = error.response.data.error
      //if message is 'token expired', set notification and handle logout
      if (errorMsg.includes('token expired')) {
        dispatch(handleLogoutWithNavigate(navigate))
      }
      else if (errorMsg.includes('validation failed')) {
        console.log('validation failed')
      }
    }
  }
}
export const handleDeleteTask = (id) => {
  return async dispatch => {
    console.log('to delete id:', id)
    await tasksService.deleteOne(id)
    dispatch(deleteTask(id))
  }
}
//DEPRECATED
// export const handleMarkComplete = (oldTask) => {
//   return async dispatch => {
//     const editedTask = {
//       ...oldTask,
//       status: 'completed'
//     }
//     // console.log('editedTask:', editedTask)
//     const editedPostedTask = await tasksService.editOne(editedTask)
//     // console.log('editedPostedTask:', editedPostedTask)
//     dispatch(editTask(editedPostedTask))
//   }
// }
export const handleStatusChange = (oldTask) => {
  return async dispatch => {
    const newStatus = oldTask.status === 'todo'
      ? 'completed'
      : 'todo'
    const editedTask = {
      ...oldTask,
      status: newStatus
    }
    const editedPostedTask = await tasksService.editOne(editedTask)
    dispatch(editTask(editedPostedTask))
  }
}
export const handleEditTask = (editedTask) => {
  return async dispatch => {
    const editedPostedTask = await tasksService.editOne(editedTask)
    // console.log('editedPostedTask:', editedPostedTask)
    dispatch(editTask(editedPostedTask))
  }
}
export const handleNextDay = () => {
  return async (dispatch, getState) => {
    const currentDate = getState().todo.currentDate
    const updatedCurrentDate = addDays(new Date(currentDate), 1).toISOString()
    dispatch(setDate(updatedCurrentDate))
  }
}
export const handlePrevDay = () => {
  return async (dispatch, getState) => {
    const currentDate = getState().todo.currentDate
    const updatedCurrentDate = addDays(new Date(currentDate), -1).toISOString()
    dispatch(setDate(updatedCurrentDate))
  }
}

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [],
    //currentDate needs to be in string format
    currentDate: new Date().toISOString(),
  },
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload
    },
    createTask(state, action) {
      // state.tasks.concat(action.payload)
      state.tasks.push(action.payload)
      console.log('createTask payload:', action.payload)
    },
    deleteTask(state, action) {
      const id = action.payload
      state.tasks = state.tasks.filter(t => {
        return t.id !== id
      })
    },
    editTask(state, action) {
      const editedTask = action.payload
      console.log('inside editTask()', editedTask)
      state.tasks = state.tasks.map(t => {
        return (t.id === editedTask.id) 
          ? editedTask
          : t
      })
    },

    setDate(state, action) {
      state.currentDate = action.payload
    },
  }
})

export const { 
  setTasks,
  createTask, 
  deleteTask, 
  editTask,
  setDate
} = todoSlice.actions
export default todoSlice.reducer
