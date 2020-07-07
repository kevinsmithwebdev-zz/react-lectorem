import React, { Component } from 'react';
import Lect from './Lect/Lect';
import Player from './Player/Player';
import './Lectorem.css';

const TIME_CODE_FUDGE = 0.1;

const getShouldHighlight = (lect, readTime) => (lect.start - TIME_CODE_FUDGE) <= readTime && readTime <= (lect.end + TIME_CODE_FUDGE);


const renderLect = (lect, idx, readTime) => {
  const shouldHighlight = getShouldHighlight(lect, readTime);
  const key = idx;
  return <Lect lect={ lect } shouldHighlight={ shouldHighlight } key={ key } readTime={ readTime } />
};

const renderParagraph = ({ header, lects }, idx, readTime) => (
  <div className='paragraph' key={ idx }>
    <div className='Lectorem-paragraph-header'>
      { !!header.imagePath &&
        <div>
          <img src={header.imagePath} alt='Logo' width='150px' />
        </div>
      }
      { header.lects.map((lect, idx2) => renderLect(lect, idx2, readTime)) }
    </div>
    <div>
      { lects.map((lect, idx2) => renderLect(lect, idx2, readTime)) }
    </div>
  </div>
);

const renderParagraphs = (paragraphs, readTime) =>
  paragraphs.map((paragraph, idx) => renderParagraph(paragraph, idx, readTime));


  // TODO: issues with packages using hooks
class Lectorem extends Component {
  // const [readTime, setReadTime] = useState(0);
  state = { readTime: 0 }

  setReadTime = readTime => this.setState({ readTime });

  render() {
    const { data } = this.props;

    if (!data) {
      return <p>Loading...</p>;
    }

    const { title, subtitle, audioPath } = data;
    return (
      <div className='Lectorem'>
        { !!title && <h2>{ title } </h2> }
        { !!subtitle && <h3>{ subtitle } </h3> }
        <div className='playerContainer'>
          <Player
            audioPath={ audioPath }
            onListen={ this.setReadTime }
          />
        </div>
        <div className='lectsContainer'>
          { renderParagraphs(data.paragraphs, this.state.readTime) }
        </div>
      </div>
    );
  }
}

export default Lectorem;
