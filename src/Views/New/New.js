import React, { useRef } from 'react';
import soundEffect from '../../Audios/soundEffect.mp3';

const BackgroundSoundComponent = () => {
  const audioRef = useRef(null);

  const handlePlaySound = () => {
    audioRef.current.play();
  };

  return (
    <div>
      <button onClick={handlePlaySound}>Play Sound</button>

      <audio ref={audioRef} loop autoPlay>
        <source src={soundEffect} type="audio/mp3" />
      </audio>

    </div>
  );
};

export default BackgroundSoundComponent;