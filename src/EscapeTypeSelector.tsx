import React from 'react';

function EscapeTypeSelector({onClick, selected, name}) {

    const unselectedClasses = "m-0.5 cursor-pointer text-sm uppercase font-bold text-gray-200 hover:text-gray-300 bg-white";
    const selectedClasses = "m-0.5 cursor-pointer text-sm uppercase font-bold text-indigo-400 bg-white";

    return (
        <span onClick={onClick} className={selected ? selectedClasses : unselectedClasses}>{name}</span>
    )
}

export default EscapeTypeSelector;