const isPlaying = media => (
  media.duration > 0
  && !media.paused
  && !media.ended
  && media.readyState > 2
);

describe('Play Audio', () => {
  before(() => {
    cy.visit('/');
  });
  it('should start paused', () => {
    cy.get('audio.react-audio-player')
      .then(audio => {
        const audioElement = audio.get(0);
        audioElement.muted = true;
        expect(audioElement.paused).to.equal(true);
      });
  });

  it('should play when started', () => {
    cy.get('audio.react-audio-player')
      .then(audio => {
        const audioElement = audio.get(0);
        audioElement.muted = true;
        audioElement.play();
        expect(isPlaying(audioElement)).to.equal(true);
      });
  });

  it.skip('should stop when finished', () => {
    cy.get('audio.react-audio-player')
      .then(audio => {
        const audioElement = audio.get(0);
        audioElement.muted = true;
        audioElement.play();
        // cy.wait(30000);
        expect(isPlaying(audioElement)).to.equal(false);
      });
  });
});
