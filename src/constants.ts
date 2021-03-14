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
    Clear = 4
};

export enum Direction {
    Up = 0,
    Down = 1,
    Left = 2,
    Right = 3
};

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

export const Escapes = {
    [Language.Python3]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
    [Language.Rust]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u{001b}[`),
    [Language.Golang]: new EscapeSet(String.raw`\033[`, String.raw`\x1b[`, String.raw`\u001b[`),
};

export const CODE_TEMPLATES = {
    [Language.Python3]: `def format(s: str) -> str:\n    return f"{{PREFIX}}{s}{{SUFFIX}}"\n\nif __name__ == "__main__":\n    print(format("{{TEXT}}"))`,
    [Language.Rust]: `fn main(){\n    println!("hello")\n}`
}