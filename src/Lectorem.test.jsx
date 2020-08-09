import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import cloneDeep from 'lodash/cloneDeep';
import Lectorem, { createShowModal, createHideModal } from './Lectorem';
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

  describe('createShowModal', () => {
    const setModalData = jest.fn();
    const showModal = createShowModal(setModalData);
    describe('the function it returns', () => {
      describe('when lect has translation but no explanation', () => {
        const lect = { translation: 'translation123' };
        beforeAll(() => {
          setModalData.mockReset();
          showModal(lect);
        });
        it('should call setModalData with correct lect', () => {
          expect(setModalData).toBeCalledWith(lect);
        });
      });

      describe('when lect no translation but has explanation', () => {
        const lect = { explanation: 'explanation123' };
        beforeAll(() => {
          setModalData.mockReset();
          showModal(lect);
        });
        it('should call setModalData with correct lect', () => {
          expect(setModalData).toBeCalledWith(lect);
        });
      });

      describe('when lect has neither translation nor explanation', () => {
        const lect = { other: 'data' };
        beforeAll(() => {
          setModalData.mockReset();
          showModal(lect);
        });
        it('should call not call setModalData ', () => {
          expect(setModalData).not.toBeCalled();
        });
      });
    });
  });

  describe('createHideModal', () => {
    const setModalData = jest.fn();
    const hideModal = createHideModal(setModalData);
    describe('the function it returns', () => {
      beforeAll(() => {
        setModalData.mockReset();
        hideModal();
      });
      it('should call setModalData with null', () => {
        expect(setModalData).toBeCalledWith(null);
      });
    });
  });
});
