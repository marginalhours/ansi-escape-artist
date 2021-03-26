import { ClearType, MovementType, EscapeType } from '../constants';
import { LANGUAGES, LanguageType } from '../languages';

export interface MovementOptions {
  movementType: MovementType,
  x: number,
  y: number,
  clearType: ClearType,
  languageType: LanguageType,
  escapeType: EscapeType,
};


const transformMovement = (options: MovementOptions): string => {
  const { movementType, languageType, escapeType } = options;

  const language = LANGUAGES[languageType];
  const escape = language.escapes[escapeType];

  if (escape === undefined) { return ""; }

  switch (movementType) {
    case MovementType.None:
      return "";
    case MovementType.LinesRelative:
      return moveLinesRelative(options.y, escape);
    case MovementType.AbsoluteCursor:
      return moveCursorAbsolute(options.x, options.y, escape);
    case MovementType.RelativeCursor:
      return moveCursorRelative(options.x, options.y, escape);
    case MovementType.ScreenClear:
      return clearScreen(options.clearType, escape);
    case MovementType.LineClear:
      return clearLine(options.clearType, escape);
    case MovementType.Scroll:
      return scrollScreen(options.y, escape);
    case MovementType.SaveCursor:
      return saveCursor(escape);
    case MovementType.RestoreCursor:
      return restoreCursor(escape);
    case MovementType.ReportCursor:
      return reportCursor(escape);
    case MovementType.HideCursor:
      return hideCursor(escape);
    case MovementType.ShowCursor:
      return showCursor(escape);
    default:
      console.log(`no match for movement type ${movementType}`)
      return "";
  }
};


const moveCursorRelative = (x: number, y: number, escape: string) => {
  if (x === 0 && y === 0) { return ""; }

  let result = "";

  if (y > 0) {
    result += String.raw`${escape}${y}B`;
  } else if (y < 0) {
    result += String.raw`${escape}${-y}A`;
  }

  if (x > 0) {
    result += String.raw`${escape}${x}C`;
  } else if (x < 0) {
    result += String.raw`${escape}${-x}D`;
  }

  return result;
}

const moveCursorAbsolute = (column: number, row: number, escape: string): string => {
  if (row === 0 && column !== 0) {
    return String.raw`${escape}${column}G`;
  } else {
    return String.raw`${escape}${row};${column}H`;
  }
}

const moveLinesRelative = (y: number, escape: string): string => {
  if (y === 0) { return ""; }

  if (y > 0) {
    return String.raw`${escape}${y}E`;
  } else if (y < 0) {
    return String.raw`${escape}${-y}F`;
  }

  return "";
}

const scrollScreen = (y: number, escape: string): string => {
  if (y === 0) { return ""; }

  if (y > 0) {
    return String.raw`${escape}${y}S`;
  } else if (y < 0) {
    return String.raw`${escape}${-y}T`;
  }

  return "";
}


const clearScreen = (mode: number, escape: string): string => {
  if (mode === ClearType.None) { return ""; }

  return String.raw`${escape}${mode}J`;
}


const clearLine = (mode: number, escape: string): string => {
  if (mode === ClearType.None) { return ""; }

  return String.raw`${escape}${mode}K`;
}


const hideCursor = (escape: string): string => {
  return String.raw`${escape}?25l`;
}


const showCursor = (escape: string): string => {
  return String.raw`${escape}?25h`;
}


const saveCursor = (escape: string): string => {
  return String.raw`${escape}s`;
}


const restoreCursor = (escape: string): string => {
  return String.raw`${escape}u`;
}


const reportCursor = (escape: string): string => {
  return String.raw`${escape}6n`;
}


export default transformMovement;
