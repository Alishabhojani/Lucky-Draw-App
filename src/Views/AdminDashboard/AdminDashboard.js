import React from 'react';

import './AdminDashboard.css'

import img1 from '../../Images/avatar1.png';
import img2 from '../../Images/profile.svg';
import img3 from '../../Images/gift.svg';
import img4 from '../../Images/logout.svg';
import { AiOutlineDelete } from "react-icons/ai";
import { AiFillEdit, AiOutlinePlus } from "react-icons/ai";

import { useSelector, useDispatch } from 'react-redux';
import { updateTotalLuckyDraw } from '../../Store/Slices/LuckyDrawSlice';

import { auth, db, storage } from "../../config/firebase"
import { addDoc, doc, collection, setDoc, getDocs, getDoc, query, where, Timestamp, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useEffect, useState } from 'react';

import Modal from 'react-modal';
import pic from '../../Images/picture.svg';

import { BsFacebook } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';

import { AiFillTrophy } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';


Modal.setAppElement('#root'); // Set the app root element for accessibility







function SearchBar() {
  const handleSearch = (event) => {
    event.preventDefault();
    // Perform search logic here
  };

  return (
    <form className='search-form' onSubmit={handleSearch}>
      <input type='text' placeholder='Search...' />
    </form>
  );
}

function AdminDashboard() {

  const dispatch = useDispatch()



  // TOTAL LUCKY DRAWS

  const reduxLuckyDraws = useSelector(state => state.LuckyDrawReducer.totalLuckyDraws)
  console.log("reduxLuckyDraws>>>", reduxLuckyDraws)

  // const [totalLuckyDraws, setTotalLuckyDraws] = useState([])


  const refreshLuckyDraws = async () => {
    console.log('refreshLuckyDraws useeffect')
    try {
      const querySnapshot = await getDocs(collection(db, 'luckyDraws'));
      const luckyDraws = [];

      querySnapshot.forEach((doc) => {
        // const { expiresOn } = doc.data()
        // const expiresOnDate = expiresOn.toDate();
        let newLuckyDraw = doc.data()
        // newLuckyDraw.expiresOn = expiresOnDate
        // console.log(newLuckyDraw)
        luckyDraws.push(newLuckyDraw);
      });

      dispatch(updateTotalLuckyDraw(luckyDraws))

    } catch (error) {
      console.error("Error fetching Total LuckyDraws:", error);
    }
  };

  useEffect(() => {
    refreshLuckyDraws()
  }, [])


  // Modal Work
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [newLuckyDrawName, setNewLuckyDrawName] = useState("")
  const [newLuckyDrawDate, setNewLuckyDrawDate] = useState("");
  const [newLuckyDrawTime, setNewLuckyDrawTime] = useState("");
  const [newLuckyDrawImage, setNewLuckyDrawImage] = useState(null);


  const [displayName, setDisplayName] = useState("")
  const [displayNumber, setDisplayNumber] = useState("")
  const [displayDate, setDisplayDate] = useState("")


  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files;
    setNewLuckyDrawImage(file);
  };

  const handleChooseFile = () => {
    document.getElementById('imageInput').click();
  };

  const createNewLuckyDraw = async (e) => {
    e.preventDefault()
    console.log("handleCreate working", newLuckyDrawImage)
    if (!newLuckyDrawImage) {
      alert("Please add an image")
      return
    }

    const querySnapshot = await getDocs(
      query(collection(db, 'luckyDraws'), where('name', '==', newLuckyDrawName.toLowerCase()))
    );

    if (!querySnapshot.empty) {
      // Email already exists, show an error message or handle it as needed
      alert('Lucky Draw already exists');
      return;
    }


    // const dateTimeString = `${newLuckyDrawDate}T${newLuckyDrawTime}`;
    // const dateTime = new Date(dateTimeString);
    // const formattedDateTime = dateTime.toLocaleString('en-US', {
    //   month: '2-digit',
    //   day: '2-digit',
    //   year: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    //   hour12: true,
    // });
    // console.log(dateTime)

    const luckyDrawsCollectionRef = collection(db, 'luckyDraws');

    // Get the total number of documents in the "luckyDraws" collection
    const luckyDrawsQuery = query(luckyDrawsCollectionRef);
    const luckyDrawsSnapshot = await getDocs(luckyDrawsQuery);
    const totalDocuments = luckyDrawsSnapshot.size;

    // Generate a random 6-digit numerical code
    let code = '';
    let isCodeUnique = false;

    while (!isCodeUnique) {
      code = Math.floor(100000 + Math.random() * 900000).toString();

      // Check if the generated code already exists in any document
      const codeQuery = query(luckyDrawsCollectionRef, where('code', '==', code));
      const codeSnapshot = await getDocs(codeQuery);
      isCodeUnique = codeSnapshot.empty;
    }

    //ADDING THE IMAGE
    const imgRef = ref(storage, `Images/${newLuckyDrawName}`)
    const imgUpload = await uploadBytes(imgRef, newLuckyDrawImage[0])
    const imgUrl = await getDownloadURL(imgUpload.ref)
    console.log("imgUrl>>>", imgUrl)

    // Create a new lucky draw object
    const newLuckyDraw = {
      id: totalDocuments + 1,
      name: newLuckyDrawName,
      code: code,
      users: [],
      totalUsers: 0,
      isActive: true,
      winner: [],
      totalWinners: 0,
      // expiresOn: Timestamp.fromDate(dateTime),
      isStarted: false,
      imgUrl: imgUrl,
    };

    // Add the new lucky draw to the "luckyDraws" collection
    await addDoc(luckyDrawsCollectionRef, newLuckyDraw);



    // Reset the input field
    setNewLuckyDrawName('');
    setNewLuckyDrawDate('');
    setNewLuckyDrawTime('');

    setDisplayName(newLuckyDrawName)
    setDisplayNumber(code)
    // setDisplayDate(formattedDateTime)

    refreshLuckyDraws()

    // alert("lucky draw created")


    closeModal();
    openShareModal()
  };


  // SHARE MODAL

  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);

  const openShareModal = () => {
    setShareModalIsOpen(true);
  };

  const closeShareModal = () => {
    setShareModalIsOpen(false);
  };

  const handleFirstCopy = () => {
    navigator.clipboard.writeText(displayNumber);
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 3000);
  };

  const handleSecondCopy = () => {
    const linkInput = document.getElementById('link-input');
    linkInput.select();
    document.execCommand('copy');
    setCodeCopied(true);
    setTimeout(() => {
      setCodeCopied(false);
    }, 3000);
  };


  const startLuckyDraw = async (code) => {
    try {

      let documentTitle
      let codeDoc

      const luckyDrawsCollectionRef = collection(db, 'luckyDraws');
      const codeQuery = query(luckyDrawsCollectionRef, where('code', '==', code));
      const querySnapshot = await getDocs(codeQuery);

      if (!querySnapshot.empty) {
        codeDoc = querySnapshot.docs[0].data()
        documentTitle = querySnapshot.docs[0].id

      }



      const docRef = doc(db, 'luckyDraws', documentTitle);
      const docSnap = await getDoc(docRef);

      const randomIndex = Math.floor(Math.random() * codeDoc.users.length);
      const winnerObj = { ...codeDoc.users[randomIndex] }
      console.log(winnerObj)

      await updateDoc(docRef, { isStarted: true, winner: [winnerObj], isActive: false });
      alert("lucky draw started")

    }
    catch (err) {
      console.log('Error:', err)
      // alert(err.message)
    }
  }


  // LEADERBOARD MODAL
  const [LeaderboardModalIsOpen, setLeaderboardModalIsOpen] = useState(false);
  
  const [leaderboardUsers, setLeaderboardUsers] = useState([]) 
  console.log("leaderboardUsers>>>", leaderboardUsers)

  const openLeaderboardModal = (users) => {
    setLeaderboardModalIsOpen(true);
    setLeaderboardUsers([...users])
    
  };

  const closeLeaderboardModal = () => {
    setLeaderboardModalIsOpen(false);
  };


  return (
    <div className='main-div'>
      <div className='div2'>
        <img src={img1} className='avatar' alt='Avatar 1' />
        <img src={img2} className='avatar2' alt='Avatar 2' />
        <img src={img3} className='avatar3' alt='Avatar 3' />
        <img src={img4} className='avatar4' alt='Avatar 4' />
      </div>
      <div className='div3'>
        <h3 className='h3'>Lucky Draw</h3>
        <div className='button-wrapper'>
          <SearchBar />
          <button
            onClick={openModal}
            className='create-button'>
            <AiOutlinePlus className='plus-icon' color='white' />
            Create Lucky Draw
          </button>
        </div>


        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="ali_modal"
          overlayClassName="ali_overlay"
          closeTimeoutMS={200}
        >
          <div className="ali_modal-header">
            <h3 className='ali_mainhead'>Create Lucky Draw</h3>
            <button className="ali_close-button" onClick={closeModal}>
              &times;
            </button>
          </div>

          <div className="ali_modal-content" >
            <label htmlFor="image" className='ali_text' onClick={handleChooseFile}>
              <div className='ali_imagelogo'>  <img src={pic} alt="" className="ali_image-icon" /></div>
              Add image
            </label>
            <form onSubmit={createNewLuckyDraw} >
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              // required
              />

              <input
                className='ali_nameinput'
                type="text"
                id="name"
                value={newLuckyDrawName}
                onChange={(e) => setNewLuckyDrawName(e.target.value)}
                placeholder=" Name"
                required
              />

              {/* <input
              className='ali_nameinput'
              placeholder="Expires on (Date)"
              value={newLuckyDrawDate}
              onChange={(e) => setNewLuckyDrawDate(e.target.value)}
              type="date"
              required
            />

            <input
              className='ali_nameinput'
              placeholder="Expires on (Time)"
              value={newLuckyDrawTime}
              onChange={(e) => setNewLuckyDrawTime(e.target.value)}
              type="time"
              required
            /> */}

              <button className='ali_createbutton'>Create</button>
            </form>
          </div>
        </Modal>

        <Modal
          isOpen={shareModalIsOpen}
          onRequestClose={closeShareModal}
          className="modal"
          overlayClassName="ppoverlay"
          closeTimeoutMS={200}
        >
          <div className="modal-header">
            <h3 className='mainheada'>Share Code</h3>
            <button className="close-button " onClick={closeShareModal}>
              &times;
            </button>
          </div>

          <div className="modal-content">
            <div className="box-input">
              <p className='uniquebox'> {displayNumber}</p>
              <button onClick={handleFirstCopy} className='i-button' >{codeCopied ? 'Copied' : 'Copy'}</button>
            </div>

            <div className="content">
              <p>Share this link via</p>
              <ul className="icons" style={{ display: "flex", flexDirection: "row" }}>
                <a href="#" >
                  <BsFacebook />
                </a>
                {/* <a href={`https://wa.me/?text=http://luckydraw-env-1.eba-hecxshwq.us-west-2.elasticbeanstalk.com/#/signup/${displayNumber}`} target="_blank" rel="noopener noreferrer">
                  <IoLogoWhatsapp />
                </a> */}
                <a href={`https://wa.me/?text=${encodeURIComponent(`Click the link to join ${displayName} LuckyDraw.\r\n\r\nhttp://luckydraw-env-1.eba-hecxshwq.us-west-2.elasticbeanstalk.com/#/signup/${displayNumber}`)}`} target="_blank" rel="noopener noreferrer">
                  <IoLogoWhatsapp />
                </a>
                <a href="#">
                  <AiFillTwitterCircle />
                </a>
                <a href="#">
                  <AiFillInstagram />
                </a>
                <a href="#">
                  <BsTelegram />
                </a>
              </ul>

              <p>Or copy link</p>
              <div className="field">

                <input id="link-input" type="text" readOnly value={`http://luckydraw-env-1.eba-hecxshwq.us-west-2.elasticbeanstalk.com/#/signup/${displayNumber}`} />
                <button onClick={handleSecondCopy} className='i-button2  '>{codeCopied ? 'Copied' : 'Copy'}</button>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
        isOpen={LeaderboardModalIsOpen}
        onRequestClose={closeLeaderboardModal}
        className="aliumodal"
        overlayClassName="ppoverlay"
        contentLabel="Modal"
      >
        <div className="leader_modal-content">
          <div className="leader_modal-header">
            <h3 className="mainheadali">Participants</h3>
            <button className="close-button" onClick={closeLeaderboardModal}>
              <FaTimes />
            </button>
          </div>

          <div className="modal-body">
            <ol style={{ listStyleType: 'none' }}>
              {/* {winners.map((name, index) => (
                <li key={index}>
                  <div className="mainbuserbox winnered">
                    <div>
                      <span className="numcss whitenm">{index + 1}</span>
                    </div>
                    <div className="partbox">
                      <p className="maipadd">
                        <span className="aaname">{name}</span>
                        <br />
                        <span className="rolew">Winner</span>
                      </p>
                    </div>
                    <AiFillTrophy className="wtrophy" />
                  </div>
                </li>
              ))} */}
              {leaderboardUsers.map((name, index) => (
                <li key={index}>
                  <div className="mainbuserbox">
                    <span className="numcss">{index + 1}</span>
                    <div className="partbox">
                      <p className="maipadd">
                        <span className="pname">{name.name}</span>
                        <br />
                        <span className="rolep">Participant</span>
                      </p>
                    </div>
                    <AiFillTrophy className="parttrophy" />
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Modal>

        <table className='data-table' cellSpacing={0}>
          <thead>
            <tr>
              <th className='thh'>#</th>
              <th className='thh empty-4'>Name</th>
              <th className='thh empty-3'>Code</th>
              <th className='thh empty-2'>Participants</th>
              <th className='thh empty'>Started?</th>
              <th className='thh'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reduxLuckyDraws.map((value, index) => (
              <tr className='elements' key={index}>
                <td>{index + 1}</td>
                <td className='empty-4'>{value.name}</td>
                <td className='empty-3'>{value.code}</td>
                <td className='empty-2'>{value.totalUsers}</td>
                <td className='empty'>
                  {/* <button className={value.isActive ? 'status-active' : 'status-inactive'}>
                    {value.isActive ? 'Start now' : 'Inactive'}
                  </button> */}
                  <button className={value.isActive ? 'status-active' : 'status-inactive'} onClick={() => {
                    value.isActive
                      ? startLuckyDraw(value.code)
                      : alert("Lucky Draw already Drawn")
                  }
                  }>
                    {value.isActive ? 'Start Now' : 'Completed'}
                  </button>
                </td>

                <td className='leadparent'>
                  <p className='leadbord' onClick={() => openLeaderboardModal(value.users)}>Participants</p>
                  <AiOutlineDelete className='delete' />
                  <AiFillEdit className='delete' />
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;