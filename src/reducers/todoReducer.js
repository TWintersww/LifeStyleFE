import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  tasks: [
    {
      taskName: "leetcode",
      description: "lc50",
      status: 'todo',
      id: 1
    },
    {
      taskName: 'webdev',
      description: 'fso part 5',
      status: 'todo',
      id: 2
    },
    {
      taskName: 'linkedin',
      description: 'add connections',
      status: 'completed',
      id: 3
    },
    {
      taskName: 'veryveryverylonglonglonglongname',
      description: 'veryveryverylongdescription veryveryverylongdescription veryveryverylongdescriptionveryveryverylongdescription veryveryverylongdescription veryveryverylongdescription',
      status: 'completed',
      id: 4
    }
  ]
}

const getRandNum = () => {
  return Math.floor(Math.random() * 10000)
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    createTask(state, action) {
      const {taskName, description} = action.payload
      state.tasks.push({
        taskName,
        description,
        status: 'todo',
        id: getRandNum()
      })
    },
    deleteTask(state, action) {
      const id = action.payload
      state.tasks = state.tasks.filter(t => {
        return t.id !== id
      })
    },
    editTask(state, action) {
      const editedTask = action.payload
      console.log(editedTask)
      state.tasks = state.tasks.map(t => {
        return (t.id === editedTask.id) 
          ? editedTask
          : t
      })
    },
    markComplete(state, action) {
      const oldTask = action.payload
      const id = action.payload.id
      // console.log(id, typeof id)
      const editedTask = {
        ...oldTask,
        status: 'completed'
      }
      state.tasks = state.tasks.map(t => {
        return (t.id === id) 
          ? editedTask
          : t
      })
    }
  }
})

export const { createTask, 
  deleteTask, 
  editTask, 
  markComplete
} = todoSlice.actions
export default todoSlice.reducer
