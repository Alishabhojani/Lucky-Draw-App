import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { AiOutlineUpload } from 'react-icons/ai';
import { FaCheck } from 'react-icons/fa';
import { BsClock } from "react-icons/bs";

import './recipt.css';
import line from '../../Images/line.png';

function Recipt() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  console.log("uploadSuccess>>>", uploadSuccess)
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showWaitSection, setShowWaitSection] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleGalleryOption = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.capture = 'gallery';

    inputElement.onchange = (event) => handleImageUpload(event);

    inputElement.click();
  };

  const handleCameraOption = () => {
    const inputElement = document.createElement('input');
    inputElement.type = 'file';
    inputElement.accept = 'image/*';
    inputElement.capture = 'camera';

    inputElement.onchange = (event) => handleImageUpload(event);

    inputElement.click();
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      setUploadedImage(URL.createObjectURL(file));

      // Perform the image upload logic here

    //   setUploadSuccess(true);
    
      closeModal();
    }
  };

  const openUploadModal = () => {
    setIsUploadModalOpen(true);
  };

//   useEffect(() => {
//     if (isUploadModalOpen) {
//       setUploadedImage(null);
//       setUploadSuccess(false);
//     }
//   }, [isUploadModalOpen]);

  useEffect(() => {
    if (uploadSuccess) {
      const timer = setTimeout(() => {
        setIsUploadModalOpen(false);
        setShowWaitSection(true);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [uploadSuccess]);

  return (
    <>
      <div className="container-2 zz-container2">
        <div className="zzz_image-section-2"></div>
        <div className="zz_content-section-2">
          <div className="zzzcontent-content-1">
            {showWaitSection ? (
              <div className="waiting-section">
                <BsClock style={{color:"white", height:"100px", width:"250px"}}/>
                <h1 style={{color:"white", textAlign:"center"}}>Waiting</h1>
                <p style={{color:"white", textAlign:"center"}}>Please Wait for the admin approval to allow<br></br> your participating request in the<br></br> Lucky Draw</p>
              </div>
            ) : (
              <>
                <h1 className="zzz_login">Upload Receipt</h1>
                <p className="zzz_login">
                  Please upload the receipt to allow you to participate in the lucky draw.
                </p>

                {uploadedImage ? (
                  <div className="uploaded-image-container">
                    <img src={uploadedImage} alt="Uploaded" className="uploaded-image-preview"  />
                  </div>
                ) : (
                  <div className="receipt-box"  onClick={openModal} >
                    <AiOutlineUpload className="zzz_logo" />
                    <p className="receipt-text">Tap to Upload</p>
                  </div>
                )}

                {!isUploaded && (
                  <button
                    type="submit"
                    className="zzbutton-admin"
                    onClick={() => {
                        openUploadModal()
                        setUploadSuccess(true);
                    }}
                    disabled={!uploadedImage}
                  >
                    Upload Receipt
                  </button>
                )}
              </>
            )}
          </div>

          <div className="">
            <p className="zzz_invision">Powered by Invision Solutions</p>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isUploadModalOpen}
        onRequestClose={() => setIsUploadModalOpen(false)}
        className="zz-your-modal-class"
        overlayClassName="your-modal-overlay-class"
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <button className="close-button" onClick={() => setIsUploadModalOpen(false)}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <FaCheck style={{ color: 'green', height: '50px', width: '50px' }} />
          <p className="modal-success-message">Uploaded successfully!</p>
        </div>
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="your-modal-class"
        overlayClassName="your-modal-overlay-class"
        closeTimeoutMS={200}
      >
        <div className="modal-header">
          <h3>Choose an Option</h3>
          <button className="close-button" onClick={closeModal}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <button className="modal-option" onClick={handleGalleryOption}>
            Gallery
          </button>
          <button className="modal-option" onClick={handleCameraOption}>
            Camera
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Recipt;