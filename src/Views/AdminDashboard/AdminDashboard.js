import React, { useEffect, useState } from 'react';
import './AdminDashboard.css';
import img1 from '../../Images/avatar1.png';
import img2 from '../../Images/profile.svg';
import img3 from '../../Images/gift.svg';
import img4 from '../../Images/logout.svg';
import { AiOutlineDelete } from 'react-icons/ai';
import { AiFillEdit } from 'react-icons/ai';
import { TiPlusOutline } from 'react-icons/ti';
import { CiShare1 } from 'react-icons/ci';
import limg from '../../Images/Union 1.svg'
import aliy from '../../Images/aaa.png';

import { useSelector, useDispatch } from 'react-redux';
import { updateTotalLuckyDraw } from '../../Store/Slices/LuckyDrawSlice';
import { auth, db, storage } from '../../config/firebase';
import {
  addDoc,
  onSnapshot,
  doc,
  collection,
  setDoc,
  getDocs,
  getDoc,
  query,
  where,
  Timestamp,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Modal from 'react-modal';
import pic from '../../Images/picture.svg';
import { BsFacebook } from 'react-icons/bs';
import { IoLogoWhatsapp } from 'react-icons/io';
import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
import { BsTelegram } from 'react-icons/bs';
import { AiFillTrophy } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import Loader from '../../Components/Loader/Loader';
import { logoutAdmin } from '../../Store/Slices/AdminSlice';


Modal.setAppElement('#root'); // Set the app root element for accessibility









function AdminDashboard() {

  const dispatch = useDispatch()
  const [search, setSearch] = useState("")



  // TOTAL LUCKY DRAWS

  // const reduxLuckyDraws = useSelector(state => state.LuckyDrawReducer.totalLuckyDraws)
  // console.log("reduxLuckyDraws>>>", reduxLuckyDraws)

  const [totalLuckyDraws, setTotalLuckyDraws] = useState([])
  console.log("totalLuckyDraws>>>", totalLuckyDraws)


  // const refreshLuckyDraws = async () => {
  //   console.log('refreshLuckyDraws useeffect')
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'luckyDraws'));
  //     const luckyDraws = [];

  //     querySnapshot.forEach((doc) => {
  //       // const { expiresOn } = doc.data()
  //       // const expiresOnDate = expiresOn.toDate();
  //       let newLuckyDraw = doc.data()
  //       newLuckyDraw.docId = doc.id
  //       // newLuckyDraw.expiresOn = expiresOnDate
  //       // console.log(newLuckyDraw)
  //       luckyDraws.push(newLuckyDraw);
  //     });

  //     dispatch(updateTotalLuckyDraw(luckyDraws))

  //   } catch (error) {
  //     console.error("Error fetching Total LuckyDraws:", error);
  //   }
  // };

  useEffect(() => {

    console.log('refreshLuckyDraws useeffect')

    const collectionRef = collection(db, "luckyDraws");

    let luckyDraws = [];

    const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        console.log("change>>>", change)

        const doc = change.doc;

        // Handle document changes (added, modified, deleted)
        if (change.type === 'added') {
          console.log('New document:', doc.data());
          // luckyDraws = [...totalLuckyDraws]
          // luckyDraws.push({ ...doc.data(), docId: doc.id })
          // setTotalLuckyDraws(luckyDraws)

          const newDocument = doc.data();
          newDocument.docId = doc.id
          setTotalLuckyDraws(prevDocuments => [...prevDocuments, newDocument]);

        }

        else if (change.type === 'modified') {
          console.log('Modified document:', doc.data());

          const modifiedDoc = { docId: doc.id, ...doc.data() };
          console.log("modifiedDoc>>>", modifiedDoc)


          setTotalLuckyDraws((prevArray) => {
            const newArray = prevArray.map((item) =>
              item.docId === modifiedDoc.docId ? modifiedDoc : item
            );

            return newArray;
          });


        }

        else if (change.type === 'removed') {
          console.log('Removed document:', doc.data());

          setTotalLuckyDraws((prevArray) =>
            prevArray.filter((item) => item.docId !== doc.id)
          );

        }

      });
    });

    // Cleanup function to unsubscribe from the snapshot listener when the component unmounts
    return () => unsubscribe();

  }, []);


  // useEffect(() => {
  //   refreshLuckyDraws()
  // }, [])
///userwait modal
const [alishaModalIsOpen, setAlishaModalIsOpen] = useState(false);

  const openAlishaModal = () => {
    setAlishaModalIsOpen(true);
  };

  const closeAlishaModal = () => {
    setAlishaModalIsOpen(false);
  };

  // Modal Work
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [newLuckyDrawName, setNewLuckyDrawName] = useState("")
  const [newLuckyDrawDate, setNewLuckyDrawDate] = useState("");
  const [newLuckyDrawTime, setNewLuckyDrawTime] = useState("");
  const [newLuckyDrawImage, setNewLuckyDrawImage] = useState(null);
  const [newLuckyDrawType, setNewLuckyDrawType] = useState('');


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
    console.log("IMAGE SELECTED", file[0].name);
  };

  const handleChooseFile = () => {
    document.getElementById('imageInput').click();
  };



  const createNewLuckyDraw = async (e) => {
    e.preventDefault();
    console.log('handleCreate working', newLuckyDrawImage);
    if (!newLuckyDrawImage) {
      alert('Please add an image');
      return;
    }
    setIsLoading(true)

    const querySnapshot = await getDocs(
      query(collection(db, 'luckyDraws'), where('name', '==', newLuckyDrawName.toLowerCase()))
    );

    if (!querySnapshot.empty) {
      // Email already exists, show an error message or handle it as needed
      alert('Lucky Draw already exists');
      setIsLoading(false)
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

    // refreshLuckyDraws()

    setIsLoading(false)

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

      setIsLoading(true)

      let documentTitle
      let codeDoc

      const luckyDrawsCollectionRef = collection(db, 'luckyDraws');
      const codeQuery = query(luckyDrawsCollectionRef, where('code', '==', code));
      const querySnapshot = await getDocs(codeQuery);

      if (!querySnapshot.empty) {
        codeDoc = querySnapshot.docs[0].data()
        documentTitle = querySnapshot.docs[0].id

      }

      if (codeDoc.users.length <= 2) {
        alert("atleast 3 members required")
        setIsLoading(false)
        return
      }



      const docRef = doc(db, 'luckyDraws', documentTitle);
      const docSnap = await getDoc(docRef);

      const randomIndex = Math.floor(Math.random() * codeDoc.users.length);
      const winnerObj = { ...codeDoc.users[randomIndex] }
      console.log(winnerObj)

      await updateDoc(docRef, { isStarted: true, winner: [winnerObj], isActive: false });
      setIsLoading(false)
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

  const openLeaderboardModal = (users, winner) => {
    if (winner) {
      const sortedUsers = users
        .map((user) => ({
          ...user,
          isWinner: winner.some((winnerData) => winnerData.email === user.email),
        }))
        .sort((a, b) => (b.isWinner ? 1 : 0) - (a.isWinner ? 1 : 0));
      setLeaderboardModalIsOpen(true);
      setLeaderboardUsers([...sortedUsers])
    }


  };

  const closeLeaderboardModal = () => {
    setLeaderboardModalIsOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);


  // DELETE DOCUMENT
  const deleteDocument = async (documentId) => {
    setIsLoading(true)
    const docRef = doc(db, 'luckyDraws', documentId);

    try {

      await deleteDoc(docRef);
      console.log('Document successfully deleted!');
      setIsLoading(false)
    }
    catch (error) {
      console.error('Error deleting document:', error);
    }
  };


  //


  return (<>
    <div>
      {isLoading && <Loader />} {/* Show the loader if isLoading is true */}
      {/* Your component's content */}

    </div>



    <div className='main-div'>
      <div className='child'>
        <div className='div2'>
          <div className='imga1'>
            <img src={img1} className='avatar' alt='Avatar 1' />
          </div>
          <div className='imga2-3'>
            <img src={img2} className='avatar2' alt='Avatar 2' />
            <img src={img3} className='avatar3' alt='Avatar 3' />
          </div>
          <div className='imga4' onClick={() => dispatch(logoutAdmin())}>
            <img src={img4} className='avatar4' alt='Avatar 4' />
          </div>
        </div>
      </div>
      <div className='div3'>
        <h3 className='h3'>Lucky Draw</h3>
        <div className='button-wrapper'>

          <div className='search-form'>
            <input
              placeholder="Lucky Draw Name..."
              type='text'
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
            />
          </div>

          <div className='create-button' onClick={openModal}>
            <div>

              <TiPlusOutline size={18} className='plus' />
            </div>
            <div>

              <button className='btn11'>
                Create Lucky Draw
              </button>
            </div>
          </div>
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

      <div className="ali_modal-content">
        <label htmlFor="image" className="ali_text" onClick={handleChooseFile}>
          <div className="ali_imagelogo">
            <img src={pic} alt="" className="ali_image-icon" />
          </div>
          {newLuckyDrawImage ? `Image: ${newLuckyDrawImage[0].name}` : 'Add image'}
        </label>

        <form onSubmit={createNewLuckyDraw}>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            onChange={handleImageUpload}
            style={{ display: 'none' }}
          />

          <input   style={{marginTop:"20px",marginBottom:"20px"}}
            className='ali_nameinput'
            type="text"
            id="name"
            value={newLuckyDrawName}
            onChange={(e) => setNewLuckyDrawName(e.target.value)}
            placeholder="Name"
            required
          />

        <div >
          <select style={{marginBottom:"50px"}}
  className='ali_nameinput '
  value={newLuckyDrawType}
  onChange={(e) => setNewLuckyDrawType(e.target.value)}
  required
>
  <option disabled value="" hidden>Select Lucky Draw Type</option>
  <option value="Paid">Paid</option>
  <option value="Free">Free</option>
</select>

     
          </div>

          {/* ... */}

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

        <div className='wwww1'>

          <Modal
            isOpen={LeaderboardModalIsOpen}
            onRequestClose={closeLeaderboardModal}
            className="aliumodal"
            overlayClassName="ppoverlay"
            contentLabel="Modal"
          >
            <div className="leader_modal-content">
              <div className="leader_modal-header">
                <h3 className="mainheadali">Leaderboard</h3>
                <button className="close-button" onClick={closeLeaderboardModal}>
                  <FaTimes />
                </button>
              </div>

              <div className="modal-body">
                <ol style={{ listStyleType: 'none' }} className='llli'>
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

                  {leaderboardUsers.map((value, index) => (

                    <li className='ll2' key={index}>

                      <div style={{ backgroundColor: value.isWinner ? 'red' : null }} className="mainbuserbox">
                        <span style={{ color: value.isWinner ? 'white' : 'black' }} className="numcss">{index + 1}</span>
                        <div className="partbox">

                          <p style={{ color: value.isWinner ? 'white' : 'black' }} className="maipadd">
                            <span className="pname">{value.name}</span>
                            <br />
                            {
                              value.isWinner ? <span className="rolep" style={{ color: "whitesmoke", border: "none", fontFamily: "Arial, sans-serif", fontSize: "small" }} >Winner</span> : <span className="rolep">Participant</span>
                            }

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
        </div>

        <table className='data-table' cellSpacing={0}>
  <thead>
    <tr>
      <th className='thh'>#</th>
      <th className='thh empty-4'>Name</th>
      <th className='thh empty-3'>Code</th>
      <th className='thh empty-2'>Participants</th>
      <th className='thh empty'>
        Type
  
      </th>
      <th className='thh empty'>Status</th>
      <th className='thh'>Actions</th>
    </tr>
  </thead>
  <tbody>
    {/* WORK HERE */}
    {totalLuckyDraws.map((value, index) => {
      const type = Math.random() < 0.5 ? "Paid" : "Free";

      if (!search || value.name.toLowerCase().includes(search.toLowerCase())) {
        return (
          <tr className="elements" key={index}>
  <td>{index + 1}</td>
  <td className="empty-4">{value.name}</td>
  <td className="empty-3">{value.code}</td>
  <td className="empty-2">{value.totalUsers} 
    <div className="ai_image-container"  onClick={openAlishaModal}>
      <img src={limg} alt="Participants" className="ai_participant-image" />
      <span className="ai_image-text">{`${value.totalUsers} participants waiting`}</span>
    </div>
  </td>
  <Modal
        className="meh_alishamodal"
        overlayClassName="meh_alishaoverlay"
        isOpen={alishaModalIsOpen}
        onRequestClose={closeAlishaModal}
        // Rest of your modal configuration...
      >
        <div className="meh_modal-content">
          <h3 className="meh_modal-heading">Participants waiting to join {value.name}</h3>
          <table>
            <thead>
            <tr  className='me_space' >
          
                <th  >Participant Name</th>
                <th  >Receipts</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            <tr className='mr_tr' >
                <td>{value.name}</td>
                <td style={{color:"red", textDecoration:"underline"}}>receipt1.png</td>
                <td>
                <span className="meh_action-icon">&#10005;</span>
                  <span className="meh_action-icon1">&#10003;</span>

                </td>
              </tr>
              <tr className='mr_tr' >
                <td>{value.name}</td>
                <td style={{color:"red", textDecoration:"underline"}}>receiptali.png</td>
                <td>
                  <span className="meh_action-icon">&#10005;</span>
                  <span className="meh_action-icon1">&#10003;</span>
                </td>
              </tr>
              {/* Add more participants rows as needed */}
            </tbody>
          </table>
        </div>
        <button className='lm_btn'>Approve all</button>
      </Modal>
  <td className="empty">
    <button className={type === "Paid" ? "paid" : "free"}>
      {type}
    </button>
  </td>
            <td className='empty'>
              <button
                className={value.isActive ? 'status-active' : 'status-inactive'}
                onClick={() => {
                  value.isActive
                    ? startLuckyDraw(value.code)
                    : alert("Lucky Draw already Drawn")
                }}
              >
                {value.isActive ? 'Start Now' : 'Completed'}
              </button>
            </td>
            <td className='leadparent'>
              <p className='leadbord' onClick={() => openLeaderboardModal(value.users, value.winner)}>
                <span><CiShare1 /></span> <span>Participants</span>
              </p>
              <AiOutlineDelete size={25} className='delete' onClick={() => deleteDocument(value.docId)} Delete />
            </td>
          </tr>
        );
      }
    })}
  </tbody>
</table>



      </div>
    </div>
  </>
  );
}

export default AdminDashboard;