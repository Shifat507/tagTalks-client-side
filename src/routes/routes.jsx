import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/HomePage/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Membership from "../pages/Membership";
import Notifications from "../pages/Notifications";
import JoinUs from "../pages/JoinUs";
import CreatePost from "../pages/HomePage/CreatePost";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
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
                path: '/membership',
                element: <Membership></Membership>
            },
            {
                path: '/notifications',
                element: <Notifications></Notifications>
            },
            {
                path: '/joinUs',
                element: <JoinUs></JoinUs>
            },
            {
                path: '/createPost',
                element: <CreatePost></CreatePost>
            }
        ]
    },
]);