import React from 'react';
import './Lect.css';

const endingPunctuation = ['.', '!', '?'];

const Lect = ({ lect: { text }, shouldHighlight, readTime }) => {
  const className = [
    'Lect',
    shouldHighlight ? 'highlighted' : 'unHighlighted',
  ].join(' ');
  const lastChar = text.slice(-1);
  const isEndingInPunctuation = endingPunctuation.includes(lastChar);
  const spacer = isEndingInPunctuation ? '  ' : ' ';
  return (
    <span className={ className } >
      { `${text}${spacer}` }
    </span>
  );
};

export default Lect;
