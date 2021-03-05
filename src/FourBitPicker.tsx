import React, { useState, useEffect } from 'react';
import { AnsiColour } from './ansiColour';
import { ColourType } from './constants';

interface ColourSet {
    normal: AnsiColour[],
    bright: AnsiColour[]
};

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
 * Component for picking a 4-bit colour (one of 8, and bold tweaks the palette)
 */
function FourBitPicker({ onChange, onReset, colours, isBright, isActive }: { onChange: ChangeCallback, onReset: ResetCallback, colours: ColourSet, isBright: boolean, isActive: boolean }) {
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColourIndex, setSelectedColourIndex] = useState(-1);

    // Update the output colour using onChange() when isBright flips too
    useEffect(() => {
        if (isActive && selectedColourIndex !== -1) {
            const colour = (isBright ? colours.bright : colours.normal)[selectedColourIndex];
            onChange(colour, ColourType.FourBit);
        }
    }, [isBright]);


    const toggleShowPicker = () => {
        setShowPicker(!showPicker);
    }

    const handleColorSelect = (event: React.ChangeEvent<HTMLDivElement>) => {
        event.stopPropagation();
        toggleShowPicker();
        const index = parseInt(event.target.dataset.index as string) as number;
        const colour = (isBright ? colours.bright : colours.normal)[index];
        setSelectedColourIndex(index);
        onChange(colour, ColourType.FourBit);
    }

    const handleReset = (event: React.ChangeEvent<HTMLDivElement>) => {
        event.stopPropagation();
        toggleShowPicker();
        setSelectedColourIndex(-1);
        onReset(ColourType.FourBit);
    }

    const outerStyles = {} as any;
    if (isActive && selectedColourIndex !== -1) {
        outerStyles["backgroundColor"] = (isBright ? colours.bright : colours.normal)[selectedColourIndex].rgb;
    } else {
        outerStyles["backgroundColor"] = "#fefefe";
    }
    
    return (
        <div className="inline-block relative h-4 w-8 mt-4 border rounded" onClick={toggleShowPicker}>
            <div className="w-full h-full rounded relative overflow-hidden" style={outerStyles}>
                {!isActive && <div className="absolute" style={strikeoutStyles}></div>}
            </div>
            {showPicker && (
                <div className="picker absolute w-min border rounded bg-white flex flex-col" style={{ "zIndex": 1000 }} onClick={handleColorSelect}>
                    <div className="grid grid-cols-8 p-2 w-max">
                        <div onClick={handleReset} className="inline-block h-4 w-8 border relative">
                            <div className="absolute" style={strikeoutStyles}></div>
                        </div>
                        {(isBright ? colours.bright : colours.normal).map((c, idx) => {
                            const style = { backgroundColor: c.rgb };
                            return (<div key={`colour-${idx}`} data-index={idx} className="inline-block h-4 w-8 border" style={style}></div>);
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

export default FourBitPicker;