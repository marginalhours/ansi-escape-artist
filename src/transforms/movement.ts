import { Escapes, EscapeType, Language, MovementType } from '../constants';

const transformMovement = (options) => {
  const { movementType, language, escapeType } = options;
  console.log(options);

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
  }
};

const moveCursorRelative = (x: number, y: number, escape: string) => {
  if (x === 0 && y === 0){ return ""; }

  let result = "";

  if (y < 0) {
    result += String.raw`${escape}${-y}A`;
  } else if (y > 0) {
    result += String.raw`${escape}${y}B`;
  }

  if (x > 0) {
    result += String.raw`${escape}${x}C`;
  } else if (x > 0) {
    result += String.raw`${escape}${-x}D`;
  }

  return result;
}


const moveLinesRelative = (y: number, escape: string) => {
  if (y === 0) { return ""; }

  if (y < 0) {
    return String.raw`${escape}${-y}E`;
  } else if (y > 0) {
    return String.raw`${escape}${y}F`;
  }
}


const moveCursorAbsolute = (row = null, column = null, escape: string) => {
  if(row === 0 && column === null) { return ""; }

  if (row === null) {
    return String.raw`${escape}${column}G`;
  } else {
    return String.raw`${escape}${row};${column}H`;
  }
}


const clearScreen = (mode) => {
  return String.raw`${escape}${mode}J`;
}


const clearLine = (mode) => {
  return String.raw`${escape}${mode}K`;
}


export default transformMovement;