import { Language } from '../constants';
import AnsiColor from '../ansiColour';

interface ColourOptions { 
    text: string, 
    foreground: AnsiColor, 
    background: AnsiColor, 
    bold: boolean, 
    underline: boolean
};

interface RawColourOptions extends ColourOptions {
    language: Language
}


export const transformTextAddRawColourSequence = (options: RawColourOptions): string => {
    const { text, foreground, background, bold, underline, language } = options; 

    if (text === "") { return text; }

    let f = text; 
    let needsReset = false;

    if (bold) { 
        needsReset = true; 
        f = String.raw`\u001b[1m${f}`;
    }
    if (underline) { 
        needsReset = true;
        f = String.raw`\u001b[4m${f}`;
    }
    if (needsReset) {
        f = String.raw`${f}\u001b[0m`; // reset
    }

    return f;
};

