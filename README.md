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

## See It in Use

There is a live site [here](https://kevinsmithwebdev.github.io/apps/lectorem-demo/index.html) where you can see a demo.

## Sample Code

```javascript
import React from 'react';
import Lectorem from 'react-lectorem';

const App = ({ storyData, isTranslationShown, isTranslationBelow, isBySentence  }) => (
  <Lectorem
    data={storyData}
    configuration={
      isTranslationShown,
      isTranslationBelow,
      isBySentence
    }
  />
);

export default App;
```

## Data

The data are urls for the relevant files (audio and images) and the text broken up into strings ("lects") with associated time codes. The text is broken up into groups of sentences (basically paragraphs) with optional headers and images. The sentences header can have it's own highlighted text. Each sentence is an array of objects. Those objects have a property "lects" and a property "sentenceTranslation".

The shape of the data will be:

```javascript
{
  audioPath: './frere.mp3',
  subtitle: '(Are You Sleeping)',
  title: 'Frère Jacques',
  paragraphs: [
    {
      header: {
        imagePath: './frere.png',
      },
      sentences: [
        {
          lects: [
            {
              start: 4.424,
              end: 5.511,
              text: 'Frère',
              translation: 'Brother',
              explanation: '"Brother" in this sense means the title of a monk. "Frère" is also where we get our word "friar"',
            },
            {
              start: 5.51,
              end: 6.533,
              text: 'Jacques',
              translation: 'James',
              explanation: 'In the English version of the song this is rendered as "John" but a more accurate translation would be "James" or "Jacob", from the Latin "Iacobus".',
            },
            {
              text: '.',
            },
          ],
          sentenceTranslation: 'Brother James.',
        },
        {
          lects: [
            {
              start: 6.618,
              end: 7.683,
              text: 'Frère',
              translation: 'Brother',
              explanation: '"Brother" in this sense means the title of a monk. "Frère" is also where we get our word "friar"',
            },
            {
              start: 7.68,
              end: 8.79,
              text: 'Jacques',
              translation: 'James',
              explanation: 'In the English version of the song this is rendered as "John" but a more accurate translation would be "James" or "Jacob", from the Latin "Iacobus".',
            },
            {
              text: '.',
            },
          ],
          sentenceTranslation: 'Brother James.',
        },
      ],
    },
    {
      sentences: [
        {
          lects: [
            {
              start: 8.831,
              end: 10.857,
              text: 'Dormez-vous?',
              translation: 'Are you sleeping?',
            },
          ],
          sentenceTranslation: 'Are you sleeping?',
        },
        {
          lects: [
            {
              start: 11.025,
              end: 12.71,
              text: 'Dormez-vous?',
              translation: 'Are you sleeping?',
            },
          ],
          sentenceTranslation: 'Are you sleeping?',
        },
      ],
    },
    {
      sentences: [
        {
          lects: [
            {
              start: 13.21,
              end: 13.706,
              text: 'Sonnez',
              translation: 'Ring',
            },
            {
              start: 13.704,
              end: 15.399,
              text: 'les matines',
              translation: 'the morning bells',
              explanation: 'These were the bells to wake the monks for the "matins", the first chants in the day, very early in the morning.',
            },
            {
              text: '!',
            },
          ],
          sentenceTranslation: 'Ring the morning bells!',
        },
        {
          lects: [
            {
              start: 15.39,
              end: 15.924,
              text: 'Sonnez',
              translation: 'Ring',
            },
            {
              start: 15.923,
              end: 17.572,
              text: 'les matines',
              translation: 'the morning bells',
              explanation: 'These were the bells to wake the monks for the "matins", the first chants in the day, very early in the morning.',
            },
            {
              text: '!',
            },
          ],
          sentenceTranslation: 'Ring the morning bells!',
        },
      ],
    },
    {
      sentences: [
        {
          lects: [
            {
              start: 17.57,
              end: 19.319,
              text: 'Ding, dang, dong.',
              explanation: 'An onomatopoeia for bells, like our "ding dong".',
            },
          ],
          sentenceTranslation: 'Ding, dang, dong.',
        },
        {
          lects: [
            {
              start: 19.784,
              end: 21.632,
              text: 'Ding, dang, dong.',
              explanation: 'An onomatopoeia for bells, like our "ding dong".',
            },
          ],
          sentenceTranslation: 'Ding, dang, dong.',
        },
      ],
    },
  ],
}
```

Interested in contributing? See our [guidelines](./CONTRIBUTING.md).
