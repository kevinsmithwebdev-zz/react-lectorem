import React from 'react';
import './TranslationBlock.css';

const aggregateSentences = sentences => sentences.map(s => s.sentenceTranslation).join('  ');

export const getClassName = isTranslationBelow => ['TranslationBlock', isTranslationBelow ? 'below' : 'beside'].join(' ');

const TranslationBlock = (
  { block: { sentences }, configuration: { shouldShowTranslation, isTranslationBelow } },
) => {
  if (!shouldShowTranslation) {
    return null;
  }

  const className = getClassName(isTranslationBelow);
  return (
    <div className={ className }>
      { aggregateSentences(sentences) }
    </div>
  );
};

export default TranslationBlock;
