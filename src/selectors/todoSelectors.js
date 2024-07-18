import { createSelector } from "@reduxjs/toolkit";

const getTasks = state => state.todo.tasks

export const getTasksByStatus = createSelector(
  [getTasks, (state, status) => status],
  (tasks, status) => tasks.filter(task => task.status === status)
)
