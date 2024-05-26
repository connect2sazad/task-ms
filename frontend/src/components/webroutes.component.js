import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home';
import LoginPage from '../pages/login';
import ProfilePage from '../pages/profile';
import LogoutPage from '../pages/logout';
import NewPostPage from '../pages/newpost';
import UsersPage from '../pages/users';
import UserRolesPage from '../pages/user-roles';

const routes = [
    {
        page: <HomePage/>,
        link: '/'
    },
    {
        page: <HomePage/>,
        link: '/home'
    },
    {
        page: <HomePage/>,
        link: '/posts'
    },
    {
        page: <NewPostPage/>,
        link: '/new-post'
    },
    {
        page: <UsersPage/>,
        link: '/users'
    },
    {
        page: <UserRolesPage/>,
        link: '/user-roles'
    },
    {
        page: <LoginPage/>,
        link: '/login'
    },
    {
        page: <ProfilePage/>,
        link: '/profile'
    },
    {
        page: <LogoutPage/>,
        link: '/logout'
    },
]

const WebRoutes = () => {
    return(
        <Routes>
            {
                routes.map((a_route, index)=>{
                    return (
                        <Route exact key={index} path={a_route.link} element={a_route.page} />
                    );
                })
            }
        </Routes>
    );
}

export default WebRoutes;