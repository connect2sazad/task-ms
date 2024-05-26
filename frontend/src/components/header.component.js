import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Search from "./search.component";

const Header = () => {

    const [user, setUser] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const verifyAuth = async () => {
            try {

                const response = await axios.get('http://localhost:5555/verify-auth', {
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.status === 200) {
                    setUser(response.data.userid);
                } else {
                    navigate('/login');
                }

            } catch (e) {
                navigate('/login');
            }
        }

        verifyAuth();
    }, [user, navigate, token]);

    return (
        <>
            <nav className="navbar bg-body-tertiary border-bottom">
                <div className="container-fluid">
                    {
                        (token) ?
                            <>
                                <Link className="navbar-brand" to="/profile">Hello, {user}</Link>
                                <Search />
                                <Link to="/logout" className="btn btn-outline-secondary">Logout</Link>
                            </>
                            :
                            <>
                                <Link className="navbar-brand" to="/profile">Hello, user</Link>
                            </>
                    }

                </div>
            </nav>
        </>
    );
}



export default Header;