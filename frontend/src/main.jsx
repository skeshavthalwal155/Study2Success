// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducer/index.js'
import { Toaster } from 'react-hot-toast'
import ThemeProvider from './Providers/ThemeProvider.jsx'

const store = configureStore({
  reducer: rootReducer,
})
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
      <Toaster />
    </Provider>
  </BrowserRouter>
)
