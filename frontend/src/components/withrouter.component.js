// src/withRouter.js
import { useNavigate } from 'react-router-dom';

const withRouter = (Component) => {
    function ComponentWithRouterProp(props) {
        let navigate = useNavigate();
        return <Component {...props} navigate={navigate} />;
    }

    return ComponentWithRouterProp;
}

export default withRouter;