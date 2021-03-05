import React, { ChangeEvent, useState } from 'react';

import { Language, ColourType } from './constants';
import { transformTextAddRawColourSequence } from './transforms';

import { FG_4_BIT, BG_4_BIT, FG_8_BIT, BG_8_BIT, AnsiColour } from './ansiColour';
import FourBitPicker from './FourBitPicker';
import EightBitPicker from './EightBitPicker';

import AnsiColor from './ansiColour';

interface ColourOptions { 
  text: string, 
  foreground: AnsiColor, 
  background: AnsiColor, 
  bold: boolean, 
  italic: boolean,
  underline: boolean,
  strikethrough: boolean
};

const transformTextAddHTMLColourMarkup = (options: ColourOptions): JSX.Element => {
  const { text, foreground, background, bold, italic, underline, strikethrough } = options;

  let result = (<span>{text}</span>);

  if (text === "") { return result; }

  const styles = {} as any;
  
  if (bold) { styles["fontWeight"] = "bold"; }
  if (italic) { styles["fontStyle"] = "italic"; }
  if (underline) { styles["textDecoration"] = "underline"; }

  console.log(foreground);
 
  if (foreground) { styles["color"] = foreground.rgb; }
  if (background) { styles["backgroundColor"] = background.rgb; }

  result = <span style={styles}>{result}</span>;

  // Handle strikethrough last, since it clashes with italic otherwise
  if (strikethrough) { 
    const strikeStyles = {fontStyle: "normal"} as any;
    if (foreground) { strikeStyles["color"] = foreground.rgb; }
    result = (<del style={strikeStyles}>{result}</del>); 
  }

  return result;
};

const EscapeColour = () => {
  // Language to generate escape sequences for
  const [language, setLanguage] = useState(Language.Python);
  // Active FG/BG pickers
  const [foregroundColourType, setForegroundColourType] = useState(ColourType.None);
  const [backgroundColourType, setBackgroundColourType] = useState(ColourType.None);
  // Text formatting
  const [bold, setBold] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);
  // Text colours
  const [foreground, setForeground] = useState<AnsiColour | null>(null);
  const [background, setBackground] = useState<AnsiColour | null>(null);
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

  const toggleItalic = () => {
    setItalic(!italic);
  }
  
  const toggleUnderline = () => {
    setUnderline(!underline);
  }

  const toggleStrikethrough = () => {
    setStrikethrough(!strikethrough);
  }

  const handleForegroundChange = (newColour: AnsiColour, colourType: ColourType) => {
    setForeground(newColour);
    setForegroundColourType(colourType);
  }

  const handleBackgroundChange = (newColour: AnsiColour, colourType: ColourType) => {
    setBackground(newColour);
    setBackgroundColourType(colourType);
  }

  const handleForegroundReset = (colourType: ColourType) => {
    if (colourType == foregroundColourType) {
      setForeground(null);
      setForegroundColourType(ColourType.None);
    }
  }

  const handleBackgroundReset = (colourType: ColourType) => {
    if (colourType === backgroundColourType) {
      setBackground(null);
      setBackgroundColourType(ColourType.None);
    }
  }

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  }

  const getCommandForLanguage = (language: Language) => {
    switch(+language) {
      case Language.Python:
        return "$ python main.py"
      case Language.Rust: 
        return "$ rustc main.rs && ./main"
      case Language.Golang:
        return "$ go run main.go"
      case Language.JavaScript:
        return "$ node main.js"
    }
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

  return (
    <main className="flex flex-row w-full">
      <div className="w-1/5 p-2">
        <select>
          <option value='-1'>Select a preset...</option>
        </select>
        <select onChange={handleLanguageChange}>
          {Object.keys(Language).filter(key => !isNaN(Number(Language[key]))).map(key => {
            return (<option key={key} value={Language[key]}>{key}</option>)
          })}
        </select>
      </div>
      <div className="flex flex-col w-2/5 p-2">
        <div className="configuration">
          <div className="user-string">
            <label className="uppercase text-sm block">Enter Text</label>
            <input className="border rounded px-4 py-2 w-full" type='text' placeholder='Enter your text...' onChange={onUserTextChange}></input>
          </div>
          <div>
            <label className="inline uppercase text-sm">Foreground</label> 
            <label className="inline uppercase text-sm">4-bit</label> 
            <FourBitPicker onChange={handleForegroundChange} onReset={handleForegroundReset} colours={FG_4_BIT} isBright={bold} isActive={foregroundColourType === ColourType.FourBit}/>
            <label className="inline uppercase text-sm">8-bit</label> 
            <EightBitPicker onChange={handleForegroundChange} onReset={handleForegroundReset} colours={FG_8_BIT} isActive={foregroundColourType === ColourType.EightBit}/>
            <label className="inline uppercase text-sm">24-bit</label>
          </div>
          <div>
            <label className="inline uppercase text-sm">Background</label>
            <label className="inline uppercase text-sm">4-bit</label> 
            <FourBitPicker onChange={handleBackgroundChange} onReset={handleBackgroundReset} colours={BG_4_BIT} isBright={false} isActive={backgroundColourType === ColourType.FourBit}/>
            <label className="inline uppercase text-sm">8-bit</label> 
            <EightBitPicker onChange={handleBackgroundChange} onReset={handleBackgroundReset} colours={BG_8_BIT} isActive={backgroundColourType === ColourType.EightBit}/>
            <label className="inline uppercase text-sm">24-bit</label>
          </div>
          <label className="inline uppercase text-sm">Bold</label>
          <input className="mx-2" type='checkbox' checked={bold} onChange={toggleBold}></input>
          <label className="inline uppercase text-sm">Italic</label>
          <input className="mx-2" type='checkbox' checked={italic} onChange={toggleItalic}></input>
          <label className="inline uppercase text-sm">Underline</label>
          <input className="mx-2" type='checkbox' checked={underline} onChange={toggleUnderline}></input>
          <label className="inline uppercase text-sm">Strikethrough</label>
          <input className="mx-2" type='checkbox' checked={strikethrough} onChange={toggleStrikethrough}></input>
        </div>
        <div className="relative">
          <label className="inline uppercase text-sm">Escape Sequence</label>
          <div className="relative m-2">
            <input 
              className="raw-output w-full h-12 font-mono border rounded px-4 py-2 w-full" 
              type="text" 
              onChange={() => {}}
              value={transformTextAddRawColourSequence({ text: userText, foreground: foreground, background: background, bold: bold, italic: italic, underline: underline, strikethrough: strikethrough, language: language })} 
              />
            <div className="absolute top-0 left-0 w-full h-full border rounded w-full h-full" >
              <div className="flex justify-center items-center w-full h-full text-center opacity-0 hover:opacity-100 cursor-pointer" style={{"backgroundColor": "rgba(0, 0, 0, 0.05)"}}  onClick={copyOutput}>
                <span className="block px-2 bg-white border rounded">click to copy</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-11 flex items-center justify-center px-4 pt-.5 bg-white mt-0.5 mr-0.5">
                <span className="m-0.5 text-sm uppercase font-bold text-gray-500 bg-white">OCT</span>
                <span className="m-0.5 text-sm uppercase font-bold text-gray-500 bg-white">HEX</span>
                <span className="m-0.5 text-sm uppercase font-bold text-gray-500 bg-white">UNI</span>
            </div>
          </div>
        </div>
        <div className="preview-output relative w-full h-48 m-2 font-mono bg-gray-800 rounded p-12 text-white">
          <output className="block">{getCommandForLanguage(language as Language)}</output>
          <output className="block">{transformTextAddHTMLColourMarkup({ text: userText, foreground: foreground, background: background, bold: bold, italic: italic, underline: underline, strikethrough: strikethrough })}</output>
        </div>
      </div>
      <div className="flex flex-col w-2/5 p-2">
        
      </div>
    </main>
    )
};


export default EscapeColour;