import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'

// Router
import { BrowserRouter } from 'react-router-dom'

// Font Roboto
import '@fontsource/roboto/300.css' // Light
import '@fontsource/roboto/400.css' // Regular
import '@fontsource/roboto/500.css' // Medium
import '@fontsource/roboto/700.css' // Bold

// Font Readex-pro
import '@fontsource/readex-pro/300.css' // Light
import '@fontsource/readex-pro/500.css' // Medium

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
