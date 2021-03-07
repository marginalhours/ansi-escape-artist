import React, { useState } from 'react';
import { AnsiColour } from './ansiColour';
import { ColourType } from './constants';

import { useComponentVisible } from './hooks';
import Triangle from './Triangle';


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
 * Component for picking an 8-bit colour
 */
function EightBitPicker({ onChange, onReset, colours, isActive }: { onChange: ChangeCallback, onReset: ResetCallback, colours: AnsiColour[], isActive: boolean }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const [selectedColourIndex, setSelectedColourIndex] = useState(-1);

  const toggleShowPicker = () => {
    setIsComponentVisible(!isComponentVisible);
  }

  const handleColorSelect = (event: React.ChangeEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleShowPicker();
    const index = parseInt(event.target.dataset.index as string) as number;
    const colour = colours[index];
    setSelectedColourIndex(index);
    onChange(colour, ColourType.EightBit);
  }

  const handleReset = (event: React.ChangeEvent<HTMLDivElement>) => {
    event.stopPropagation();
    toggleShowPicker();
    setSelectedColourIndex(-1);
    onReset(ColourType.EightBit);
  }

  const outerStyles = {} as any;
  if (isActive && selectedColourIndex !== -1) {
    outerStyles["backgroundColor"] = colours[selectedColourIndex].rgb;
  } else {
    outerStyles["backgroundColor"] = "#fefefe";
  }

  return (
    <div ref={ref} className="inline-block relative h-6 w-6 mt-4 border rounded cursor-pointer" onClick={toggleShowPicker}>
      <div className="w-full h-full rounded relative overflow-hidden" style={outerStyles}>
        {!isActive && <div className="absolute bg-indigo-300" style={strikeoutStyles}></div>}
      </div>
      {isComponentVisible && (
        <div className="picker absolute top-8 -left-1 w-min border rounded bg-gray-50 flex flex-col cursor-default" style={{ "zIndex": 1000 }} >
          <Triangle top={-10} left={5} />
          <div className="grid p-2 w-max" style={{ "gridTemplateColumns": "repeat(24, minmax(0, 1fr))" }}>
            {colours.map((c, idx) => {
              const style = { backgroundColor: c.rgb };
              if (idx == selectedColourIndex) { style.boxShadow = `${c.rgb} 0px 0px 4px`; }
              return (<div key={`colour-${idx}`} data-index={idx} className="inline-block m-0.5 h-6 w-6 rounded cursor-pointer" style={style} onClick={handleColorSelect}></div>);
            })}
            <div onClick={handleReset} className="inline-block m-0.5 h-6 w-6 border relative overflow-hidden rounded cursor-pointer">
              <div className="absolute bg-indigo-300" style={strikeoutStyles}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EightBitPicker;