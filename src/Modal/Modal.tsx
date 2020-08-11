import React from 'react';
import './Modal.css';
import { LectInterface } from '../interfaces/index';

interface ThisData extends LectInterface {
  originalSentence: string,
  sentenceTranslation: string,
}

interface ModalInterface {
  data: ThisData,
  hideModal: any,
}

export const renderLine = (label: string, thisData: string): JSX.Element =>
  !!thisData && (
    <div className='line'>
      <span className='label'>{`${label}: `}</span>
      <span className='data'>{thisData}</span>
    </div>
  );

const Modal: React.FC<ModalInterface> = ({ data, hideModal }) => {
  if (!data) {
    return null;
  }
  return (
    <div className='Modal'>
      <div className='header'>
        <h3>Helpful Hint</h3>
        <button className='toggle-button' onClick={ hideModal } type='button'>
          <span role='img' aria-label='close'>
            &#x274c;
          </span>
        </button>
      </div>

      {renderLine('Text', data.text)}
      {renderLine('Translation', data.translation)}
      {renderLine('Full Text', data.originalSentence)}
      {renderLine('Full Translation', data.sentenceTranslation)}
      {renderLine('Explanation', data.explanation)}
    </div>
  );
};

export default Modal;
