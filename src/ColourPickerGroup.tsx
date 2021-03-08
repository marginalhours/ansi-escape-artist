import React from 'react';

import FourBitPicker from './FourBitPicker';
import EightBitPicker from './EightBitPicker';
import RGBPicker from './RGBPicker';

import { ColourType } from './constants';
import { BG_4_BIT, BG_8_BIT, FG_4_BIT, FG_8_BIT } from './ansiColour';


function ColourPickerGroup({ title, handleChange, handleReset, isBright, isForeground, activeColourType }) {
  const labelClasses = "inline uppercase text-xs text-gray-400";
  const activeLabelClasses = "inline uppercase text-xs text-gray-600";

  const fourBitColours = isForeground ? FG_4_BIT : BG_4_BIT;
  const eightbitColours = isForeground ? FG_8_BIT : BG_8_BIT;

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
            isActive={activeColourType === ColourType.FourBit} />
          <label className={activeColourType === ColourType.FourBit ? activeLabelClasses : labelClasses}>4-bit</label>
        </div>
        <div className="mx-4 flex flex-col items-center">
          <EightBitPicker
            onChange={handleChange}
            onReset={handleReset}
            colours={eightbitColours}
            isActive={activeColourType === ColourType.EightBit} />
          <label className={activeColourType === ColourType.EightBit ? activeLabelClasses : labelClasses}>8-bit</label>
        </div>
        <div className="mx-4 flex flex-col items-center">
          <RGBPicker
            onChange={handleChange}
            onReset={handleReset}
            isActive={activeColourType === ColourType.RGB}
            isForeground={isForeground}
          />
          <label className={activeColourType === ColourType.RGB ? activeLabelClasses : labelClasses}>RGB</label>
        </div>
      </div>
    </div>
  );
}

export default ColourPickerGroup;