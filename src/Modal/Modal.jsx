import React from 'react';
import './Modal.css';

export const renderLine = (label, thisData) =>
  !!thisData && (
    <div className='line'>
      <span className='label'>{`${label}: `}</span>
      <span className='data'>{thisData}</span>
    </div>
  );

const Modal = ({ data, hideModal }) => {
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
