import React from 'react';
import Lect from '../Lect/Lect';
import { getFrontSpacer } from '../../utils/punctuation';

import './Sentence.css';

export const TIME_CODE_FUDGE = 0.1;

export const getShouldHighlight = (lect, readTime) =>
  lect.start - TIME_CODE_FUDGE <= readTime &&
  readTime <= lect.end + TIME_CODE_FUDGE;

const aggregateSentence = sentence =>
  sentence.lects.reduce((acc, { text: cur }, i) => `${acc}${getFrontSpacer(cur[0])}${cur}`, '');

export const renderLect = ({
  lect, idx, readTime, showModal, isLast, sentenceTranslation, originalSentence,
}) => {
  const shouldHighlight = getShouldHighlight(lect, readTime);
  const key = idx;
  return (
    <Lect
      lect={ lect }
      isFirst={ idx === 0 }
      isLast={ isLast }
      shouldHighlight={ shouldHighlight }
      key={ key }
      readTime={ readTime }
      showModal={ showModal }
      sentenceTranslation={ sentenceTranslation }
      originalSentence={ originalSentence }
    />
  );
};

const Sentence = ({
  sentence, readTime, showModal, configuration: { shouldShowTranslation, isTranslationBelow },
}) => {
  const translationDirectionClassName = isTranslationBelow ? 'SentenceColumn' : 'SentenceRow';

  const containerWrapperClassName = [
    'Sentence',
    shouldShowTranslation ? translationDirectionClassName : '',
  ].join(' ');

  const originalSentence = aggregateSentence(sentence);

  return (
    <span className={ containerWrapperClassName }>
      <span className='SentenceLectsWrapper'>
        {
          sentence.lects.map(
            (lect, idx) => renderLect({
              lect,
              idx,
              readTime,
              showModal,
              isLast: idx === sentence.lects.length - 1,
              sentenceTranslation: sentence.sentenceTranslation,
              originalSentence,
            }),
          )
        }
      </span>
    </span>
  );
};

export default Sentence;
