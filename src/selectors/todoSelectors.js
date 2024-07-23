import { createSelector } from "@reduxjs/toolkit";
import { isSameDay } from "date-fns";

const getTasks = state => state.todo.tasks

export const getTasksByStatusAndDate = createSelector(
  [getTasks, (state, status) => status, (state, status, currentDate) => currentDate],
  (tasks, status, currentDate) => tasks
    .filter(task => 
      isSameDay(currentDate, new Date(task.createDate)) && task.status === status
    )
)

const getCurrentDate = state => state.todo.currentDate

export const getFormattedCurrentDate = createSelector(
  [getCurrentDate],
  (currentDate) => new Date(currentDate)
)
