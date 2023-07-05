import React, { useEffect, useRef, useState } from "react";
import ConfettiExplosion from "react-confetti-explosion";
import pic from '../../Images/Congratulation-PNG-Picture.png'
import "./Dashboard.css";

import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { db } from '../../config/firebase';
import { collection, getDocs, where, query, doc, getDoc, updateDoc, onSnapshot } from 'firebase/firestore'
import { addCode } from "../../Store/Slices/UserDataSlice";




const Dashboard = () => {

  const params = useParams()
  // console.log(params)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [ldDoc, setLdDoc] = useState({})
  console.log("ldDoc>>>", ldDoc)

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
          setParticipants(codeDoc.users)
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
    }
    catch (error) {
      console.error("Error retrieving document:", error);
    }

  }



  const containerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [winner, setWinner] = useState("");
  const [isExploding, setIsExploding] = useState(false);
  const [congrt, setCogrt] = useState(false)
  const [participants, setParticipants] = useState([])
  console.log('participants>>>', participants)

  useEffect(() => {

    // const luckyDrawId = ldDoc.documentTitle; // Replace with the actual lucky draw ID
    const luckyDrawRef = doc(db, 'luckyDraws', "QD19K91tOC2moVQOvnMW");

    const unsubscribe = onSnapshot(luckyDrawRef, (snapshot) => {
      if (snapshot.exists()) {
        const luckyDrawData = snapshot.data();

        if (luckyDrawData.isStarted) {
          const participantsData = luckyDrawData.users || [];

          setParticipants(participantsData);
          setIsScrolling(true);

          const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % participantsData.length);
          }, 0); // Adjust the interval duration as desired

          setTimeout(() => {
            clearInterval(interval);

            // Select the winner
            const randomIndex = Math.floor(Math.random() * participantsData.length);
            setWinner(participantsData[randomIndex].name);

            // Remove the winner's name from the array
            participantsData.splice(randomIndex, 1);

            setIsScrolling(false);
            setIsExploding(true);
            setCogrt(true);
          }, 5000); // 5000 milliseconds (5 seconds)
        } 
        else {
          alert('The Lucky Draw has ended');
          setIsScrolling(false);
          setWinner('');
          setIsExploding(false);
          setCogrt(false);
        }
      } 
      else {
        alert('The Lucky Draw does not exist');
        setIsScrolling(false);
        setWinner('');
        setIsExploding(false);
        setCogrt(false);
      }
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();
  }, []);



const handleButtonClick = () => {
  if (!isScrolling && !winner) {
    setCurrentIndex(0); // Reset the scrolling index
    setWinner(""); // Reset the winner
    setIsScrolling(true);
  }
  else if (winner) {
    setIsScrolling(false);
    setWinner("");
    setIsExploding(false);
    setCogrt(false);
  }
};

return (
  <div className="container-10">
    <div className="section1"></div>

    <div className="section2">
      {congrt ? (<div className="pic1">
        <img src={pic} alt="" />
      </div>) : ''}
      <h2 className="h2">{ldDoc.name}</h2>

      <div className="outer-div">
        <div className="blank-div">
          <div className="border">
            <div className="scrolling-names-container">
              {winner ? (
                <div className="winner-container">
                  <div className="winner">{winner}</div>
                </div>
              ) : (
                <div
                  className={`scrolling-names ${isScrolling ? "scrolling" : ""
                    }`}
                  ref={containerRef}
                >
                  {participants.map((participant, index) => (
                    <div key={index} className="name-item">
                      {participant.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {isExploding && (
        <ConfettiExplosion
          force={0.3}
          duration={5000}
          particleCount={600}
          width={1600}
          height={3000}
        />
      )}
      {/* {!isScrolling && !winner && (
          <button className="draw-button" onClick={handleButtonClick}>
            Start Scrolling
          </button>
        )}
        {winner && (
          <button className="draw-button" onClick={handleButtonClick}>
            Start Again
          </button>
        )} */}
    </div>
  </div>
);
};

export default Dashboard;
