import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App.jsx"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Login/> */}
    <Register/>
    <App/>
  </StrictMode>,
)
