import React from 'react';
import Sentence from '../../common/Sentence/Sentence';
import classes from './TextBlock.module.css';
import { SentenceInterface, ConfigurationInterface } from '../../interfaces/index';

interface TextBlockInterface {
  block: {
    sentences: SentenceInterface[],
  }
  configuration: ConfigurationInterface,
  idx: number,
  readTime: number | null,
  showModal: Function,
}

const TextBlock: React.FC<TextBlockInterface> = ({
  block: { sentences },
  configuration,
  idx,
  readTime,
  showModal,
}) => (
  <div className={ classes.TextBlock } key={ idx }>
    {
      sentences?.map(
        /* istanbul ignore next */ (sentence, idx2) => (
          <Sentence
            configuration={ configuration }
            sentence={ sentence }
            key={ idx2.toString() }
            readTime={ readTime }
            showModal={ showModal }
          />
        )
      )
    }
  </div>
);

export default TextBlock;
