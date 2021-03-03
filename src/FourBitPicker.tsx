import React, { useState } from 'react';
import { AnsiColour } from './ansiColour';

/**
 * Component for picking a 4-bit colour (one of 8, and bold tweaks the palette)
 */
function FourBitPicker ({ onChange, colours, isBright}) { 
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColourIndex, setSelectedColourIndex] = useState(-1);

    const toggleShowPicker = () => { 
        setShowPicker(!showPicker);
    }

    const handleColorSelect = (event) => {
        const colour = (isBright ? colours.bright : colours.normal)[parseInt(event.target.dataset.index)];
        setSelectedColourIndex(event.target.dataset.index);
        console.log(colour);
        onChange(colour);
    }

    const outerStyles = {} as any;
    if (selectedColourIndex !== -1) {
        outerStyles["backgroundColor"] = (isBright ? colours.bright : colours.normal)[selectedColourIndex].rgb;
    }

    return (
    <div className="inline-block relative h-4 w-8 mt-4 border rounded" onClick={toggleShowPicker}>
        <div className="w-full h-full" style={outerStyles}></div>
        {showPicker && (
            <div className="picker absolute w-min border rounded bg-white flex flex-col"  style={{"zIndex": 1000}} onClick={handleColorSelect}>
                <div className="grid grid-cols-8 p-2 w-max">
                    {(isBright ? colours.bright : colours.normal).map((c, idx) => {
                        const style = {backgroundColor: c.rgb};
                        return (<div key={c.ansi} data-index={idx} className="inline-block h-4 w-8 border" style={style}></div>);
                    })}
                </div>
            </div>
        )}
    </div>
    );
}

export default FourBitPicker;