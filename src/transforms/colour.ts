import { EscapeType, Language, Escapes, CODE_TEMPLATES } from '../constants';
import AnsiColor from '../ansiColour';


interface ColourOptions { 
    text: string, 
    foreground: AnsiColor, 
    background: AnsiColor, 
    bold: boolean, 
    underline: boolean,
    italic: boolean,
    strikethrough: boolean,
    escapeType: EscapeType
};

interface RawColourOptions extends ColourOptions {
    language: Language
}

const getRawEscapeCodeBytes = (options: RawColourOptions): Array<Number> => {
    const { text, foreground, background, bold, italic, underline, strikethrough} = options; 

    if (text === "") { return []; }

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

    return code;
}


export const transformTextToCodeSample = (options: RawColourOptions): string => {
    const { text, language, escapeType } = options; 

    const escape = Escapes[+language][escapeType];
    const template = CODE_TEMPLATES[+language];

    let prefix = "";
    let suffix = ""; 

    let code = getRawEscapeCodeBytes(options);

    if (code.length > 0) {
        prefix = String.raw`${escape}${code.join(';')}m`;
        suffix = String.raw`${escape}0m`;
    }

    return template.replace("{{PREFIX}}", prefix).replace("{{SUFFIX}}", suffix).replace("{{TEXT}}", text);
}

export const transformTextAddRawColourSequence = (options: RawColourOptions): string => {
    const { text, language, escapeType } = options; 

    const escape = Escapes[+language][escapeType];

    if (text === "") { return text; }

    let prefix = "";
    let suffix = ""; 

    let code = getRawEscapeCodeBytes(options);

    if (code.length > 0) {
        prefix = String.raw`${escape}${code.join(';')}m`;
        suffix = String.raw`${escape}0m`;
    }

    return String.raw`${prefix}${text}${suffix}`;
};

