import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/header.component';
import Footer from '../components/footer.component';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/');
        }

    }, [navigate]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async e => {

        e.preventDefault();

        try {

            const response = await axios.post('http://localhost:5555/login', { email, password });
            // console.log(response);
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userid', response.data.userid);

            // console.log(response.data.userid);

            navigate('/');

        } catch (error) {

            setMessage('Login failed: ', error);

        }

    }

    return (
        <>
            <>
                <Header />
                <section className="container d-flex justify-content-center align-items-center" style={{ minHeight: "81vh" }}>
                    <div className="login-section">
                        <form onSubmit={handleSubmit}>
                            <h1 className="mb-3">Login</h1>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email or Userid</label>
                                <input type="text" className="form-control" id="email" name="email" value={email} onChange={handleEmail} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input type="password" className="form-control" id="password" name="password" value={password} onChange={handlePassword} />
                            </div>
                            <button type="submit" className="btn btn-primary">Login</button>
                            {message && <p>{message}</p>}
                        </form>
                    </div>
                </section>
                <Footer />
            </>

        </>
    );
}

export default LoginPage;