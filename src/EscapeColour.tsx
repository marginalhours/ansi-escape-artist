import React, { ChangeEvent, useEffect, useState } from 'react';

import { ColourType, EscapeType } from './constants';
import { LanguageType, LANGUAGES } from './languages';
import { getPrismLanguage, transformTextAddRawColourSequence, transformTextToCodeSample } from './transforms';

import { AnsiColour, dim } from './ansiColour';

import Label from './Label';
import ColourPickerGroup from './ColourPickerGroup';
import Box from './Box';
import Checkbox from './Checkbox';

import { ColourOptions } from './transforms/colour';
import OutputEscapeSequence from './OutputEscapeSequence';

const transformTextAddHTMLColourMarkup = (options: ColourOptions): JSX.Element => {
  const { text, foreground, background, bold, dimmed, italic, underline, strikethrough, overline, blink } = options;

  let result = (<span>{text}</span>);

  if (text === "") { return result; }

  const styles = {} as any;

  if (bold) { styles["fontWeight"] = "bold"; }
  if (italic) { styles["fontStyle"] = "italic"; }
  styles["textDecoration"] = "";

  if (underline) { styles["textDecoration"] += " underline"; }
  if (overline) { styles["textDecoration"] += " overline"; }

  // Dimming dims foreground colour, but does nothing to background
  if (foreground) { styles["color"] = dim(foreground.rgb, dimmed ? 0.2 : 0.0); }
  if (!foreground && dimmed) { styles["color"] = dim("#ffffff", 0.2); }


  if (background) { styles["backgroundColor"] = background.rgb; }

  // Handle blink before applying styles, since only text should blink (not background)
  if (blink) {
    result = <span className="blink">{result}</span>;
  }

  result = <span style={styles}>{result}</span>;

  // Handle strikethrough last, since it clashes with italic otherwise
  if (strikethrough) {
    const strikeStyles = { fontStyle: "normal" } as any;
    if (foreground) { strikeStyles["color"] = foreground.rgb; }
    result = (<del style={strikeStyles}>{result}</del>);
  }

  return result;
};

const EscapeColour = ({ languageType, escapeType, setEscapeType }: { languageType: LanguageType, escapeType: EscapeType }) => {

  // Active FG/BG pickers
  const [foregroundColourType, setForegroundColourType] = useState(ColourType.None);
  const [backgroundColourType, setBackgroundColourType] = useState(ColourType.None);
  // Text formatting
  const [bold, setBold] = useState(false);
  const [dimmed, setDimmed] = useState(false);
  const [underline, setUnderline] = useState(false);
  const [italic, setItalic] = useState(false);
  const [strikethrough, setStrikethrough] = useState(false);
  const [overline, setOverline] = useState(false);
  const [blink, setBlink] = useState(false);
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

  const handlePresetSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value !== "-1") {
      setUserText(event.target.value);
    }
  }

  useEffect(() => {
    const codeSample = document.querySelector('.raw-code-sample')
    Prism.highlightElement(codeSample);
  });

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


  const transformOptions = { 
    text: userText, 
    foreground: foreground, 
    background: background, 
    bold: bold, 
    dimmed: dimmed, 
    italic: italic, 
    underline: underline, 
    overline: overline, 
    strikethrough: strikethrough, 
    blink: blink, 
    languageType: languageType, 
    escapeType: escapeType 
  };

  return (
    <main className="flex flex-row w-full p-2">
      <div className="flex flex-col w-1/2 p-2">
        <Box>
          <Label text="text" />
          <div className="relative mb-2">
            <input className="border focus:border-none focus:outline-none rounded px-4 py-2 w-full h-12" type='text' placeholder='Enter your text...' onChange={onUserTextChange} value={userText}></input>
            <select className="absolute top-1 p-0 right-2 w-min h-10 border-l active:border-none focus:border-none focus:outline-none px-4 py-2 bg-white text-gray-500" onChange={handlePresetSelect}>
              <option value='-1'>Select preset...</option>
              <option value='⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁼⁽⁾ⁿ'>Superscripts</option>
              <option value='₀₁₂₃₄₅₆₇₈₉₊₋₌₍₎ₐₑₒₓₔₕₖₗₘₙₚₛₜ'>Subscripts</option>
              <option value='♔♕♖♗♘♙♚♛♜♝♞♟'>Chess Pieces</option>
              <option value='♠♡♢♣♤♥♦♧'>Playing Cards</option>
              <option value='⚀⚁⚂⚃⚄⚅'>Dice</option>
              <option value='⚐⚑⚒⚓⚔⚕⚖⚗⚘⚙⚚⚛⚜⚝'>Miscellaneous Symbols</option>
              <option value='▁ ▂ ▃ ▄ ▅ ▆ ▇ █ ▀ ▔'>Box-drawing: Rising blocks</option>
              <option value='█ ▉ ▊ ▋ ▌ ▍ ▎ ▏▐	▕	'>Box-drawing: Thinning blocks</option>
              <option value='█ ▓ ▒ ░'>Box-drawing: Fading blocks</option>
              <option value='▖ ▗ ▘ ▙ ▚ ▛ ▜ ▝ ▞ ▟'>Box-drawing: Quadrants</option>
              <option value='┌─┐│└─┘├┬┤┴┼╭─╮╰╴╶╯╵╷'>Box-drawing: Light pipes</option>
              <option value='┏━┓┃┗━┛┣┳┫┻╋╸╺╹╻'>Box-drawing: Heavy pipes</option>
              <option value='╔═╗║╚═╝╠╦╣╧╬'>Box-drawing: Doubled pipes</option>
            </select>
          </div>
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
              isBright={false}
              activeColourType={backgroundColourType}
            />
          </div>
        </Box>
        <Box>
          <Label text="Text Attributes" />
          <div className="flex flex-row items-center justify-between px-4">
            <Checkbox label="Bold" checked={bold} onChange={() => setBold(!bold)} />
            <Checkbox label="Dimmed" checked={dimmed} onChange={() => setDimmed(!dimmed)} />
            <Checkbox label="Italic" checked={italic} onChange={() => setItalic(!italic)} />
            <Checkbox label="Underline" checked={underline} onChange={() => setUnderline(!underline)} />
            <Checkbox label="Overline" checked={overline} onChange={() => setOverline(!overline)} />
            <Checkbox label="Strikethrough" checked={strikethrough} onChange={() => setStrikethrough(!strikethrough)} />
            <Checkbox label="Blink" checked={blink} onChange={() => setBlink(!blink)} />
          </div>
        </Box>
      </div>
      <div className="flex flex-col w-1/2 p-2">
        <OutputEscapeSequence
          transformOptions={transformOptions}
          transform={transformTextAddRawColourSequence}
          escapeType={escapeType}
          setEscapeType={setEscapeType}
        />
        <Box>
          <Label text="Preview" />
          <div className="preview-output relative w-full h-48 font-mono bg-gray-800 rounded p-12 text-white">
            <output className="block">{LANGUAGES[languageType].command}</output>
            <output className="block">{transformTextAddHTMLColourMarkup(transformOptions)}</output>
          </div>
        </Box>
        <Box>
          <Label text="Example Code" />
          <div className="relative mb-2 rounded">
            <pre className="rounded code-sample">
              <code className={"mono whitespace-pre text-white rounded raw-code-sample " + getPrismLanguage(languageType)}>
                {transformTextToCodeSample(transformOptions)}
              </code>
            </pre>
            <div className="absolute top-0 left-0 w-full h-full border rounded w-full h-full" >
              <div className="flex justify-center items-center w-full h-full text-center opacity-0 hover:opacity-100 cursor-pointer" style={{ "backgroundColor": "rgba(224, 231, 255, 0.5)" }} onClick={() => copyFromDiv(".raw-code-sample")}>
                <span className="block px-2 bg-white hover:bg-gray-100 border rounded transform active:translate-y-0.5 select-none">click to copy</span>
              </div>
            </div>
          </div>
        </Box>
      </div>
    </main>
  )
};


export default EscapeColour;