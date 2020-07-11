import React, { Component } from 'react';
import Lect from './Lect/Lect';
import Player from './Player/Player';
import './Lectorem.css';
import Modal from './Modal/Modal';

const TIME_CODE_FUDGE = 0.1;

const getShouldHighlight = (lect, readTime) => (
  (lect.start - TIME_CODE_FUDGE) <= readTime && readTime <= (lect.end + TIME_CODE_FUDGE)
);

const renderLect = (lect, idx, readTime, showModal) => {
  const shouldHighlight = getShouldHighlight(lect, readTime);
  const key = idx;
  return (
    <Lect
      lect={ lect }
      shouldHighlight={ shouldHighlight }
      key={ key }
      readTime={ readTime }
      showModal={ showModal }
    />
  );
};

const renderParagraph = ({ header, lects }, idx, readTime, showModal) => (
  <div className='paragraph' key={ idx }>
    <div className='Lectorem-paragraph-header'>
      { !!header.imagePath && (
        <div>
          <img src={ header.imagePath } alt='Logo' width='150px' />
        </div>
      )}
      { header.lects.map((lect, idx2) => renderLect(lect, idx2, readTime, showModal)) }
    </div>
    <div>
      { lects.map((lect, idx2) => renderLect(lect, idx2, readTime, showModal)) }
    </div>
  </div>
);

const renderParagraphs = (paragraphs, readTime, showModal) => (
  paragraphs.map((paragraph, idx) => renderParagraph(paragraph, idx, readTime, showModal))
);

// TODO: issues with packages using hooks
class Lectorem extends Component {
  // const [readTime, setReadTime] = useState(0);
  state = {
    modalData: null,
    readTime: 0,
  }

  componentDidMount = () => {
    setInterval(
      () => {
        this.setState(previousState => ({ shouldShowModal: !previousState.shouldShowModal }));
      },
      3000,
    );
  }

  showModal = lect => (lect.translation || lect.explanation) && this.setState({ modalData: lect });

  hideModal = () => this.setState({ modalData: null });

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
          { renderParagraphs(data.paragraphs, this.state.readTime, this.showModal) }
        </div>

        <Modal
          data={ this.state.modalData }
          hideModal={ this.hideModal }
        />

      </div>
    );
  }
}

export default Lectorem;
