import React from 'react';
import './BackgroundVideo.css';
import Video from '../../assets/covidLoop.mp4';

const BackgroundVideo = () => {
  return (
    <div className='video-container'>
      <video autoPlay loop muted className='bg-video' id='video' src={Video} />
    </div>
  );
};

export default BackgroundVideo;
