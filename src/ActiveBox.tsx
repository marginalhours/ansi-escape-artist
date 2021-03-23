import React from 'react';

function ActiveBox({ children, isActive, setActive }) {

    const classNames = isActive ? "transition-all duration-300 relative left-3 bg-white shadow-sm my-2 p-4 rounded-tr rounded-br border-l border-indigo-500 border-l-22" : "relative left-0 bg-white shadow-sm my-2 p-4 rounded-tr rounded-br opacity-25 cursor-pointer"

    const handleClick = () => {
        if(!isActive){
            setActive();
        }
    }

    return (
        <div className={classNames} onClick={handleClick}>
            {children}
        </div>
    )
}

export default ActiveBox;