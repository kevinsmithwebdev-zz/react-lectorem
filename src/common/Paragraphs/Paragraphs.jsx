import React from 'react';
import Paragraph from './Paragraph/Paragraph';

// TODO: add guids to data so don't have to use idx as key

const Paragraphs = ({
  paragraphs, readTime, showModal, configuration,
}) => {
  if (!paragraphs) {
    return null;
  }

  return paragraphs.map((paragraph, idx) => (
    <Paragraph
      configuration={ configuration }
      paragraph={ paragraph }
      key={ idx.toString() }
      idx={ idx }
      readTime={ readTime }
      showModal={ showModal }
    />
  ));
};

export default Paragraphs;
