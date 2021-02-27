import { Language } from '../constants';
import AnsiColor from '../ansiColour';

interface ColourOptions { 
    text: string, 
    foreground: AnsiColor, 
    background: AnsiColor, 
    bold: boolean, 
    underline: boolean,
    italic: boolean,
    strikethrough: boolean
};

interface RawColourOptions extends ColourOptions {
    language: Language
}


const ESCAPES = {
    [Language.Python]: String.raw`\u001b[`,
    [Language.Rust]: String.raw`\x1b[`,
    [Language.Golang]: String.raw`\x1b[`,
};



export const transformTextAddRawColourSequence = (options: RawColourOptions): string => {
    const { text, foreground, background, bold, italic, underline, strikethrough, language } = options; 

    const escape = ESCAPES[language];

    if (text === "") { return text; }

    let f = text; 
    let needsReset = false;

    if (bold) { 
        needsReset = true; 
        f = String.raw`${escape}1m${f}`;
    }
    if (italic) {
        needsReset = true;
        f = String.raw`${escape}3m${f}`;
    }
    if (underline) { 
        needsReset = true;
        f = String.raw`${escape}4m${f}`;
    }
    if (strikethrough) {
        needsReset = true;
        f = String.raw`${escape}9m${f}`;
    }

    if (foreground) {
        needsReset = true;
        f = String.raw`${escape}${foreground.ansi}m${f}`;
    }
    if (background) {
        needsReset = true;
        f = String.raw`${escape}${background.ansi}m${f}`;
    }

    if (needsReset) {
        f = String.raw`${f}${escape}0m`; // reset
    }

    return f;
};

