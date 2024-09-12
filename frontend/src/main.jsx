import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

import './index.css'

import Home from "./pages/home/home";
import Cadastro from "./pages/cadastro/cadastro"
import Login from "./pages/login/login";
import CamSettigns from "./pages/cam_settings/cam_settings"
import Languagens from "./pages/languages/languages"
import RecoverPassword from "./pages/recover_password/recover_password";

const router = createBrowserRouter([
  { 
    path: "/",
    element: <Login/>,
  },
  { 
    path: "/cadastro",
    element: <Cadastro/>,
  },
  { 
    path: "/recuperar_senha",
    element: <RecoverPassword/>,
  },
  { 
    path: "/home",
    element: <Home/>,
  },
  { 
    path: "/home/:tracking",
    element: <CamSettigns/>,
  },
  { 
    path: "/languages",
    element: <Languagens/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <SpeedInsights/>
    <Analytics/>
    <RouterProvider router={router} />
  </>,
)





