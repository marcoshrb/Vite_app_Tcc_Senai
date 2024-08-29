import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'

import './index.css'

import Home from "./pages/home/home";
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/login";
import CamSettigns from "./pages/cam_settings/cam_settings"
import Languagens from "./pages/languages/languages"

const router = createBrowserRouter([
  { 
    path: "./",
    element: <Login/>,
  },
  { 
    path: "/cadastro",
    element: <Cadastro/>,
  },
  { 
    path: "/home",
    element: <Home/>,
  },
  { 
    path: "/home/:cam_settings",
    element: <CamSettigns/>,
  },
  { 
    path: "/languages",
    element: <Languagens/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)





