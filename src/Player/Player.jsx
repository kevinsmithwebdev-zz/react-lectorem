import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './Player.css';

const LISTEN_INTERVAL_IN_MS = 10;

const Player = ({ onListen, audioPath }) => (
  <div className='Player'>
    <ReactAudioPlayer
      listenInterval={ LISTEN_INTERVAL_IN_MS }
      onListen={ onListen }
      src={ audioPath }
      controlsList='nodownload'
      controls
    />
  </div>
);

export default Player;
