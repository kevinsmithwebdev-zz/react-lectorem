import React from 'react';
import classes from './Modal.module.css';
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
    <div className={ classes.Modal }>
      <div className={ classes.header }>
        <h3>Helpful Hint</h3>
        <button data-testid='modal-close-button' className={ classes['toggle-button'] } onClick={ handleClick } type='button' aria-label='button'>
          <span role='img'>
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
