import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <App></App>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>

        }

      ]
    },
  ]);

  export default router;
