import React, { ChangeEvent, useState } from 'react';

import { Language } from './constants';
import { transformTextAddRawColourSequence } from './transforms';

import { FG_4_BIT, BG_4_BIT } from './ansiColour';
import Picker from './Picker';

import AnsiColor from './ansiColour';

interface ColourOptions { 
  text: string, 
  foreground: AnsiColor, 
  background: AnsiColor, 
  bold: boolean, 
  underline: boolean
};

const transformTextAddHTMLColourMarkup = (options: ColourOptions): string => {
  const { text, foreground, background, bold, underline} = options;

  if (text === "") { return text; }

  let f = text;

  if (bold) {
    f = (<span style={{fontWeight: "bold"}}>{f}</span>);
  }
  if (underline) {
    f = (<span style={{textDecoration: "underline"}}>{f}</span>);
  }
  if (foreground) {
    f = (<span style={{color: foreground.rgb}}>{f}</span>); 
  }
  if (background) {
    f = (<span style={{backgroundColor: background.rgb}}>{f}</span>);
  }

  return f;
};

const EscapeColour = () => {
  // Language to generate escape sequences for
  const [language, setLanguage] = useState(Language.Python);
  // Text formatting
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);
  // Text colours
  const [foreground, setForeground] = useState(false);
  const [background, setBackground] = useState(false);
  // User text
  const [userText, setUserText] = useState('');

  /**
   * Handle the user entering text
   * @param event change event fired by the user text input element
   */
  const onUserTextChange = (event: ChangeEvent) => {
    const element = event.target as HTMLInputElement;
    setUserText(element.value);
  };

  const toggleBold = () => {
    setBold(!bold);
  }

  const toggleUnderline = () => {
    setUnderline(!underline);
  }
  
  const handleForegroundChange = (newColour) => {
    setForeground(newColour);
  }

  const handleBackgroundChange = (newColour) => {
    setBackground(newColour);
  }

  const copyOutput = () => {
      const copyText = document.querySelector(".raw-output") as HTMLInputElement;
      console.log(copyText);
      /* Select the text field */
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
    
      /* Copy the text inside the text field */
      document.execCommand("copy");

      (function deselect(){
        var selection = ('getSelection' in window)
          ? window.getSelection()
          : ('selection' in document)
            ? document.selection
            : null;
        if ('removeAllRanges' in selection) selection.removeAllRanges();
        else if ('empty' in selection) selection.empty();
      })();
  }

  const getLanguages = () => {
    return Object.keys(Language).filter(key => !isNaN(Number(Language[key]))).map(key => {
      return (<option key={key} value={Language[key]}>{key}</option>)
    })
  }

  return (
    <main className="flex flex-row w-full">
      <div className="flex w-1/5 p-2">
        <select>
          <option value='-1'>Select a preset...</option>
        </select>
        <select>
          {getLanguages()}
        </select>
      </div>
      <div className="flex flex-col w-2/5 p-2">
        <div className="configuration">
          <div className="user-string">
            <label className="uppercase text-sm block">Enter Text</label>
            <input className="border rounded px-4 py-2 w-full" type='text' placeholder='Enter your text...' onChange={onUserTextChange}></input>
          </div>
          <label className="inline uppercase text-sm">Foreground</label> 
          <Picker onChange={handleForegroundChange} colours={FG_4_BIT}/>
          <label className="inline uppercase text-sm">Background</label>
          <Picker onChange={handleBackgroundChange} colours={BG_4_BIT}/>
          <label className="inline uppercase text-sm">Underline</label>
          <input className="mx-2" type='checkbox' checked={underline} onChange={toggleUnderline}></input>
          <label className="inline uppercase text-sm">Bold</label>
          <input className="mx-2" type='checkbox' checked={bold} onChange={toggleBold}></input>
        </div>
        <div className="relative">
          <div className="click-handler absolute top-0 left-0 w-full h-full" onClick={copyOutput}></div>
          <input 
            className="raw-output w-full h-12 m-2 font-mono border rounded px-4 py-2 w-full" 
            type="text" 
            value={transformTextAddRawColourSequence({ text: userText, foreground: foreground, background: background, bold: bold, underline: underline, language: language })} 
            />
        </div>
        <div className="preview-output w-full h-48 m-2 font-mono bg-gray-800 rounded p-4 text-white">
          <output>{transformTextAddHTMLColourMarkup({ text: userText, foreground: foreground, background: background, bold: bold, underline: underline})}</output>
        </div>
      </div>
    </main>
    )
};


export default EscapeColour;