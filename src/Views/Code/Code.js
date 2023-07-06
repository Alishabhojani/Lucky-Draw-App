import './Code.css'
import line from "../../Images/line.png";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCode } from '../../Store/Slices/UserDataSlice';
import {useNavigate} from 'react-router-dom'

import { db } from '../../config/firebase';
import { collection, getDocs, where, query } from 'firebase/firestore'

function Code() {
  const [code, setCode] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const reduxUser = useSelector(state => state.UserReducer)
  console.log(reduxUser)

  async function joinLuckyDraw() {
    // console.log("joined", code)

    try {
      const luckyDrawsCollectionRef = collection(db, 'luckyDraws');
      const codeQuery = query(luckyDrawsCollectionRef, where('code', '==', code));
      const querySnapshot = await getDocs(codeQuery);

      if (!querySnapshot.empty) {
        const codeDoc = querySnapshot.docs[0].data()
        if(codeDoc.isActive){
          dispatch(addCode({code, codeMatched: true}))
          navigate(`/signup/${code}`)
        }
        else {
          navigate(`/dashboard/${code}`)
        }
      } 
      else {
        alert("Please write the correct code")
      }
    } 
    catch (error) {
      console.error("Error retrieving document:", error);
    }


}

return (
  <>
    <div className="container">
      <div className="image-section">
        <div className="image-content">
          <h2>Please enter the joining code to join in this lucky draw.</h2>
          <img src={line}></img>
        </div>
      </div>
      <div className="content-section">
        <div className="content-content">
          <h1>Join Lucky Draw</h1>
          
          <div >
            <p className="codebtn">Code</p>
            <input
              id="code-input"
              type="number"
              className="code-input"
              placeholder=" Enter code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button className='cd-button' onClick={joinLuckyDraw}>Join</button>
        </div>
        <div className="powered">
          <p className="invision"> Powered by Invision Solutions</p>
        </div>
      </div>
    </div>
  </>
);
}

export default Code
