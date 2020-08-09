import React, { useState } from 'react';
import Player from './Player/Player';
import './Lectorem.css';
import Modal from './Modal/Modal';
import Texts from './Texts/Texts';

export const createShowModal = setModalData =>
  lect => (lect.translation || lect.explanation) && setModalData(lect);

export const createHideModal = setModalData => () => setModalData(null);

const Lectorem = ({ data, configuration }) => {
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
    <div className='Lectorem'>
      { !!title && <h2>{title} </h2> }
      { !!subtitle && <h3>{subtitle} </h3> }
      <div className='playerContainer'>
        <Player audioPath={ audioPath } onListen={ setReadTime } />
      </div>
      <div className='lectsContainer'>
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
