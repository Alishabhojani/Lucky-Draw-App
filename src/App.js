import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'

import Code from './Views/Code/Code';
import Signup from './Views/Signup/Signup';
import AdminDashboard from './Views/AdminDashboard/AdminDashboard';
import AdminLogin from './Views/AdminLogin/AdminLogin';

function App() {
  return (
   
    <Routes>
      <Route path='/' element={<Code />} />
      <Route path='/signup/:code' element={<Signup />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/admin-login' element={<AdminLogin />} />
    </Routes>

  //  <Code />
  );
}

export default App;
