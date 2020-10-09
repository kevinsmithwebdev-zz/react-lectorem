import React from 'react';
import TextBlock from './TextBlock/TextBlock';
import classes from './Texts.module.css';
import TranslationBlock from './TranslationBlock/TranslationBlock';
import { ParagraphInterface, ConfigurationInterface } from '../interfaces/index';

export interface TextsInterface {
  paragraphs: ParagraphInterface[],
  readTime: number | null,
  showModal: Function,
  configuration: ConfigurationInterface | undefined,
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
    classes.block,
    isTranslationBelow ? classes.below : classes.beside,
    idx % 2 ? '' : classes.even,
  ].join(' ');

const Texts: React.FC<TextsInterface> = ({
  paragraphs, readTime, showModal, configuration = { isBySentence: false, isTranslationBelow: false, isTranslationShown: false },
}) => {
  if (!paragraphs) {
    return null;
  }

  const blocks = configuration.isBySentence
    ? spreadParagraphsIntoSentenceBlocks(paragraphs)
    : paragraphs;

  return (
    <div className={ classes.Texts }>
      {
        blocks.map((block, idx) => {
          const blockClassName = getClassName(!!configuration.isTranslationBelow, idx);
          return (
            <div key={ idx.toString() }>
              <div className={ classes.header }>
                {
                  !!block.header?.imagePath && (
                    <div className={ classes.image }>
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
