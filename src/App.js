import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'

import Code from './Views/Code/Code';
import Signup from './Views/Signup/Signup';
import Dashboard from './Views/Dashboard/Dashboard';
import New from './Views/New/New';
import AdminDashboard from './Views/AdminDashboard/AdminDashboard';
import AdminLogin from './Views/AdminLogin/AdminLogin';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Recipt from './Views/Recipt';

function App() {

  //PROTECTED ROUTING

  const userData = useSelector((state) => state.UserReducer)
  console.log("redux userData", userData)
  const adminData = useSelector((state) => state.AdminReducer)
  console.log("redux adminData", adminData)
  const dispatch = useDispatch()

  const protectedRoute = (component) => {
    if (userData.user) {
      return component
    }
    else {
      return <Navigate to="/" replace />
      // return <Login />
    }
  }



  const unProtectedRoute = (component) => {
    if (userData.user) {
      return <Navigate to="/dashboard" replace />
      // return <Dashboard userData={userData}/>
    }
    else {
      return component
    }
  }
  

  const adminProtection = (component) => {
    if (adminData.admin) {
      return component
    }
    else {
      return <Navigate to="/admin-login" replace />
      // return <Login />
    }
  }

  const adminUnProtection = (component) => {
    if (adminData.admin) {
      return <Navigate to="/admin-dashboard" replace />
      // return <Dashboard userData={userData}/>
    }
    else {
      return component
    }
  }



  return (

    <Routes>
      <Route path='/' element={<Code />} />
      <Route path='/signup/:code' element={<Signup />} />
      <Route path='/recipt/:code' element={<Recipt />} />
      {/* <Route path='/dashboard/:code' element={<Dashboard />} /> */}
      <Route path='/dashboard/:code' element={protectedRoute(<Dashboard />)} />
      <Route path='/admin-dashboard' element={adminProtection(<AdminDashboard />)} />
      <Route path='/admin-login' element={adminUnProtection(<AdminLogin />)} />
      <Route path='/new' element={<New />} />
    </Routes>

    //  <Code />
  );
}

export default App;
