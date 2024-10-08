import { useSelector, useDispatch } from 'react-redux'
import { initializeTasks } from '../reducers/todoReducer'
import TodoForm from './todo/TodoForm'
import TodoList from './todo/TodoList'
import { useEffect } from 'react'
import { getFormattedCurrentDate } from '../selectors/todoSelectors'
import { isSameDay } from 'date-fns'
import TodoDateSelector from './todo/TodoDateSelector'
import HeatMap from './todo/HeatMap'
import TDLStats from './todo/TDLStats'


const Todo = () => {

  const dispatch = useDispatch()
  const {utcTime, zonedTime} = useSelector(getFormattedCurrentDate)
  
  useEffect(() => {
    dispatch(initializeTasks())
  }, [])

  return (
    <div className="w-full h-full mt-20">
      <TodoDateSelector />

      <div className="flex justify-between p-4 mt-5">
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">
            todo
          </h2>

          {/* Only show TodoForm if currentDate same as today's date */}
          {
            isSameDay(utcTime, (new Date()).toISOString())
            &&
            <TodoForm />
          }
          <TodoList status='todo'/>

        </div>


        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">
            completed
          </h2>


          <TodoList status='completed'/>
        </div>
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">
            logging
          </h2>

          <div>
            <HeatMap />
            <TDLStats />
          </div>
        

        </div>
      </div>
    </div>
  )
}

export default Todo
