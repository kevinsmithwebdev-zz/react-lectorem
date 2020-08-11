import React from 'react';
import TextBlock from './TextBlock/TextBlock';
import './Texts.css';
import TranslationBlock from './TranslationBlock/TranslationBlock';
import { ParagraphInterface, ConfigurationInterface } from '../interfaces/index';

export interface TextsInterface {
  paragraphs: ParagraphInterface[],
  readTime: number,
  showModal: Function,
  configuration: ConfigurationInterface,
}

export const spreadParagraphsIntoSentenceBlocks = (paragraphs: ParagraphInterface[]) => {
  const newBlocks: ParagraphInterface[] = [];
  paragraphs.forEach(paragraph => {
    paragraph.sentences.forEach((sentence, idx) => {
      const newBlock: ParagraphInterface = { sentences: [sentence] };
      if (idx === 0 && paragraph.header) {
        newBlock.header = paragraph.header;
      }
      newBlocks.push(newBlock);
    });
  });

  return newBlocks;
};

export const getClassName = (isTranslationBelow: boolean, idx: number) =>
  [
    'block',
    isTranslationBelow ? 'below' : 'beside',
    idx % 2 ? '' : 'even',
  ].join(' ');

const Texts: React.FC<TextsInterface> = ({
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
            <div key={ idx.toString() }>
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
