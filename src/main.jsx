import React from 'react'
import ReactDOM from 'react-dom/client'
import AppWrapper from './App.jsx'
import './index.css'

//handles css for TDL popup datepicker
import 'react-datepicker/dist/react-datepicker.css'

//handles css for calendar heatmap
import 'react-calendar-heatmap/dist/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <AppWrapper />
  </React.StrictMode>
)
