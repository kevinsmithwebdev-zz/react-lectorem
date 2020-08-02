import React from 'react';
import TextBlock from './TextBlock/TextBlock';
import './Texts.css';
import TranslationBlock from './TranslationBlock/TranslationBlock';

const spreadParagraphsIntoSentenceBlocks = paragraphs => {
  const newBlocks = [];
  paragraphs.forEach(paragraph => {
    paragraph.sentences.forEach((sentence, idx) => {
      const newBlock = { sentences: [sentence] };
      if (idx === 0 && paragraph.header) {
        newBlock.header = paragraph.header;
      }
      newBlocks.push(newBlock);
    });
  });

  return newBlocks;
};

export const getClassName = (isTranslationBelow, idx) =>
  [
    'block',
    isTranslationBelow ? 'below' : 'beside',
    idx % 2 ? '' : 'even',
  ].join(' ');

const Texts = ({
  paragraphs, readTime, showModal, configuration,
}) => {
  if (!paragraphs) {
    return null;
  }

  const blocks = configuration.isBySentence
    ? spreadParagraphsIntoSentenceBlocks(paragraphs)
    : paragraphs;

  return (
    <div className='Texts'>
      {
        blocks.map((block, idx) => {
          const blockClassName = getClassName(configuration.isTranslationBelow, idx);
          return (
            <div key>
              <div className='header'>
                {
                  !!block.header?.imagePath && (
                    <div>
                      <img src={ block.header?.imagePath } alt={ `header ${idx}` } width='150px' />
                    </div>
                  )
                }
              </div>
              <div className={ blockClassName } key={ idx.toString() }>
                <TextBlock
                  configuration={ configuration }
                  block={ block }
                  idx={ idx }
                  readTime={ readTime }
                  showModal={ showModal }
                />
                <TranslationBlock
                  configuration={ configuration }
                  block={ block }
                />
              </div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Texts;
