import { createSelector } from "@reduxjs/toolkit";
import { isSameDay, startOfDay, isSameMonth } from "date-fns";

const getTasks = state => state.todo.tasks

export const getTasksByStatusAndDate = createSelector(
  [getTasks, (state, status) => status, (state, status, currentDate) => currentDate],
  (tasks, status, currentDate) => tasks
    .filter(task => 
      {
      // console.log('task create date:', new Date(task.createDate))
      return isSameDay(currentDate, new Date(task.createDate)) && task.status === status
      }
    )
)
export const getSameMonthTasks = createSelector(
  [getTasks, (state, currentDate) => currentDate],
  (tasks, currentDate) => tasks
    .filter(task => isSameMonth(task.createDate, currentDate))
)

const getCurrentDate = state => state.todo.currentDate

export const getFormattedCurrentDate = createSelector(
  [getCurrentDate],
  (currentDate) => new Date(currentDate)
)
