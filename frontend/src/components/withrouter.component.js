// src/withRouter.js
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let params = useParams();
        let navigate = useNavigate();
        let location = useLocation();

        return <Component {...props} router={{ params, navigate, location }} />;
    }

    return ComponentWithRouterProp;
}

export default withRouter;