import { EscapeType, Language } from '../constants';
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

class EscapeSet {
    [EscapeType.Octal]: string;
    [EscapeType.Hex]: string;
    [EscapeType.Unicode]: string;

    constructor(octal: string, hex: string, unicode: string){
        this[EscapeType.Octal] = octal;
        this[EscapeType.Hex] = hex;
        this[EscapeType.Unicode] = unicode;
    }
}

const ESCAPES = {
    [Language.Python3]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    [Language.Rust]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u{001b}[`),
    [Language.Golang]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
};

const CODE_TEMPLATES = {
    [Language.Python3]: `def format(s: str) -> str:\n    return f"{{PREFIX}}{s}{{SUFFIX}}"\n\nif __name__ == "__main__":\n    print(format("{{TEXT}}"))`,
    [Language.Rust]: `fn main(){\n    println!("hello")\n}`
}

const getRawEscapeCodeBytes = (options: RawColourOptions): Array<Number> => {
    const { text, foreground, background, bold, italic, underline, strikethrough, language, escapeType } = options; 

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

    const escape = ESCAPES[+language][escapeType];
    const template = CODE_TEMPLATES[+language];

    if (text === "") { return text; }

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

    const escape = ESCAPES[+language][escapeType];

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

