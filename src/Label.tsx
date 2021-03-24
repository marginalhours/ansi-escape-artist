import React from 'react';

function Label ({ text } : {text: string}) {
  return (
    <>
      <label className="inline uppercase text-xs font-bold text-blue-900">{text}</label>
      <hr className="bg-gray-200 mb-4"/>
    </>
  )
}

export default Label;