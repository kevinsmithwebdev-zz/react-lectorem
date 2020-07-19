import React from 'react';
import Lect from './Lect/Lect';

export const TIME_CODE_FUDGE = 0.1;

export const getShouldHighlight = (lect, readTime) =>
  lect.start - TIME_CODE_FUDGE <= readTime &&
  readTime <= lect.end + TIME_CODE_FUDGE;

export const renderLect = (lect, idx, readTime, showModal) => {
  const shouldHighlight = getShouldHighlight(lect, readTime);
  const key = idx;
  return (
    <Lect
      lect={lect}
      shouldHighlight={shouldHighlight}
      key={key}
      readTime={readTime}
      showModal={showModal}
    />
  );
};

const Paragraph = ({
  paragraph: { header, lects } = {},
  idx,
  readTime,
  showModal,
}) => (
  <div className="paragraph" key={idx}>
    <div className="Lectorem-paragraph-header">
      {!!header?.imagePath && (
        <div>
          <img src={header?.imagePath} alt="Logo" width="150px" />
        </div>
      )}
      {header?.lects?.map(
        /* istanbul ignore next */ (lect, idx2) =>
          renderLect(lect, idx2, readTime, showModal)
      )}
    </div>
    <div>
      {lects?.map(
        /* istanbul ignore next */ (lect, idx2) =>
          renderLect(lect, idx2, readTime, showModal)
      )}
    </div>
  </div>
);

export default Paragraph;
