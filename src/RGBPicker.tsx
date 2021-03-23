import React, { useState } from 'react';
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
function RGBPicker({ onChange, onReset, isActive, isForeground }: { onChange: ChangeCallback, onReset: ResetCallback, isActive: boolean, isForeground: boolean }) {
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  const escape = isForeground ? [38, 2] : [48, 2];
  const c = new AnsiColour([...escape, 127, 127, 127], `rgb(127, 127, 127)`, false);

  const [selectedColour, setSelectedColour] = useState<AnsiColour | null>(c);
  const [r, setR] = useState(127);
  const [g, setG] = useState(127);
  const [b, setB] = useState(127);

  const showPicker = () => {
    setIsComponentVisible(true);
  }

  const outerStyles = {} as any;
  if (isActive && selectedColour !== null) {
    outerStyles["backgroundColor"] = selectedColour.rgb;
  } else {
    outerStyles["backgroundColor"] = "#fefefe";
  }

  const handleRChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    try {
      const newR = parseInt(event.target.value) || 0;
      setR(newR);
      recalculateColour(newR, g, b);
    } catch {}
  }

  const handleGChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    try {
      const newG = parseInt(event.target.value) || 0;
      setG(newG);
      recalculateColour(r, newG, b);
    } catch {}

  }

  const handleBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    try {
      const newB = parseInt(event.target.value) || 0;
      setB(newB);
      recalculateColour(r, g, newB);
    } catch {}
  }

  const recalculateColour = (r_, g_, b_) => {
    const escape = isForeground ? [38, 2] : [48, 2];
    const c = new AnsiColour([...escape, r_, g_, b_], `rgb(${r_}, ${g_}, ${b_})`, false);
    setSelectedColour(c);
    onChange(c, ColourType.RGB);
  };

  return (
    <div ref={ref} className="inline-block relative h-6 w-6 mt-4 border rounded cursor-pointer" onClick={showPicker}>
      <div className="w-full h-full rounded relative overflow-hidden" style={outerStyles}>
        {!isActive && <div className="absolute bg-indigo-300" style={strikeoutStyles}></div>}
      </div>
      {isComponentVisible && (
        <div className="picker absolute top-8 -left-1 h-min w-min rounded bg-white flex flex-col cursor-default" style={{ zIndex: 1000, boxShadow: "rgb(0 0 0 / 25%) 0px 1px 4px" }} >
          <Triangle top={-10} left={6} color={selectedColour?.rgb} />
          <div className="flex flex-col w-min justify-center items-center h-24 rounded">
            <div className="h-1/2 w-full rounded-t cursor-pointer" style={{ backgroundColor: selectedColour?.rgb }} onClick={() => recalculateColour(r, g, b)}></div>
            <div className="h-1/2 flex flex-row p-2">
              <div className="w-1/3 flex flex-col justify-center items-center mx-0.5">
                <label className="text-xs text-gray-400 inline-block text-left w-full">R</label>
                <input className="inline-block w-12 text-center border-b" type="number" max={255} min={0} value={r} onChange={handleRChange} />
              </div>
              <div className="w-1/3 flex flex-col justify-center items-center mx-0.5">
                <label className="text-xs text-gray-400 inline-block text-left w-full">G</label>
                <input className="inline-block w-12 text-center border-b" type="number" max={255} min={0} value={g} onChange={handleGChange} />
              </div>
              <div className="w-1/3 flex flex-col justify-center items-center mx-0.5">
                <label className="text-xs text-gray-400 inline-block text-left w-full">B</label>
                <input className="inline-block w-12 text-center border-b" type="number" max={255} min={0} value={b} onChange={handleBChange} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RGBPicker;