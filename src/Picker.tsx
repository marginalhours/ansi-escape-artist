import React, { useState } from 'react';
import { AnsiColour } from './ansiColour';

function Picker ({ onChange, colours, selected }) { 
    const [showPicker, setShowPicker] = useState(false);
    const [selectedColour, setSelectedColour] = useState("rgba(0, 0, 0, 0)");

    const toggleShowPicker = () => { 
        setShowPicker(!showPicker);
    }

    const handleColorSelect = (event) => {
        const colour = colours[parseInt(event.target.dataset.index)];
        setSelectedColour(colour.rgb);
        onChange(colour);
    }

    return (
    <div className="inline-block relative h-4 w-8 mt-4 border rounded" onClick={toggleShowPicker}>
        <div className="w-full h-full" style={{backgroundColor: selectedColour}}></div>
        {showPicker && (
            <div className="picker absolute w-48 border rounded bg-white grid grid-cols-8" style={{"zIndex": 1000}} onClick={handleColorSelect}>
                {colours.map((c, idx) => {
                    const style = {backgroundColor: c.rgb};
                    return (<div key={c.ansi} data-index={idx} className="inline-block h-4 w-8" style={style}></div>);
                })}
            </div>
        )}
    </div>
    );
}

export default Picker;