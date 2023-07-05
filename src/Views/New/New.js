// import './New.css'


// import React, { useState } from 'react';
// import Modal from 'react-modal';
// import { BsFacebook } from 'react-icons/bs';
// import { IoLogoWhatsapp } from 'react-icons/io';
// import { AiFillTwitterCircle, AiFillInstagram } from 'react-icons/ai';
// import { BsTelegram } from 'react-icons/bs';




// Modal.setAppElement('#root'); // Set the app root element for accessibility


// function New() {
//   const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
//   const [codeCopied, setCodeCopied] = useState(false);

//   const openShareModal = () => {
//     setShareModalIsOpen(true);
//   };

//   const closeShareModal = () => {
//     setShareModalIsOpen(false);
//   };

//   const handleFirstCopy = () => {
//     const code = '12345';
//     navigator.clipboard.writeText(code);
//     setCodeCopied(true);
//     setTimeout(() => {
//       setCodeCopied(false);
//     }, 3000);
//   };

//   const handleSecondCopy = () => {
//     const linkInput = document.getElementById('link-input');
//     linkInput.select();
//     document.execCommand('copy');
//     setCodeCopied(true);
//     setTimeout(() => {
//       setCodeCopied(false);
//     }, 3000);
//   };

//   return (
//     <div className="mainclass">
//       <button onClick={openShareModal} className='i-button' >Lucky Draw</button>

//       <Modal
//         isOpen={shareModalIsOpen}
//         onRequestClose={closeShareModal}
//         className="modal"
//         overlayClassName="overlay"
//         closeTimeoutMS={200}
//       >
//         <div className="modal-header">
//           <h3 className='mainheada'>Share Code</h3>
//           <button className="close-button " onClick={closeShareModal}>
//             &times;
//           </button>
//         </div>

//         <div className="modal-content">
//           <div className="box-input">
//             <p className='uniquebox'> 12345</p>
//             <button onClick={handleFirstCopy} className='i-button' >{codeCopied ? 'Copied' : 'Copy'}</button>
//           </div>

//           <div className="content">
//             <p>Share this link via</p>
//             <ul className="icons" style={{ display: "flex", flexDirection: "row" }}>
//               <a href="#" >
//                 <BsFacebook />
//               </a>
//               <a href="#">
//                 <IoLogoWhatsapp />
//               </a>
//               <a href="#">
//                 <AiFillTwitterCircle />
//               </a>
//               <a href="#">
//                 <AiFillInstagram />
//               </a>
//               <a href="#">
//                 <BsTelegram />
//               </a>
//             </ul>

//             <p>Or copy link</p>
//             <div className="field">

//               <input id="link-input" type="text" readOnly value="example.com/share-link" />
//               <button onClick={handleSecondCopy} className='i-button'>{codeCopied ? 'Copied' : 'Copy'}</button>
//             </div>
//           </div>
//         </div>
//       </Modal>
//     </div>
//   );
// }

// export default New;










// useEffect(() => {
//   const luckyDrawId = 'luckydraw01'; // Replace with the actual lucky draw ID
//   const luckyDrawRef = firebase.firestore().collection('luckydraws').doc(luckyDrawId);

//   const unsubscribe = luckyDrawRef.onSnapshot((snapshot) => {
//     const luckyDrawData = snapshot.data();

//     // Check if the lucky draw has started
//     if (luckyDrawData && luckyDrawData.isStarted) {
//       const participantsData = luckyDrawData.participants || [];

//       setParticipants(participantsData);
//       setIsScrolling(true);

//       const interval = setInterval(() => {
//         setCurrentIndex((prevIndex) => (prevIndex + 1) % participantsData.length);
//       }, 0); // Adjust the interval duration as desired

//       setTimeout(() => {
//         clearInterval(interval);

//         // Select the winner
//         const randomIndex = Math.floor(Math.random() * participantsData.length);
//         setWinner(participantsData[randomIndex].name);

//         // Remove the winner's name from the array
//         participantsData.splice(randomIndex, 1);

//         setIsScrolling(false);
//         setIsExploding(true);
//         setCongratulations(true);
//       }, 5000); // 5000 milliseconds (5 seconds)
//     }
//   });

//   return () => {
//     unsubscribe(); // Cleanup the listener when component unmounts
//   };
// }, []);





