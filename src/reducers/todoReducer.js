import { createSlice } from "@reduxjs/toolkit"
import tasksService from '../services/tasks'
import tasks from "../services/tasks"

// const initialState = {
//   tasks: [
//     {
//       taskName: "leetcode",
//       description: "lc50",
//       status: 'todo',
//       id: 1
//     },
//     {
//       taskName: 'webdev',
//       description: 'fso part 5',
//       status: 'todo',
//       id: 2
//     },
//     {
//       taskName: 'linkedin',
//       description: 'add connections',
//       status: 'completed',
//       id: 3
//     },
//     {
//       taskName: 'veryveryverylonglonglonglongname',
//       description: 'veryveryverylongdescription veryveryverylongdescription veryveryverylongdescriptionveryveryverylongdescription veryveryverylongdescription veryveryverylongdescription',
//       status: 'completed',
//       id: 4
//     }
//   ]
// }

const getRandNum = () => {
  return Math.floor(Math.random() * 10000)
}
export const initializeTasks = () => {
  return async dispatch => {
    const init = await tasksService.getAll()
    dispatch(setTasks(init))
  }
}
export const handleCreateTask = (newTask) => {
  return async dispatch => {
    // console.log('newTask:', newTask)
    const postedTask = await tasksService.postNew(newTask)
    // console.log('postedTask:', postedTask)
    dispatch(createTask(postedTask))
  }
}
export const handleDeleteTask = (id) => {
  return async dispatch => {
    console.log('to delete id:', id)
    await tasksService.deleteOne(id)
    dispatch(deleteTask(id))
  }
}
export const handleMarkComplete = (oldTask) => {
  return async dispatch => {
    const editedTask = {
      ...oldTask,
      status: 'completed'
    }
    // console.log('editedTask:', editedTask)
    const editedPostedTask = await tasksService.editOne(editedTask)
    // console.log('editedPostedTask:', editedPostedTask)
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

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: []
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
  }
})

export const { 
  setTasks,
  createTask, 
  deleteTask, 
  editTask
} = todoSlice.actions
export default todoSlice.reducer
