import "./AdminLogin.css";
import line from "../../Images/line.png";
import { useState } from "react";
import Loader from "../../Components/Loader/Loader";

import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux";

import { db } from '../../config/firebase';
import { collection, getDocs, where, query, doc, getDoc, updateDoc } from 'firebase/firestore'

import { loginAdmin } from "../../Store/Slices/AdminSlice";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const reduxAdmin = useSelector(state => state.AdminReducer)
  // console.log("reduxAdmin", reduxAdmin)


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add your logic here to handle the form submission
    console.log(`Username: ${username}, Password: ${password}`);

    setIsLoading(true);

    try {
      const q = query(collection(db, "admins"), where("username", "==", username));

      const querySnapshot = await getDocs(q);
      console.log("querySnapshot>>>", querySnapshot.docs)

      if (querySnapshot.docs.length < 1) {
        alert("No admin found")
        setIsLoading(false)
      }
      else {

        if (querySnapshot.docs[0].data().username === username) {
          if (querySnapshot.docs[0].data().password === password) {
            console.log("done")
            dispatch(loginAdmin(querySnapshot.docs[0].data()))
            setIsLoading(false)
            navigate(`/admin-dashboard`)
          }
          else {
            alert("wrong password")
            setIsLoading(false)
          }
        }

        setIsLoading(false)
      }





    }


    catch (err) {
      console.log('Error:', err)
      alert(err.message)
      setIsLoading(false);
    }

  };

  return (
    <>
      <div>
        {isLoading && <Loader />} {/* Show the loader if isLoading is true */}
        {/* Your component's content */}

      </div>


      <div className="container-2">
        <div className="image-section-2">
          <div className="image-content-2">
            <h2>Login now to manage Lucky Draws</h2>
            <img src={line}></img>
          </div>
        </div>
        <div className="content-section-2">
          <div className="content-content-1">
            <h1 className="login">Login</h1>
            <form onSubmit={handleSubmit}>
              <div >
                <p className="codebtn-3">Username</p>
                <input
                  id="username-input"
                  type="text"
                  className="code-input-3"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div >
                <p className="codebtn">Password</p>
                <input
                  id="password-input"
                  type="password"
                  className="code-input-3"
                  placeholder=" Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="button-admin">Join</button>
            </form>
          </div>
          <div className="powered-4">
            <p className="invision"> Powered by Invision Solutions</p>
          </div>
        </div>
      </div >
    </>
  );
}

export default AdminLogin;
