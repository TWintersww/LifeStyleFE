import Header from './components/Header'
import Body from './components/Body'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import styled from 'styled-components'

import Home from './components/Home'
import Todo from './components/Todo'

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './reducers/todoReducer'

const store = configureStore({
  reducer: {
    todo: todoReducer
  }
})
const StyledPage = styled.div`
  display: flex;
  flex-direction: column
`

function App() {
  
  return (
    <Provider store={store}>
      <StyledPage>
        <Header />
        <Router>
          <Routes>
            <Route path='/' element={<Body />}>
              <Route index element={<Home />} />
              <Route path='todo' element={<Todo />} />
            </Route>
          </Routes>
        </Router>
      </StyledPage>
    </Provider>
  )
}

export default App
