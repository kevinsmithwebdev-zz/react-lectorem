import React from 'react';
import Lectorem from 'react-lectorem';
import storyData from './frere.data';
import './App.css'

const semver = '1.0.1';

const App = () => {
  const config = { isTranslationShown: true, isTranslationBelow: true, isBySentence: false };

  return (
    <Lectorem
      configuration={ config }
      data={ storyData }
    />
  );
}

export default App;
