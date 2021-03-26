import { EscapeType } from '../constants';
import { LanguageType, LANGUAGES } from '../languages';
import { AnsiColour } from '../ansiColour';


export interface ColourOptions { 
    text: string, 
    foreground: AnsiColour | null, 
    background: AnsiColour | null, 
    escapeType: EscapeType,
    bold: boolean, 
    dimmed: boolean,
    italic: boolean,
    underline: boolean,
    overline: boolean,
    strikethrough: boolean,
    blink: boolean,
    languageType: LanguageType
};

const getRawEscapeCodeBytes = (options: ColourOptions): Array<Number> => {
    const { text, foreground, background, bold, dimmed, italic, underline, overline, strikethrough, blink} = options; 

    if (text === "") { return []; }

    let code = [];

    if (bold) {  
        code.push(1);
    }
    if (dimmed) {
        code.push(2);
    }
    if (italic) {
        code.push(3);
    }
    if (underline) {
        code.push(4);
    }
    if (blink) {
        code.push(5);
    }
    if (strikethrough) {
        code.push(9);
    }
    if (overline) {
        code.push(53);
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


export const transformTextToCodeSample = (options: ColourOptions): string => {
    const { text, languageType, escapeType } = options; 

    const language = LANGUAGES[languageType];

    const escape = language.escapes[escapeType];
    const template = language.template;

    let prefix = "";
    let suffix = ""; 

    let code = getRawEscapeCodeBytes(options);

    if (code.length > 0) {
        prefix = String.raw`${escape}${code.join(';')}m`;
        suffix = String.raw`${escape}0m`;
    }

    return template.replace("{{PREFIX}}", prefix).replace("{{SUFFIX}}", suffix).replace("{{TEXT}}", text);
}

export const transformTextAddRawColourSequence = (options: ColourOptions): string => {
    const { text, languageType, escapeType } = options; 

    const language = LANGUAGES[languageType];

    const escape = language.escapes[escapeType];

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
