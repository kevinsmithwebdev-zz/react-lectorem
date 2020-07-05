# React Lectorem

lectorem - Latin, Acc.
<i>/lehk-TOR-ehm/</i>
(for/to the) reader

This is a React module to synchronize text and speech. A small player allows the user to play the audio and the corresponding text will highlight as it is being read.

This was built to help teaching foreign languages.

## Install

```bash
npm install --save react-lectorem
```
or
```bash
yarn add react-lectorem
```

## Sample Usage

```javascript
import React from 'react';
import Lectorem from 'react-lectorem';

const MyComponent = ({ data }) => (
  <Lectorem  data={ storyData } />
);

export default MyComponent;
```

## Data
The data are urls for the relevant files (audio and images) and the text broken up into strings ("lects") with associated time codes. The text is broken up into paragraphs with optional headers and images. The paragraph header can have it's own highlighted text.

The shape of the data will be:
```javascript
const data = {
  audioPath: 'pathToAudio.mp3',
  subtitle: 'My Subtitle',
  title: 'My Title',
  paragraphs: [
    {
      header: {
        lects: [
          {
            start: 0.36,
            end: 1.18,
            text: 'The',
          },
          {
            start: 1.18,
            end: 2.58,
            text: 'Header',
          },
        ],
        imagePath: 'pathToImage.png',
      },
      lects: [
        {
          start: 2.64,
          end: 3.22,
          text: 'I',
        },
        {
          start: 3.6,
          end: 4.12,
          text: 'like',
        },
        {
          start: 4.12,
          end: 4.98,
          text: 'to read.',
        },
      ],
    },
  ],
}
```

Interested in contributing? See our [guidelines](./CONTRIBUTING.md).
