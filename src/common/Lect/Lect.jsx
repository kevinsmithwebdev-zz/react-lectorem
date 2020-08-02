import React from 'react';
import './Lect.css';
import { getFrontSpacer } from '../../utils/punctuation';

export const getHasModalInformation = lect => !!lect.explanation || !!lect.translation;

export const getClassName = (shouldHighlight, hasModalInformation) =>
  [
    'Lect',
    shouldHighlight ? 'highlighted' : 'unHighlighted',
    hasModalInformation ? 'clickable' : '',
  ].join(' ');

const Lect = ({
  lect, shouldHighlight, showModal, isLast, isFirst, sentenceTranslation, originalSentence,
}) => {
  if (!lect) {
    return null;
  }
  const hasModalInformation = getHasModalInformation(lect);
  const className = getClassName(shouldHighlight, hasModalInformation);
  const frontSpacer = getFrontSpacer(lect.text[0], isFirst);

  const handleClick = hasModalInformation
    ? () => showModal({ ...lect, sentenceTranslation, originalSentence })
    : () => {};

  return (
    <span className={ className } onClick={ handleClick } aria-hidden='true'>
      {`${frontSpacer}${lect.text}${isLast ? '  ' : ''}`}
    </span>
  );
};

export default Lect;
