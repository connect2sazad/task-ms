import { BrowserRouter as Router } from 'react-router-dom';

import WebRoutes, { } from './components/webroutes.component';

import './assets/css/style001.css'
import './App.css';
import { AuthProvider } from './components/auth.component';

function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <WebRoutes />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
