import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Player from './Player';

describe('Player', () => {
  describe('the main component render', () => {
    const renderer = new ShallowRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        renderer.render(<Player />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data', () => {
      const onListen = () => {};
      const props = { onListen, audioPath: 'audioPath123' };
      it('should render and match snapshot', () => {
        renderer.render(<Player { ...props } />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });
  });
});
