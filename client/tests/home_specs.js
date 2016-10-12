import { expect } from 'chai';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag
} from 'react-addons-test-utils';
import MainVideo from '../src/components/home/MainVideo';
import fetchMock from 'fetch-mock';
import sinon from 'sinon';

describe('Main Video', ()=>{
  describe('fetchTopVideo', ()=>{
    const urlRegex = /\/records/;
    afterEach(()=>{
      localStorage.clear()
      fetchMock.restore();
    })

    let testRes = {
      body: {
        category: "Sports",
        createdAt: "2016-10-04T00:56:19.255Z",
        id: 1,
        lessisgood: 1,
        moreisgood: 0,
        subcategory: "Basketball",
        title: "test",
        units : "1",
        updatedAt: "2016-10-04T00:56:19.255Z"
      },
      ok: true,
      status: 200,
      statusText: "OK",
      type: "basic",
      url: "http://localhost:3000/records"
    }

    let testVideo = {
      link: 'l6Zs_l7TOhg',
      title: 'Oranges?!',
      comments: 23,
      votes: 99,
      subId: 1
    }

    it('should fetch from /records and render the video', ()=>{
      fetchMock.mock(urlRegex, testRes);
      const component = renderIntoDocument(
        <MainVideo video={testVideo} />
      )
      const YouTube = scryRenderedDOMComponentsWithClass(component, 'video-container');

      expect(YouTube.length).to.equal(1)
      expect(fetchMock.called(urlRegex)).to.equal(true);
    })

    it('should render the top h1 text', ()=>{
      fetchMock.mock(urlRegex, testRes);
      const component = renderIntoDocument(
        <MainVideo video={testVideo} />
      )
      const h1 = scryRenderedDOMComponentsWithTag(component, 'h2');

      expect(h1.length).to.equal(1);
    })

  })



})
