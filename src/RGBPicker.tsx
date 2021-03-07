import React, { useState, useEffect, useRef } from 'react';
import { AnsiColour } from './ansiColour';
import { ColourType } from './constants';

import { useComponentVisible } from './hooks';
import Triangle from './Triangle';

interface ColourSet {
  normal: AnsiColour[],
  bright: AnsiColour[]
};

const strikeoutStyles = {
  "width": "200%",
  "height": "1px",
  "transform": "rotate(45deg)",
  "transformOrigin": "0% 0%",
  "top": "-1px",
  "left": "0px"
}

type ChangeCallback = (a: AnsiColour, b: ColourType) => void;
type ResetCallback = (a: ColourType) => void;

/**
 * Component for picking an RGB colour
 */
function RGBPicker({ onChange, onReset, isActive }: { onChange: ChangeCallback, onReset: ResetCallback, isActive: boolean }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [selectedColour, setSelectedColour] = useState<AnsiColour | null>(null);

  const toggleShowPicker = () => {
    setIsComponentVisible(!isComponentVisible);
  }

  const outerStyles = {} as any;
  if (isActive && selectedColour !== null) {
    outerStyles["backgroundColor"] = selectedColour.rgb;
  } else {
    outerStyles["backgroundColor"] = "#fefefe";
  }

  return (
    <div ref={ref} className="inline-block relative h-6 w-6 mt-4 border rounded cursor-pointer" onClick={toggleShowPicker}>
      <div className="w-full h-full rounded relative overflow-hidden" style={outerStyles}>
        {!isActive && <div className="absolute bg-indigo-300" style={strikeoutStyles}></div>}
      </div>
      {isComponentVisible && (
        <div className="picker absolute top-8 h-min w-min border rounded bg-white flex flex-col cursor-default" style={{ zIndex: 1000, boxShadow: "rgb(0 0 0 / 25%) 0px 1px 4px" }} >
          <Triangle top={-10} left={5} />
          <input type="color" />
        </div>
      )}
    </div>
  );
}

export default RGBPicker;