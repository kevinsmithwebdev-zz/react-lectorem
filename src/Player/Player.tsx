import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import './Player.css';

const LISTEN_INTERVAL_IN_MS = 10;

interface PlayerInterface {
  audioPath: string,
  onListen: Function,
}

const Player: React.FC<PlayerInterface> = ({ onListen, audioPath }): JSX.Element => (
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
