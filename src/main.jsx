import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ReactDOM from 'react-dom/client'

import './index.css'
import Home from "./pages/home/home";


const router = createBrowserRouter([
  { 
    path: "/",
    element: <Home/>,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <RouterProvider router={router} />
  </>,
)





