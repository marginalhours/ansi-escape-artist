import React from 'react';

function Box({ children }) {
    return (
        <div className="bg-white shadow-sm my-2 p-4 rounded">
            {children}
        </div>
    )
}

export default Box;