import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import SendPasswordResetLink from "./pages/SendPasswordResetLink.jsx";
import ChangePassword from "./pages/ChangePassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import { Provider, useSelector } from "react-redux";
import { store } from "./app/store.js";
import Protected from "./components/Protected.jsx";
import Dashboard from './pages/Dashboard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/register",
        element: (
          <Protected authentication={false}>
            <Register />
          </Protected>
        ),
      },
      {
        path: "/email-reset-password-link",
        element: <SendPasswordResetLink />,
      },
      {
        path: "/api/user/reset-password/:id/:token",
        element: <ResetPassword />,
      },
      {
        path: "/change-password",
        element: <ChangePassword />,
      },
      {
        path: "/dashboard",
        element: (
          <Protected authentication={true}>
            <Dashboard />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
