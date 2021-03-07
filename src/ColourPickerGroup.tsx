import React from 'react';

import FourBitPicker from './FourBitPicker';
import EightBitPicker from './EightBitPicker';
import RGBPicker from './RGBPicker';

import { ColourType } from './constants';


function ColourPickerGroup({title, handleChange, handleReset, fourBitColours, eightbitColours, isBright, activeColourType}) {
    const labelClasses = "inline uppercase text-xs text-gray-400";
    const activeLabelClasses = "inline uppercase text-xs text-gray-600";

return (
    <div className="w-1/2 flex flex-row items-center justify-center">
        <label className="text-sm">{title}</label>
        <div className="flex flex-row"> 
            <div className="mx-4 flex flex-col items-center">
                <FourBitPicker 
                    onChange={handleChange} 
                    onReset={handleReset} 
                    colours={fourBitColours} 
                    isBright={isBright} 
                    isActive={activeColourType === ColourType.FourBit}/>
                <label className={activeColourType === ColourType.FourBit ? activeLabelClasses : labelClasses}>4-bit</label> 
            </div>
            <div className="mx-4 flex flex-col items-center"> 
                <EightBitPicker 
                    onChange={handleChange} 
                    onReset={handleReset} 
                    colours={eightbitColours} 
                    isActive={activeColourType === ColourType.EightBit}/>
                <label className={activeColourType === ColourType.EightBit ? activeLabelClasses : labelClasses}>8-bit</label>
            </div>
            <div className="mx-4 flex flex-col items-center">
                <RGBPicker />
                <label className={activeColourType === ColourType.RGB ? activeLabelClasses : labelClasses}>RGB</label>
            </div>
        </div>
    </div>
);
}

export default ColourPickerGroup;