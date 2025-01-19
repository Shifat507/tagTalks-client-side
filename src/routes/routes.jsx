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
import PopularPost from "../pages/HomePage/PopularPost";
import PrivateRoute from "./PrivateRoute";
import UserProfile from "../pages/userProfile";
import MyPosts from "../pages/MyPosts";

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
                element: <PrivateRoute><Membership></Membership></PrivateRoute>
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
                element: <PrivateRoute><CreatePost></CreatePost></PrivateRoute>
            },
            {
                path: '/popular-post',
                element: <PopularPost></PopularPost>
            },
            {
                path: '/userProfile',
                element: <PrivateRoute><UserProfile></UserProfile></PrivateRoute>
            },
            {
                path: '/myPosts',
                element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>
            }
        ]
    },
]);