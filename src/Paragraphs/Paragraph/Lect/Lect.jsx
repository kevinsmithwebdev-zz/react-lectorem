import React from 'react';
import './Lect.css';

export const ENDING_PUNCTUATION = ['.', '!', '?'];
export const getSpacer = text => (ENDING_PUNCTUATION.includes(text?.slice(-1)) ? '  ' : ' ');
export const getHasModalInformation = lect => !!lect.explanation || !!lect.translation;
export const getClassName = (shouldHighlight, hasModalInformation) => [
  'Lect',
  shouldHighlight ? 'highlighted' : 'unHighlighted',
  hasModalInformation ? 'clickable' : '',
].join(' ');

const Lect = ({ lect, shouldHighlight, showModal }) => {
  if (!lect) {
    return null;
  }

  const hasModalInformation = getHasModalInformation(lect);
  const className = getClassName(shouldHighlight, hasModalInformation);
  const spacer = getSpacer(lect.text);

  const handleClick = hasModalInformation && /* istanbul ignore next */ (() => showModal(lect));

  return (
    <span
      className={ className }
      onClick={ handleClick }
      aria-hidden='true'
    >
      { `${lect.text}${spacer}` }
    </span>
  );
};

export default Lect;
