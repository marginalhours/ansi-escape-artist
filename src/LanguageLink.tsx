import React from 'react';

function LanguageLink({languageName, language, selected, handleClick}) {    
    let classes = "cursor-pointer inline-block text-white hover:bg-gray-600 active:bg-gray-700 w-full px-3 py-1 rounded";

    if (selected) {
        classes += " font-bold";
    }
    
    return (<span className={classes} href="#" onClick={() => handleClick(language)}>
                {languageName}
                {selected && <span className="ml-2">✓</span>}
            </span>)
}

export default LanguageLink;