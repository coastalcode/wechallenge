import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import SignIn from '../src/components/auth/signin';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

// describe('SignIn', () => {
//   let component;

//   beforeEach(() => {
//     component = renderIntoDocument(
//         <SignIn />
//       )
//   })

//   it('has a signin button', () => {
//     const button = scryRenderedDOMComponentsWithTag(component, 'button')
//     expect(button.length).to.equal(0);
//   });

// });