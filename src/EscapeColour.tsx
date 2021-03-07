import React, { ChangeEvent, useState } from 'react';

import { Language, ColourType, EscapeType } from './constants';
import { transformTextAddRawColourSequence, transformTextToCodeSample } from './transforms';

import { FG_4_BIT, BG_4_BIT, FG_8_BIT, BG_8_BIT, AnsiColour } from './ansiColour';

import Label from './Label';
import ColourPickerGroup from './ColourPickerGroup';
import EscapeTypeSelector from './EscapeTypeSelector';
import Box from './Box';
import Checkbox from './Checkbox';

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

  if (foreground) { styles["color"] = foreground.rgb; }
  if (background) { styles["backgroundColor"] = background.rgb; }

  result = <span style={styles}>{result}</span>;

  // Handle strikethrough last, since it clashes with italic otherwise
  if (strikethrough) {
    const strikeStyles = { fontStyle: "normal" } as any;
    if (foreground) { strikeStyles["color"] = foreground.rgb; }
    result = (<del style={strikeStyles}>{result}</del>);
  }

  return result;
};

const EscapeColour = () => {
  // Language to generate escape sequences for
  const [language, setLanguage] = useState(Language.Python3);
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
  // Active escape type 
  const [escapeType, setEscapeType] = useState(EscapeType.Octal);

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

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value);
  }

  const handlePresetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== "-1"){
      setUserText(event.target.value);  
    }
  }

  const getCommandForLanguage = (language: Language) => {
    switch (+language) {
      case Language.Python3:
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
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    (function deselect() {
      var selection = ('getSelection' in window)
        ? window.getSelection()
        : ('selection' in document)
          ? document.selection
          : null;
      if ('removeAllRanges' in selection) selection.removeAllRanges();
      else if ('empty' in selection) selection.empty();
    })();
  }

  const transformOptions = { text: userText, foreground: foreground, background: background, bold: bold, italic: italic, underline: underline, strikethrough: strikethrough, language: language, escapeType: escapeType };

  return (
    <main className="flex flex-row w-full">
      <div className="flex flex-col w-2/5 p-2">
        <Box>
          <Label text="text" />
          <input className="border focus:border-0 rounded px-4 py-2 w-full" type='text' placeholder='Enter your text...' onChange={onUserTextChange} value={userText}></input>
          <select className="w-full border mt-2 focus:border-0 rounded px-4 py-2 w-full bg-white text-gray-400" onChange={handlePresetSelect}>
            <option value='-1'>Select a preset...</option>
            <option value='▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▀ ▔'>Box-drawing: Rising blocks</option>
            <option value='█ ▉ ▊ ▋ ▌ ▍ ▎ ▏▐	▕	'>Box-drawing: Thinning blocks</option>
            <option value='█ ▓ ▒ ░'>Box-drawing: Fading blocks</option>
            <option value='▖ ▗ ▘ ▙ ▚ ▛ ▜ ▝ ▞ ▟'>Box-drawing: Quadrants</option>
            <option value='┌─┐│└─┘├┬┤┴┼╭─╮╰╴╶╯╵╷'>Box-drawing: Light pipes</option>
            <option value='┏━┓┃┗━┛┣┳┫┻╋╸╺╹╻'>Box-drawing: Heavy pipes</option>
            <option value='╔═╗║╚═╝╠╦╣╧╬'>Box-drawing: Doubled pipes</option>
          </select>
        </Box>
        <Box>
          <Label text="Colours" />
          <div className="flex flex-row">
            <ColourPickerGroup
              title="Text"
              handleChange={handleForegroundChange}
              handleReset={handleForegroundReset}
              fourBitColours={FG_4_BIT}
              eightbitColours={FG_8_BIT}
              isBright={bold}
              activeColourType={foregroundColourType}
            />
            <ColourPickerGroup
              title="Background"
              handleChange={handleBackgroundChange}
              handleReset={handleBackgroundReset}
              fourBitColours={BG_4_BIT}
              eightbitColours={BG_8_BIT}
              isBright={bold}
              activeColourType={backgroundColourType}
            />
          </div>
        </Box>
        <Box>
          <Label text="Attributes" />
          <div className="flex flex-row items-center justify-center">
            <Checkbox label="Bold" checked={bold} onChange={toggleBold}/>
            <Checkbox label="Italic" checked={italic} onChange={toggleItalic}/>
            <Checkbox label="Underline" checked={underline} onChange={toggleUnderline}/>
            <Checkbox label="Strikethrough" checked={strikethrough} onChange={toggleStrikethrough}/>
          </div>
        </Box>
        <Box>
          <Label text="Language" />
          <select className="w-full border focus:border-0 rounded px-4 py-2 w-full bg-white text-gray-400" onChange={handleLanguageChange}>
            {Object.keys(Language).filter(key => !isNaN(Number(Language[key]))).map(key => {
              return (<option key={key} value={Language[key]}>{key}</option>)
            })}
          </select>
        </Box>
      </div>
      <div className="flex flex-col w-2/5 p-2">
        <Box>
          <Label text="Output Escape Sequence" />
          <div className="relative mb-2">
            <input
              className="raw-output w-full h-12 font-mono border rounded px-4 py-2 w-full"
              type="text"
              onChange={() => { }}
              value={transformTextAddRawColourSequence(transformOptions)}
            />
            <div className="absolute top-0 left-0 w-full h-full border rounded w-full h-full" >
              <div className="flex justify-center items-center w-full h-full text-center opacity-0 hover:opacity-100 cursor-pointer" style={{ "backgroundColor": "rgba(0, 0, 0, 0.05)" }} onClick={copyOutput}>
                <span className="block px-2 bg-white border rounded">click to copy sequence</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-11 flex flex-row items-center justify-between w-min px-4 pt-.5 bg-white mt-0.5 mr-0.5 border-l">
              <EscapeTypeSelector name="oct" selected={escapeType == EscapeType.Octal} onClick={() => setEscapeType(EscapeType.Octal)} />
              <EscapeTypeSelector name="hex" selected={escapeType == EscapeType.Hex} onClick={() => setEscapeType(EscapeType.Hex)} />
              <EscapeTypeSelector name="uni" selected={escapeType == EscapeType.Unicode} onClick={() => setEscapeType(EscapeType.Unicode)} />
            </div>
          </div>
        </Box>
        <Box>
          <Label text="Example Code"/>
          <div className="mono whitespace-pre text-white bg-gray-900 rounded p-4">
            {transformTextToCodeSample(transformOptions)}
          </div>
        </Box>
        <Box>
          <Label text="Preview" />
          <div className="preview-output relative w-full h-48 font-mono bg-gray-800 rounded p-12 text-white">
            <output className="block">{getCommandForLanguage(language as Language)}</output>
            <output className="block">{transformTextAddHTMLColourMarkup(transformOptions)}</output>
          </div>
        </Box>
      </div>
    </main>
  )
};


export default EscapeColour;