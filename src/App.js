import logo from './logo.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom'

import Code from './Views/Code/Code';
import Signup from './Views/Signup/Signup';
import Dashboard from './Views/Dashboard/Dashboard';
import New from './Views/New/New';
import AdminDashboard from './Views/AdminDashboard/AdminDashboard';
import AdminLogin from './Views/AdminLogin/AdminLogin';

function App() {
  return (
   
    <Routes>
      <Route path='/' element={<Code />} />
      <Route path='/signup/:code' element={<Signup />} />
      <Route path='/dashboard/:code' element={<Dashboard />} />
      <Route path='/admin-dashboard' element={<AdminDashboard />} />
      <Route path='/admin-login' element={<AdminLogin />} />
      <Route path='/new' element={<New />} />
    </Routes>

  //  <Code />
  );
}

export default App;
