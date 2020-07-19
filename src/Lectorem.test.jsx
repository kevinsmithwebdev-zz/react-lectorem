import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import cloneDeep from 'lodash/cloneDeep';
import Lectorem from './Lectorem';
import storyData from '../fixture/storyData.json';

describe('Lectorem', () => {
  describe('the main component render', () => {
    const renderer = new ShallowRenderer();
    describe('empty', () => {
      it('should render without crashing', () => {
        renderer.render(<Lectorem />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with undefined data', () => {
      const props = { data: undefined };
      it('should render without crashing', () => {
        renderer.render(<Lectorem {...props} />);
        expect(renderer.getRenderOutput()).toMatchSnapshot();
      });
    });

    describe('with data', () => {
      describe('with all data', () => {
        const props = { data: storyData };
        it('should render without crashing', () => {
          renderer.render(<Lectorem {...props} />);
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });

      describe('with data missing title', () => {
        const data = cloneDeep(storyData);
        delete data.title;
        const props = { data };
        it('should render without crashing', () => {
          renderer.render(<Lectorem {...props} />);
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });

      describe('with data missing subtitle', () => {
        const data = cloneDeep(storyData);
        delete data.subtitle;
        const props = { data };
        it('should render without crashing', () => {
          renderer.render(<Lectorem {...props} />);
          expect(renderer.getRenderOutput()).toMatchSnapshot();
        });
      });
    });
  });

  describe('showModal', () => {
    describe('when lect has translation but no explanation', () => {
      const lect = { translation: 'translation123' };
      const component = new Lectorem();
      component.setState = jest.fn();
      component.showModal(lect);
      it('should call setState with correct object', () => {
        const expectedParam = { modalData: lect };
        expect(component.setState).toBeCalledWith(expectedParam);
      });
    });

    describe('when lect no translation but has explanation', () => {
      const lect = { explanation: 'explanation123' };
      const component = new Lectorem();
      component.setState = jest.fn();
      component.showModal(lect);
      it('should call setState with correct object', () => {
        const expectedParam = { modalData: lect };
        expect(component.setState).toBeCalledWith(expectedParam);
      });
    });

    describe('when lect has translation and has explanation', () => {
      const lect = {
        explanation: 'explanation123',
        translation: 'translation123',
      };
      const component = new Lectorem();
      component.setState = jest.fn();
      component.showModal(lect);
      it('should call setState with correct object', () => {
        const expectedParam = { modalData: lect };
        expect(component.setState).toBeCalledWith(expectedParam);
      });
    });

    describe('when lect has neither translation nor explanation', () => {
      const lect = {};
      const component = new Lectorem();
      component.setState = jest.fn();
      component.showModal(lect);
      it('should call setState with correct object', () => {
        expect(component.setState).not.toBeCalled();
      });
    });
  });

  describe('hideModal', () => {
    const component = new Lectorem();
    component.setState = jest.fn();
    component.hideModal();
    it('should call setState with correct object', () => {
      const expectedParam = { modalData: null };
      expect(component.setState).toBeCalledWith(expectedParam);
    });
  });

  describe('setReadTime', () => {
    const readTime = 3.1459;
    const component = new Lectorem();
    component.setState = jest.fn();
    component.setReadTime(readTime);
    it('should call setState with correct object', () => {
      const expectedParam = { readTime };
      expect(component.setState).toBeCalledWith(expectedParam);
    });
  });
});
