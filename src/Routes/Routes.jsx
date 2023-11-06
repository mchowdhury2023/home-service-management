import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddService from "../pages/Service/AddService";
import TestimonialForm from "../pages/Testimonial/TestimonialForm";
import AllServices from "../pages/Service/AllServices";
import ServiceDetails from "../pages/Service/ServiceDetails";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        {
            path: '/',
            element: <Home></Home>
        },
        {
            path: '/login',
            element: <Login></Login>

        },
        {
            path: '/register',
            element: <Register></Register>

        },
        {
          path:'/add-service',
          element:<AddService></AddService>
        },
        {
          path:'/testimonials',
          element:<TestimonialForm></TestimonialForm>
        },
        {
          path:'/allservices',
          element:<AllServices></AllServices>
        },
        {
          path:"/services/:id",
          element:<ServiceDetails></ServiceDetails>
        }



      ]
    },
  ]);

  export default router;
