import React, { useState } from 'react';
import { AnsiColour } from './ansiColour';
import { ColourType } from './constants';


const strikeoutStyles = {
    "width": "100%",
    "height": "1px",
    "background": "rgba(255, 0, 0, 0.5)",
    "transform": "rotate(20deg)",
    "top": "6px"
}

type ChangeCallback = (a: AnsiColour, b: ColourType) => void;
type ResetCallback = (a: ColourType) => void;


/**
 * Component for picking an 8-bit colour
 */
function EightBitPicker ({ onChange, onReset, colours, isActive } : {  onChange: ChangeCallback, onReset: ResetCallback, colours: AnsiColour[], isActive: boolean}) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColourIndex, setSelectedColourIndex] = useState(-1);

    const toggleShowPicker = () => { 
        setShowPicker(!showPicker);
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
        <div className="inline-block relative h-4 w-8 mt-4 border rounded" onClick={toggleShowPicker}>
            <div className="w-full h-full rounded relative overflow-hidden" style={outerStyles}>
                {!isActive && <div className="absolute w-full" style={strikeoutStyles}></div>}
            </div>
            {showPicker && (
                <div className="picker absolute w-min border rounded bg-white flex flex-col"  style={{"zIndex": 1000}} onClick={handleColorSelect}>
                    <div className="grid p-2 w-max" style={{"gridTemplateColumns": "repeat(24, minmax(0, 1fr))"}}>
                        {colours.map((c, idx) => {
                            const style = {backgroundColor: c.rgb};
                            return (<div key={`colour-${idx}`} data-index={idx} className="inline-block h-4 w-8 border" style={style}></div>);
                        })}
                        <div onClick={handleReset} className="inline-block h-4 w-8 border relative">
                            <div className="absolute" style={strikeoutStyles}></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        ); 
}

export default EightBitPicker;