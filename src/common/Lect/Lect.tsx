import React from 'react';
import './Lect.css';
import { getFrontSpacer } from '../../utils/punctuation';
import { LectInterface } from '../../interfaces/index';

interface LectComponentInterface {
  lect: LectInterface,
  shouldHighlight: boolean,
  showModal: Function,
  isLast: boolean,
  isFirst: boolean,
  sentenceTranslation: string,
  originalSentence: string,
}

export const getHasModalInformation = (lect: LectInterface): boolean => !!lect.explanation || !!lect.translation;

export const getClassName = (shouldHighlight: boolean, hasModalInformation: boolean): string =>
  [
    'Lect',
    shouldHighlight ? 'highlighted' : 'unHighlighted',
    hasModalInformation ? 'clickable' : '',
  ].join(' ');

const Lect: React.FC<LectComponentInterface> = ({
  lect, shouldHighlight, showModal, isLast, isFirst, sentenceTranslation, originalSentence,
}) => {
  const hasModalInformation = getHasModalInformation(lect);
  const className = getClassName(shouldHighlight, hasModalInformation);
  const frontSpacer = getFrontSpacer(lect.text[0], isFirst);

  const handleClick = hasModalInformation
    ? /* istanbul ignore next */ () => showModal({ ...lect, sentenceTranslation, originalSentence })
    : /* istanbul ignore next */ () => {};

  return (
    <span className={ className } onClick={ handleClick } aria-hidden='true'>
      {`${frontSpacer}${lect.text}${isLast ? '  ' : ''}`}
    </span>
  );
};

export default Lect;
