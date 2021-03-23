import { ClearType, Escapes, EscapeType, Language, MovementType } from '../constants';

const transformMovement = (options) => {
  const { movementType, language, escapeType } = options;

  const escape = Escapes[language][escapeType];

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
    default:
      console.log(`no match for movement type ${movementType}`)
  }
};

const moveCursorRelative = (x: number, y: number, escape: string) => {
  if (x === 0 && y === 0){ return ""; }

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


const moveLinesRelative = (y: number, escape: string) => {
  if (y === 0) { return ""; }

  if (y > 0) {
    return String.raw`${escape}${y}E`;
  } else if (y < 0) {
    return String.raw`${escape}${-y}F`;
  }
}


const moveCursorAbsolute = (row = null, column = null, escape: string) => {
  if(row === 0 && column === 0) { return ""; }

  if (row === 0) {
    return String.raw`${escape}${column}G`;
  } else {
    return String.raw`${escape}${row};${column}H`;
  }
}


const clearScreen = (mode, escape) => {
  if (mode === ClearType.None) { return ""; }


  return String.raw`${escape}${mode}J`;
}

const scrollScreen = (y: number, escape: string) => {
  if (y === 0) { return 0; }

  if (y > 0){
    return String.raw`${escape}${y}S`;
  } else if (y < 0){
    return String.raw`${escape}${-y}T`;
  }
}

const clearLine = (mode, escape) => {
  if (mode === ClearType.None) { return ""; }
  
  return String.raw`${escape}${mode}K`;
}

const saveCursor = (escape) => {
  return String.raw`${escape}s`;
}

const restoreCursor = (escape) => {
  return String.raw`${escape}u`;
}

const reportCursor = (escape) => {
  return String.raw`${escape}6n`;
}


export default transformMovement;