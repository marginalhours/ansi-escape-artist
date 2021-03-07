import React from 'react';

function Box({ children }) {
    return (
        <div className="user-string bg-white shadow-sm my-2 p-4 rounded">
            {children}
        </div>
    )
}

export default Box;