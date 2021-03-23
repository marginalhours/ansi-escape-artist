export enum Language {
    Python3 = 0,
    Rust = 1,
    Golang = 2,
    JavaScript = 3
};

export enum ColourType {
    None = 0,
    FourBit = 1,
    EightBit = 2,
    RGB = 3
};

export enum EscapeType {
    Octal = 0,
    Hex = 1,
    Unicode = 2
};

export enum MovementType {
    None = 0, 
    RelativeCursor = 1,
    AbsoluteCursor = 2,
    LinesRelative = 3,
    LineClear = 4,
    ScreenClear = 5,
    Scroll = 6,
    SaveCursor = 7,
    RestoreCursor = 8,
    ReportCursor = 9
};

export enum ClearType {
    None = -1,
    FromCursorTillEnd = 0,
    FromCursorTillStart = 1,
    Entire = 2
};

class EscapeSet {
    [EscapeType.Octal]: string | undefined;
    [EscapeType.Hex]: string | undefined;
    [EscapeType.Unicode]: string | undefined;

    constructor(octal: string | undefined, hex: string | undefined, unicode: string | undefined){
        this[EscapeType.Octal] = octal;
        this[EscapeType.Hex] = hex;
        this[EscapeType.Unicode] = unicode;
    }
}

export const Escapes = {
    [Language.Python3]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    [Language.Rust]: new EscapeSet(undefined, String.raw`\x1b[`, String.raw`\u{001b}[`),
    [Language.Golang]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    [Language.JavaScript]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b`)
};

export const CODE_TEMPLATES = {
    [Language.Python3]: `def format(s: str) -> str:\n    return f"{{PREFIX}}{s}{{SUFFIX}}"\n\nif __name__ == "__main__":\n    print(format("{{TEXT}}"))`,
    [Language.Rust]: `fn add_formatting(s: &str) -> String {\n    return String::from(format!("{{PREFIX}}{0}{{SUFFIX}}", s));\n}\n\nfn main() {\n    println!("{}", add_formatting("{{TEXT}}"));\n}\n`,
    [Language.Golang]: `package main\n\nimport "fmt"\n\nfunc format(a string) string {\n\treturn fmt.Sprintf("{{PREFIX}}%s{{SUFFIX}}", a)\n}\n\nfunc main() {\n\tfmt.Println(format("{{TEXT}}"))\n}\n`,
    [Language.JavaScript]: `const format = s => \`{{PREFIX}}\${s}{{SUFFIX}}\`\n\nconsole.log(format("{{TEXT}}"))`
}