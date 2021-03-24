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
