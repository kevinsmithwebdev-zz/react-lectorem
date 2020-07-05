import React from "react";
import ReactAudioPlayer from 'react-audio-player';
import './Player.css';

const LISTEN_INTERVAL_IN_MS = 10;

const Player = props => {
  return (
    <div className='Player'>
      <h2>Player</h2>
      <ReactAudioPlayer
        listenInterval={ LISTEN_INTERVAL_IN_MS }
        onListen={ props.onListen }
        src={ props.audioPath }
        controlsList='nodownload'
        controls
      />
    </div>
  );
}

export default Player;
