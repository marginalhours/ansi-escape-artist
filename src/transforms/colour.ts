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

class EscapeSet {
    unicode: string;
    octal: string;
    hex: string;

    constructor(unicode: string, octal: string, hex: string){
        this.unicode = unicode;
        this.octal = octal;
        this.hex = hex;
    }
}


const ESCAPES = {
    [Language.Python]: new EscapeSet(String.raw`\u001b[`, String.raw`\033[`, String.raw`\x1b[`),
    [Language.Rust]: String.raw`\x1b[`,
    [Language.Golang]: String.raw`\x1b[`,
};



export const transformTextAddRawColourSequence = (options: RawColourOptions): string => {
    const { text, foreground, background, bold, italic, underline, strikethrough, language } = options; 

    const escape = ESCAPES[language].octal;

    if (text === "") { return text; }

    let prefix = "";
    let suffix = ""; 

    let code = [];

    if (bold) {  
        code.push(1);
    }
    if (italic) {
        code.push(3);
    }
    if (underline) {
        code.push(4);
    }
    if (strikethrough) {
        code.push(9);
    }

    if (foreground) {
        // Take into account that 1; may already have been added by bold (for 4-bit colours)
        if (bold && foreground.isBright) {
            code = code.concat(...foreground.ansi.slice(1));
        } else {
            code = code.concat(...foreground.ansi);
        }
    }
    if (background) {
        code = code.concat(...background.ansi);
    }

    if (code.length > 0) {
        prefix = String.raw`${escape}${code.join(';')}m`;
        suffix = String.raw`${escape}0m`;
    }

    return String.raw`${prefix}${text}${suffix}`;
};

