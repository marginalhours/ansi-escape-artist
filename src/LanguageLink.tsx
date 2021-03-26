import React, {FunctionComponent} from 'react';
import { LanguageType } from './languages';

type LanguageLinkProps = {
    languageName: string,
    language: LanguageType,
    selected: boolean,
    handleClick: (language: LanguageType) => void
}

const LanguageLink: FunctionComponent<LanguageLinkProps> =  ({languageName, language, selected, handleClick}) => {    
    let classes = "cursor-pointer inline-block text-white hover:bg-gray-700 active:bg-gray-800 w-full px-3 py-1 rounded";

    if (selected) {
        classes += " font-bold";
    }
    
    return (<span className={classes} onClick={() => handleClick(language)}>
                {languageName}
                {selected && <span className="ml-2">✓</span>}
            </span>)
}

export default LanguageLink;