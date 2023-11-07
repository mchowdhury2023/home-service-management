import {createBrowserRouter} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import AddService from "../pages/Service/AddService";
import TestimonialForm from "../pages/Testimonial/TestimonialForm";
import AllServices from "../pages/Service/AllServices";
import ServiceDetails from "../pages/Service/ServiceDetails";
import Bookings from "../pages/Service/Booking/Bookings";
import ManageServices from "../pages/Service/ManageServices";
import EditService from "../pages/Service/EditService/EditService";
import PageNotFound from "../pages/PageNotFound/PageNotFound";

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
          element:<AddService></AddService>,
        },
        {
          path:'/editService/:id',
          element:<EditService></EditService>,
          loader:({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path:'/my-services',
          element:<ManageServices></ManageServices>
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
        },
        {
          path:'/bookings',
          element:<Bookings></Bookings>
        },
        {
          path: "*",
          element: <PageNotFound></PageNotFound>,
        },



      ]
    },
  ]);

  export default router;
