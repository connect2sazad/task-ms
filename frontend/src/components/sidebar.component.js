import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ styles, selected }) => {

    const menus = [
        {
            id: "home",
            name: "Home",
            link: "/",
        },
        {
            id: "new-post",
            name: "New Post",
            link: "/new-post",
        },
        {
            id: "users",
            name: "Users",
            link: "/users",
        },
        {
            id: "profile",
            name: "Profile",
            link: "/profile",
        },
        {
            id: "settings",
            name: "Settings",
            link: "/settings",
        },
        {
            id: "logout",
            name: "Logout",
            link: "/logout",
        },
    ]

    return (
        <>
            <div className={styles}>
                <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ minHeight: '81vh' }}>

                    <ul className="nav nav-pills flex-column mb-auto">  
                        {
                            menus.map((menu) => (
                                <li className="nav-item" key={menu.id}>
                                    <Link to={menu.link} className={`nav-link ${menu.id === selected ? 'active' : 'link-dark'}`} aria-current="page">
                                        {menu.name}
                                    </Link>
                                </li>
                            ))
                        }
                    </ul>

                </div>
            </div>
        </>
    );
};

export default Sidebar;
