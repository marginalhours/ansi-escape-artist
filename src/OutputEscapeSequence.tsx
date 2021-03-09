import React from 'react';

import {EscapeType } from './constants';

import Label from './Label';
import EscapeTypeSelector from './EscapeTypeSelector';

const copyFromInput = (selector: string) => {
    const copyText = document.querySelector(selector) as HTMLInputElement;
    /* Select the text field */
    copyText.select();
    copyText.setSelectionRange(0, 99999); /* For mobile devices */

    /* Copy the text inside the text field */
    document.execCommand("copy");

    (function deselect() {
      var selection = ('getSelection' in window)
        ? window.getSelection()
        : ('selection' in document)
          ? document.selection
          : null;
      if ('removeAllRanges' in selection) selection.removeAllRanges();
      else if ('empty' in selection) selection.empty();
    })();
  }


function OutputEscapeSequence({ transformOptions, transform, escapeType, setEscapeType }) {
    return (
        <>
        <Label text="Output Escape Sequence" />
          <div className="relative mb-2">
            <input
              className="raw-output w-full h-12 font-mono border rounded px-4 py-2 w-full"
              type="text"
              onChange={() => { }}
              value={transform(transformOptions)}
            />
            <div className="absolute top-0 left-0 w-full h-full border rounded w-full h-full" >
              <div className="flex justify-center items-center w-full h-full text-center opacity-0 hover:opacity-100 cursor-pointer" style={{ "backgroundColor": "rgba(224, 231, 255, 0.5)" }} onClick={() => copyFromInput(".raw-output")}>
                <span className="block px-2 bg-white hover:bg-gray-100 border rounded transform active:translate-y-0.5 select-none ">click to copy sequence</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-11 flex flex-row items-center justify-between w-min px-4 pt-.5 bg-white mt-0.5 mr-0.5 border-l">
              <EscapeTypeSelector name="oct" selected={escapeType == EscapeType.Octal} onClick={() => setEscapeType(EscapeType.Octal)} />
              <EscapeTypeSelector name="hex" selected={escapeType == EscapeType.Hex} onClick={() => setEscapeType(EscapeType.Hex)} />
              <EscapeTypeSelector name="uni" selected={escapeType == EscapeType.Unicode} onClick={() => setEscapeType(EscapeType.Unicode)} />
            </div>
          </div>
        </>
    );
}

export default OutputEscapeSequence;