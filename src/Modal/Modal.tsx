import React from 'react';
import './Modal.css';
import { LectInterface } from '../interfaces/index';

interface ModalData extends LectInterface {
  originalSentence: string,
  sentenceTranslation?: string,
}

export interface ModalInterface {
  data: ModalData,
  hideModal: Function,
}

export const renderLine = (label: string, thisData: string): JSX.Element =>
  !!thisData && !!label && (
    <div className='line'>
      <span className='label'>{`${label}: `}</span>
      <span className='data'>{thisData}</span>
    </div>
  );

const Modal: React.FC<ModalInterface> = ({ data, hideModal }) => {
  if (!data) {
    return null;
  }

  const handleClick = /* istanbul ignore next */  (_e: React.MouseEvent) => hideModal();

  return (
    <div className='Modal'>
      <div className='header'>
        <h3>Helpful Hint</h3>
        <button className='toggle-button' onClick={ handleClick } type='button'>
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
