import React, { useState } from 'react';
import Lectorem from 'react-lectorem';
import storyData from './frere.data';
import './App.css'

const semver = '1.0.1';

const App = () => {
  const [isTranslationShown, setIsTranslationShown] = useState(true);
  const [isTranslationBelow, setIsTranslationBelow] = useState(true);
  const [isBySentence, setIsBySentence] = useState(false);

  const toggleValue = (flag, setFlag) =>  setFlag(!flag);

  return (
    <div className='App'>

      <div className='demoBox'>
        <div className='controls'>
          <button className='control' onClick={ () => toggleValue(isBySentence, setIsBySentence) }>
            { isBySentence ? 'Organize by Paragraph' : 'Organize by Sentence' }
          </button>

          <button className='control' onClick={ () => toggleValue(isTranslationShown, setIsTranslationShown)}>
            { isTranslationShown ? 'Hide Translation' : 'ShowTranslation' }
          </button>

          <button className={`control ${!isTranslationShown ? 'disabled' : '' }`} onClick={ () => toggleValue(isTranslationBelow, setIsTranslationBelow)}>
            { isTranslationBelow ? 'Translation Beside' : 'Translation Below' }
          </button>
        </div>
        <p className='controlText'>This is not part of the component - it's to show that these can be controlled.</p>
        <p className='controlText'>{ `React Lectorem - v${ semver }` }</p>
      </div>

      <Lectorem
        configuration={ { isTranslationShown, isTranslationBelow, isBySentence } }
        data={ storyData }
      />
    </div>
  );
}

export default App;
