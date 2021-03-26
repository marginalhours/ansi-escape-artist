import React, { FunctionComponent } from 'react';

import { EscapeType } from './constants';
import { ColourOptions} from './transforms/colour';
import { MovementOptions } from './transforms/movement';
import { copyFromInput } from './copyUtils';

import { LANGUAGES } from './languages'; 
import Label from './Label';
import EscapeTypeSelector from './EscapeTypeSelector';

type OutputEscapeSequenceProps = {
  transformOptions: ColourOptions | MovementOptions,
  transform: ((options: ColourOptions) => string) | ((options: MovementOptions) => string), 
  escapeType: EscapeType,
  setEscapeType: (type: EscapeType) => void, 
}


const OutputEscapeSequence: FunctionComponent<OutputEscapeSequenceProps> = ({ transformOptions, transform, escapeType, setEscapeType }) => {
    const { languageType } = transformOptions; 
    const hasHex = LANGUAGES[languageType].escapes[EscapeType.Hex] !== undefined;
    const hasOct = LANGUAGES[languageType].escapes[EscapeType.Octal] !== undefined; 
    const hasUni = LANGUAGES[languageType].escapes[EscapeType.Unicode] !== undefined; 

    return (
      <div className="bg-white shadow-sm my-2 p-4 rounded border border-blue-600 border-opacity-30">
        <Label text="Escape Sequence" />
          <span className="text-gray-400 my-2 block">The final escape sequence will appear in this box.</span>
          <div className="relative mb-2">
            <input
              className="raw-output h-12 font-mono border rounded px-4 py-2 w-full"
              type="text"
              onChange={() => { }}
              // @ts-ignore
              value={transform(transformOptions)}
            />
            <div className="absolute top-0 left-0 w-full h-full border rounded w-full h-full" >
              <div className="flex justify-center items-center w-full h-full text-center opacity-0 hover:opacity-100 cursor-pointer" style={{ "backgroundColor": "rgba(224, 231, 255, 0.5)" }} onClick={(event) => copyFromInput(".raw-output", event)}>
                <span className="block px-2 bg-white hover:bg-gray-100 border rounded transform active:translate-y-0.5 select-none ">click to copy</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-11 flex flex-row items-center justify-between w-min px-4 pt-.5 bg-white mt-0.5 mr-0.5 border-l">
              {hasHex && <EscapeTypeSelector name="hex" selected={escapeType == EscapeType.Hex} onClick={() => setEscapeType(EscapeType.Hex)} />}
              {hasOct && <EscapeTypeSelector name="oct" selected={escapeType == EscapeType.Octal} onClick={() => setEscapeType(EscapeType.Octal)} />}
              {hasUni && <EscapeTypeSelector name="uni" selected={escapeType == EscapeType.Unicode} onClick={() => setEscapeType(EscapeType.Unicode)} />}
            </div>
          </div>
        </div>
    );
}

export default OutputEscapeSequence;