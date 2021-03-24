import React from 'react';

function ActiveBox({ children, isActive, setActive }) {

    const classNames = isActive ? "transition-all duration-300 relative left-1 bg-white shadow-sm my-2 p-4 rounded" : "relative -left-2 bg-white shadow-sm my-2 p-4 rounded opacity-25 cursor-pointer"

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