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
import PostDetails from "../pages/PostDetails";
import Dashboard from "../pages/Dashboard";
import AllUsers from "../pages/AllUsers";
import DashboardInfo from "../components/dashboardInfo";
import ManageUsers from "../components/manageUsers";
import Announcement from "../components/Announcement";
import Activities from "../components/Activities";
import AdminProfile from "../components/AdminProfile";
import AdminRoute from "./AdminRoute";
import Help from "../pages/Help";

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
            // {
            //     path: '/myPosts',
            //     element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>
            // },
            {
                path: '/postDetails/:id',
                element: <PostDetails></PostDetails>
            },
            {
                path: '/allUsers',
                element: <PrivateRoute><AllUsers></AllUsers></PrivateRoute>
            },
            {
                path: "/announcement",
                element: <Announcement></Announcement>
            },
            {
                path: "/help",
                element: <Help></Help>
            }
        ]
    },
    {
        path: "dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '',
                element: <DashboardInfo></DashboardInfo>
            },
            {
                path: "userProfile",
                element: <UserProfile></UserProfile>
            },
            {
                path: "createPost",
                element: <CreatePost></CreatePost>
            },
            {
                path: "myPosts",
                element: <MyPosts></MyPosts>
            },

            // admin:
            {
                path: "adminProfile",
                element: <AdminRoute><AdminProfile></AdminProfile></AdminRoute>
            },
            {
                path: "manageUsers",
                element: <AdminRoute><ManageUsers></ManageUsers></AdminRoute>
            },
            {
                path: "announcement",
                element: <AdminRoute><Announcement></Announcement></AdminRoute>
            },
            {
                path: "activities",
                element: <Activities></Activities>
            }
            
        ]
    }
]);