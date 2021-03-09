import React, { ChangeEvent, useEffect, useState } from 'react';

import { Language, ColourType, EscapeType } from './constants';
import { transformTextAddRawColourSequence, transformTextToCodeSample } from './transforms';

import { AnsiColour } from './ansiColour';

import Label from './Label';
import ColourPickerGroup from './ColourPickerGroup';
import Box from './Box';
import Checkbox from './Checkbox';

import AnsiColor from './ansiColour';
import OutputEscapeSequence from './OutputEscapeSequence';

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
    if (event.target.value !== "-1") {
      setUserText(event.target.value);
    }
  }

  useEffect(() => {
    const codeSample = document.querySelector('.raw-code-sample')
    Prism.highlightElement(codeSample);
  });

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

  const copyFromDiv = (selector: string) => {
    const copyText = document.querySelector(selector) as HTMLDivElement;
    /* Select the text field */
    if (document.selection) {
      var range = document.body.createTextRange();
      range.moveToElementText(copyText);
      range.select().createTextRange();
    } else if (window.getSelection) {
      var range = document.createRange();
      range.selectNode(copyText);
      window.getSelection().addRange(range);
    }

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
      <div className="flex flex-col w-1/2 p-2">
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
              isForeground={true}
              isBright={bold}
              activeColourType={foregroundColourType}
            />
            <ColourPickerGroup
              title="Background"
              handleChange={handleBackgroundChange}
              handleReset={handleBackgroundReset}
              isForeground={false}
              isBright={bold}
              activeColourType={backgroundColourType}
            />
          </div>
        </Box>
        <Box>
          <Label text="Attributes" />
          <div className="flex flex-row items-center justify-center">
            <Checkbox label="Bold" checked={bold} onChange={toggleBold} />
            <Checkbox label="Italic" checked={italic} onChange={toggleItalic} />
            <Checkbox label="Underline" checked={underline} onChange={toggleUnderline} />
            <Checkbox label="Strikethrough" checked={strikethrough} onChange={toggleStrikethrough} />
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
      <div className="flex flex-col w-1/2 p-2">
        <Box>
          <Label text="Preview" />
          <div className="preview-output relative w-full h-48 font-mono bg-gray-800 rounded p-12 text-white">
            <output className="block">{getCommandForLanguage(language as Language)}</output>
            <output className="block">{transformTextAddHTMLColourMarkup(transformOptions)}</output>
          </div>
        </Box>
        <Box>
          <Label text="Example Code" />
          <div className="relative mb-2 rounded">
            <pre className="rounded code-sample">
              <code className="mono whitespace-pre text-white rounded raw-code-sample language-python">
                {transformTextToCodeSample(transformOptions)}
              </code>
            </pre>
            <div className="absolute top-0 left-0 w-full h-full border rounded w-full h-full" >
              <div className="flex justify-center items-center w-full h-full text-center opacity-0 hover:opacity-100 cursor-pointer" style={{ "backgroundColor": "rgba(224, 231, 255, 0.5)" }} onClick={() => copyFromDiv(".raw-code-sample")}>
                <span className="block px-2 bg-white hover:bg-gray-100 border rounded transform active:translate-y-0.5 select-none">click to copy code</span>
              </div>
            </div>
          </div>
        </Box>
        <Box>
          <OutputEscapeSequence
            transformOptions={transformOptions}
            transform={transformTextAddRawColourSequence}
            escapeType={escapeType}
            setEscapeType={setEscapeType}
          />
        </Box>
      </div>
    </main>
  )
};


export default EscapeColour;