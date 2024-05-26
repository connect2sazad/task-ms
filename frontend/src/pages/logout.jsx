import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const navigate = useNavigate();
    
    useEffect(() => {

        localStorage.removeItem('token');
        navigate('/login');
        
    });

    return(
        <>
        </>
    );

}

export default LogoutPage;