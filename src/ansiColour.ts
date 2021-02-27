export class AnsiColour {
    ansi: string; 
    rgb: string;

    constructor(ansi: string, rgb: string) {
        this.ansi = ansi;
        this.rgb = rgb;
    }
};

// Cf. https://en.wikipedia.org/wiki/ANSI_escape_code

// 4-bit foreground colours
export const FG_4_BIT = [
    // Normal
    new AnsiColour("31", "rgb(222, 56, 43)"),
    new AnsiColour("32", "rgb(57, 181, 74)"),
    new AnsiColour("33", "rgb(255, 199, 6)"),
    new AnsiColour("34", "rgb(0, 111, 184)"),
    new AnsiColour("35", "rgb(118, 38, 113)"),
    new AnsiColour("36", "rgb(44, 181, 233)"),
    new AnsiColour("37", "rgb(204, 204, 204)"),
    // Bright
    new AnsiColour("1;30", "rgb(128, 128, 128)"),
    new AnsiColour("1;31", "rgb(255, 0, 0)"),
    new AnsiColour("1;32", "rgb(0, 255, 0)"),
    new AnsiColour("1;33", "rgb(255, 255, 0)"),
    new AnsiColour("1;34", "rgb(0, 0, 255)"),
    new AnsiColour("1;35", "rgb(255, 0, 255)"),
    new AnsiColour("1;36", "rgb(0, 255, 255)"),
    // White / Black (moved down to bottom)
    new AnsiColour("1;37", "rgb(255, 255, 255)"),
    new AnsiColour("30", "rgb(1, 1, 1)"),
]

// 4-bit background colours
export const BG_4_BIT = [
    // Normal
    new AnsiColour("41", "rgb(222, 56, 43)"),
    new AnsiColour("42", "rgb(57, 181, 74)"),
    new AnsiColour("43", "rgb(255, 199, 6)"),
    new AnsiColour("44", "rgb(0, 111, 184)"),
    new AnsiColour("45", "rgb(118, 38, 113)"),
    new AnsiColour("46", "rgb(44, 181, 233)"),
    new AnsiColour("47", "rgb(204, 204, 204)"),
    // Bright
    new AnsiColour("1;40", "rgb(128, 128, 128)"),
    new AnsiColour("1;41", "rgb(255, 0, 0)"),
    new AnsiColour("1;42", "rgb(0, 255, 0)"),
    new AnsiColour("1;43", "rgb(255, 255, 0)"),
    new AnsiColour("1;44", "rgb(0, 0, 255)"),
    new AnsiColour("1;45", "rgb(255, 0, 255)"),
    new AnsiColour("1;46", "rgb(0, 255, 255)"),
    // White / Black 
    new AnsiColour("1;47", "rgb(255, 255, 255)"),
    new AnsiColour("40", "rgb(1, 1, 1)")
]
