import { Routes, Route } from 'react-router-dom';

import HomePage from '../pages/home';

const WebRoutes = () => {
    return(
        <Routes>
            <Route exact path='/' element={<HomePage/>} />
            <Route exact path='/home' element={<HomePage/>} />
        </Routes>
    );
}

export default WebRoutes;