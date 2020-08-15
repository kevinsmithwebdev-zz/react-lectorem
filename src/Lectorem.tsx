import React, { useState } from 'react';
import Player from './Player/Player';
import classes from './Lectorem.module.css';
import Modal from './Modal/Modal';
import Texts from './Texts/Texts';
import { StoryDataInterface, ConfigurationInterface, LectInterface } from './interfaces/index';

interface ComponentPropsInterface {
  data: StoryDataInterface,
  configuration?: ConfigurationInterface,
}

export const createShowModal =
  (setModalData: Function): Function =>
    (lect: LectInterface): void => (lect.translation || lect.explanation) && setModalData(lect);

export const createHideModal =
  (setModalData: Function): Function =>
    (): void => setModalData(null);

const Lectorem: React.FC<ComponentPropsInterface> = ({ data, configuration }) => {
  const [modalData, setModalData] = useState(null);
  const [readTime, setReadTime] = useState(null);

  if (!data) {
    return <p>Loading...</p>;
  }

  const showModal = createShowModal(setModalData);
  const hideModal = createHideModal(setModalData);

  const {
    title, subtitle, audioPath, paragraphs,
  } = data;

  return (
    <div className={ classes.Lectorem }>
      { !!title && <h2>{title} </h2> }
      { !!subtitle && <h3>{subtitle} </h3> }
      <div className={ classes.playerContainer }>
        <Player audioPath={ audioPath } onListen={ setReadTime } />
      </div>
      <div className={ classes.lectsContainer }>
        <Texts
          configuration={ configuration }
          paragraphs={ paragraphs }
          readTime={ readTime }
          showModal={ showModal }
        />
      </div>

      <Modal data={ modalData } hideModal={ hideModal } />
    </div>
  );
}

export default Lectorem;
