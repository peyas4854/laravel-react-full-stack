import {createBrowserRouter} from 'react-router-dom';
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Users from "./views/User.jsx";
import NotFound from "./NotFound.jsx";
import DefaultLayout from "./components/layout/DefaultLayout";
import GuestLayout from "./components/layout/GuestLayout";
import Dashboard from "./views/Dashboard";
import UserForm from "./views/UserForm";


const router = createBrowserRouter([
    // Default Layout
    {
        path: '/',
        element: <DefaultLayout/>,
        children:[
            {
                path: '/',
                element: <Dashboard/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/users/new',
                element: <UserForm key="userCreate"/>
            },
            {
                path: '/users/:id',
                element: <UserForm key="userUpdate"/>
            },
        ]
    },
    // Guest Layout
    {
        path: '/',
        element: <GuestLayout/>,
        children:[
            {
                path: '/login',
                element: <Login/>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
        ]
    },

    {
        path: '*',
        element: <NotFound/>
    },
])
export default router;
