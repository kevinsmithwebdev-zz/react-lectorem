import React from 'react';
import './Lect.css';

export const ENDING_PUNCTUATION = ['.', '!', '?'];
export const getSpacer = text => (ENDING_PUNCTUATION.includes(text.slice(-1)) ? '  ' : ' ');

const Lect = ({ lect, shouldHighlight, showModal }) => {
  if (!lect) {
    return null;
  }

  const className = [
    'Lect',
    shouldHighlight ? 'highlighted' : 'unHighlighted',
  ].join(' ');

  const spacer = getSpacer(lect.text);

  return (
    <span
      className={ className }
      onClick={ /* istanbul ignore next */ () => showModal(lect) }
      aria-hidden='true'
    >
      { `${lect.text}${spacer}` }
    </span>
  );
};

export default Lect;
