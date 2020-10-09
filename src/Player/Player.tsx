import React from 'react';
import ReactAudioPlayer from 'react-audio-player';
import classes from './Player.module.css';

const LISTEN_INTERVAL_IN_MS = 10;

interface PlayerInterface {
  audioPath: string,
  onListen: any, // FIXME:
}

const Player: React.FC<PlayerInterface> = ({ onListen, audioPath }): JSX.Element => (
  <div className={ classes.Player }>
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
