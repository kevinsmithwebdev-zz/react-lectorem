import React from 'react';
import Lect from '../Lect/Lect';
import { getFrontSpacer } from '../../utils/punctuation';
import classes from './Sentence.module.css';
import { LectInterface, SentenceInterface, ConfigurationInterface } from '../../interfaces/index';

export const TIME_CODE_FUDGE = 0.1;

interface RenderLectInterface {
  idx: number,
  readTime: number | null,
  lect: LectInterface,
  showModal: Function,
  isLast: boolean,
  sentenceTranslation: string | undefined,
  originalSentence: string,
}

interface SentenceComponentInterface {
  sentence: SentenceInterface,
  readTime: number | null,
  showModal: Function,
  configuration: ConfigurationInterface,
}

export const getShouldHighlight = (lect: LectInterface, readTime: number | null): boolean => {
  if (!readTime) return false; // FIXME: fix
  if (!lect) return false;
  if (!lect.start) return false;
  if (!lect.end) return false;
  return lect.start - TIME_CODE_FUDGE <= readTime && readTime <= lect.end + TIME_CODE_FUDGE;
}

export const aggregateSentence = (sentence: SentenceInterface): string =>
  sentence.lects.reduce((acc, { text: cur }, i) => `${acc}${getFrontSpacer(cur[0])}${cur}`, '');

export const renderLect = ({
  lect, idx, readTime, showModal, isLast, sentenceTranslation, originalSentence,
}: RenderLectInterface) => {
  const shouldHighlight = getShouldHighlight(lect, readTime);
  const key = idx;
  return (
    <Lect
      data-cy='lect'
      lect={ lect }
      isFirst={ idx === 0 }
      isLast={ isLast }
      shouldHighlight={ shouldHighlight }
      key={ key }
      showModal={ showModal }
      sentenceTranslation={ sentenceTranslation }
      originalSentence={ originalSentence }
    />
  );
};

const Sentence: React.FC<SentenceComponentInterface> = ({
  sentence, readTime, showModal, configuration: { isTranslationShown, isTranslationBelow },
}) => {
  const translationDirectionClassName = isTranslationBelow ? classes.SentenceColumn : classes.SentenceRow;

  const containerWrapperClassName = [
    classes.Sentence,
    isTranslationShown ? translationDirectionClassName : '',
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
              }
            )
          )
        }
      </span>
    </span>
  );
};

export default Sentence;
