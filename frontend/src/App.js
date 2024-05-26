import { BrowserRouter as Router } from 'react-router-dom';

import WebRoutes from './components/webroutes.component';

// import './assets/css/style001.css'
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <WebRoutes />
      </Router>
    </>
  );
}

export default App;
