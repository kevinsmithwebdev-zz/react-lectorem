import React, { Component } from 'react';
import Player from './Player/Player';
import './Lectorem.css';
import Modal from './Modal/Modal';
import Paragraphs from './Paragraphs/Paragraphs';

// TODO: issues with packages using hooks
class Lectorem extends Component {
  state = {
    modalData: null,
    readTime: 0,
  }

  showModal = lect => (lect.translation || lect.explanation) && this.setState({ modalData: lect });

  hideModal = () => this.setState({ modalData: null });

  setReadTime = readTime => this.setState({ readTime });

  render() {
    const { data } = this.props;

    if (!data) {
      return <p>Loading...</p>;
    }

    const {
      title, subtitle, audioPath, paragraphs,
    } = data;

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
          <Paragraphs
            paragraphs={ paragraphs }
            readTime={ this.state.readTime }
            showModal={ this.showModal }
          />
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
