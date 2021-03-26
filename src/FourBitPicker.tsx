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
 * Component for picking a 4-bit colour (one of 8, and bold tweaks the palette)
 */
function FourBitPicker({ onChange, onReset, colours, isBright, isActive }: { onChange: ChangeCallback, onReset: ResetCallback, colours: ColourSet, isBright: boolean, isActive: boolean }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [selectedColourIndex, setSelectedColourIndex] = useState(-1);

  // Update the output colour using onChange() when isBright flips too
  useEffect(() => {
    if (selectedColourIndex !== -1) {
      const colour = (isBright ? colours.bright : colours.normal)[selectedColourIndex];
      if (isActive) {
        onChange(colour, ColourType.FourBit);
      }
    }
  }, [isBright, selectedColourIndex]);

  const toggleShowPicker = () => {
    setIsComponentVisible(!isComponentVisible);
  }

  const handleColorSelect = (event: React.MouseEvent<HTMLDivElement>) => {
    const t = event.target as HTMLDivElement;
    event.stopPropagation();
    toggleShowPicker();
    const index = parseInt(t.dataset.index as string) as number;
    const colour = (isBright ? colours.bright : colours.normal)[index];
    setSelectedColourIndex(index);
    onChange(colour, ColourType.FourBit);
  }

  const handleReset = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleShowPicker();
    setSelectedColourIndex(-1);
    onReset(ColourType.FourBit);
  }

  const getColours = () => {
    return (isBright ? colours.bright : colours.normal).map((c, idx) => {
      const style = { backgroundColor: c.rgb, boxShadow: ""};
      if (idx == selectedColourIndex) { style.boxShadow = `${c.rgb} 0px 0px 4px`; }
      return (<div key={`colour-${idx}`} data-index={idx} className="inline-block mx-0.5 h-6 w-6 rounded cursor-pointer" style={style} onClick={handleColorSelect}></div>);
    });
  }

  const outerStyles = {} as any;
  if (isActive && selectedColourIndex !== -1) {
    outerStyles["backgroundColor"] = (isBright ? colours.bright : colours.normal)[selectedColourIndex].rgb;
  } else {
    outerStyles["backgroundColor"] = "#fefefe";
  }

  return (
    <div ref={ref} className="inline-block relative h-6 w-6 mt-4 border rounded cursor-pointer" onClick={toggleShowPicker}>
      <div className="w-full h-full rounded relative overflow-hidden" style={outerStyles}>
        {!isActive && <div className="absolute bg-blue-300" style={strikeoutStyles}></div>}
      </div>
      {isComponentVisible && (
        <div className="picker absolute top-8 -left-1 h-min w-min border rounded bg-white flex flex-col cursor-default" style={{ zIndex: 1000, boxShadow: "rgb(0 0 0 / 25%) 0px 1px 4px" }} >
          <Triangle top={-10} left={5} />
          <div className="grid grid-cols-9 p-2 w-max">
            {getColours()}
            <div onClick={handleReset} className="inline-block h-6 w-6 mx-0.5 border rounded relative overflow-hidden cursor-pointer" title="clear">
              <div className="absolute bg-blue-300" style={strikeoutStyles}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FourBitPicker;