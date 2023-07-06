import { useEffect, useState } from 'react'
import './Signup.css'

import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addCode, updateUser } from '../../Store/Slices/UserDataSlice'
import { useSelector } from 'react-redux'


import { db } from '../../config/firebase';
import { collection, getDocs, where, query, doc, getDoc, updateDoc } from 'firebase/firestore'

// import bgImage from '../../Images/bg1.jpg'


import Loader from '../../Components/Loader/Loader';


function Signup() {
  const params = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const reduxUser = useSelector(state => state.UserReducer)
  console.log("reduxUser", reduxUser)

  const [ldDoc, setLdDoc] = useState({})
  console.log("ldDoc>>>", ldDoc)

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [isLoading, setIsLoading] = useState(false);


  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    console.log(params)
    checkCode(params.code)
  }, [])

  const checkCode = async (code) => {
    console.log(code)

    try {
      const luckyDrawsCollectionRef = collection(db, 'luckyDraws');
      const codeQuery = query(luckyDrawsCollectionRef, where('code', '==', code));
      const querySnapshot = await getDocs(codeQuery);

      if (!querySnapshot.empty) {
        const codeDoc = querySnapshot.docs[0].data()
        const documentTitle = querySnapshot.docs[0].id
        if (codeDoc.isActive) {
          dispatch(addCode({ code, codeMatched: true }))
          setLdDoc({ ...codeDoc, documentTitle, })
        }
        else {
          alert("The Lucky Draw has ended")
          dispatch(addCode({ code: null, codeMatched: false }))
          navigate("/")
        }
      }
      else {
        alert("The Lucky Draw does not exist")
        dispatch(addCode({ code: null, codeMatched: false }))
        navigate("/")
      }
    } catch (error) {
      console.error("Error retrieving document:", error);
    }

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // You can add your logic here to handle the form submission
    console.log(`Name: ${name}, Email: ${email}`);

    setIsLoading(true);

    try {


      const docRef = doc(db, 'luckyDraws', ldDoc.documentTitle);
      const docSnap = await getDoc(docRef);
      const { users } = docSnap.data();
      console.log("users>>>", users)

      const checkEmail = users.some(user => user.email === email.toLowerCase())
      console.log(checkEmail)

      if (checkEmail) {
        alert("email already exists")
        setIsLoading(true);
      }
      else {
        let newUser = {
          id: users.length + 1,
          name,
          email: email.toLowerCase(),
        }
        users.push(newUser)
        console.log(users)
        await updateDoc(docRef, { users, totalUsers: newUser.id });
        alert("successfully signed up")

        setName("")
        setEmail("")

        dispatch(updateUser(newUser))
        setIsLoading(false);

        navigate(`/dashboard/${ldDoc.code}`)

      }





    }

    catch (err) {
      console.log('Error:', err)
      alert(err.message)
    }

  };


  return (
    <>
      <div>
        {isLoading && <Loader />} {/* Show the loader if isLoading is true */}
        {/* Your component's content */}
       
      </div>

      <div className="container-1">
        <div className="image-section-1" style={{ backgroundImage: `url(${ldDoc.imgUrl})` }}></div>
        <div className="content-section-1">
          <div className="content-content-2">
            <h1 className='personal'>Personal Information</h1>
            <p className='please'>Please enter below your personal information to continue.</p>
            <div className="codebtn-1">
              <form onSubmit={handleSubmit} >
                <input
                  type="text"
                  placeholder="Name"
                  className="input-field-1"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
                <input
                  className="input-field-1"
                  type="email"
                  placeholder="Email"
                  value={email}
                  required
                  onChange={handleEmailChange}
                />
                <button className="button-continue" type="submit" >Continue</button>
              </form>
            </div>

          </div>
          <div className="powered-2">
            <p className="invision">Powered by Invision Solutions</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
