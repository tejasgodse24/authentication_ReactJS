import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Contact from './pages/Contact.jsx'
import About from './pages/About.jsx'
import SendPasswordResetLink from './pages/SendPasswordResetLink.jsx'
import ChangePassword from './pages/ChangePassword.jsx'
import ResetPassword from './pages/ResetPassword.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/contact',
        element: <Contact />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/email-reset-password-link',
        element: <SendPasswordResetLink />
      },
      {
        path: '/reset-password',
        element: <ResetPassword />
      },
      {
        path: '/change-password',
        element: <ChangePassword />
      },
    ]
    
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
