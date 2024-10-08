import { createSelector } from "@reduxjs/toolkit";
import { isSameDay, startOfDay, isSameMonth, isSameWeek } from "date-fns";
import { fromZonedTime } from 'date-fns-tz'

const TIMEZONE = Intl.DateTimeFormat().resolvedOptions().timeZone
console.log('TIMEZONE:', TIMEZONE)

const getTasks = state => state.todo.tasks

export const getTasksByStatusAndDate = createSelector(
  [getTasks, (state, status) => status, (state, status, zonedTime) => zonedTime],
  (tasks, status, zonedTime) => tasks
    .filter(task => 
      {
      console.log('task create date:', task.createDate)
      return isSameDay(zonedTime, task.createDate) && task.status === status
      }
    )
)
export const getSameMonthTasks = createSelector(
  [getTasks, (state, currentDate) => currentDate],
  (tasks, currentDate) => tasks
    .filter(task => isSameMonth(fromZonedTime(task.createDate, TIMEZONE), currentDate))
)
export const getSameWeekTasks = createSelector(
  [getTasks, (state, currentDate) => currentDate],
  (tasks, currentDate) => tasks
    .filter(task => isSameWeek(fromZonedTime(task.createDate, TIMEZONE), currentDate))
)

const getCurrentDate = state => state.todo.currentDate

export const getFormattedCurrentDate = createSelector(
  [getCurrentDate],
  (currentDate) => ({utcTime: currentDate, zonedTime: fromZonedTime(currentDate, TIMEZONE)})
)
