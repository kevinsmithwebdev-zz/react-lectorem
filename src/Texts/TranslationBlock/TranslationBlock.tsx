import React from 'react';
import classes from './TranslationBlock.module.css';
import { SentenceInterface, ConfigurationInterface } from '../../interfaces/index';

interface TranslationBlockInterface {
  block: {
    sentences: SentenceInterface[],
  },
  configuration: ConfigurationInterface,
}

export const aggregateTranslations = (sentences: SentenceInterface[]): string => sentences.map(s => s.sentenceTranslation).join('  ');

export const getClassName = (isTranslationBelow: boolean): string => [classes.TranslationBlock, isTranslationBelow ? classes.below : classes.beside].join(' ');

const TranslationBlock: React.FC<TranslationBlockInterface> = (
  { block: { sentences }, configuration: { isTranslationShown, isTranslationBelow } }
) => {
  if (!isTranslationShown) {
    return null;
  }

  const className = getClassName(isTranslationBelow);
  return (
    <div className={ className }>
      { aggregateTranslations(sentences) }
    </div>
  );
};

export default TranslationBlock;
