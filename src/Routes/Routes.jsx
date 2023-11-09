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
import PrivateRoute from "./PrivateRoute";
import LoyaltyProgramPage from "../LoyaltyProgram/LoyaltyProgramPage";

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
          element:<PrivateRoute><AddService></AddService></PrivateRoute>,
        },
        {
          path:'/editService/:id',
          element:<PrivateRoute><ManageServices></ManageServices></PrivateRoute>,
          loader:({params}) => fetch(`https://home-service-server-seven.vercel.app/services/${params.id}`)
        },
        {
          path:'/my-services',
          element:<PrivateRoute><ManageServices></ManageServices></PrivateRoute>
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
          element:<PrivateRoute><ServiceDetails></ServiceDetails></PrivateRoute>
        },
        {
          path:'/bookings',
          element:<PrivateRoute><Bookings></Bookings></PrivateRoute>
        },
        {
          path:'/membership',
          element:<PrivateRoute><LoyaltyProgramPage></LoyaltyProgramPage></PrivateRoute>

        },
        {
          path: "*",
          element: <PageNotFound></PageNotFound>,
        },



      ]
    },
  ]);

  export default router;
