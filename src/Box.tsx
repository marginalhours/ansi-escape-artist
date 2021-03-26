import React, { FunctionComponent} from 'react';

const Box: FunctionComponent = ({ children }) => {
    return (
        <div className="bg-white shadow-sm my-2 p-4 rounded">
            {children}
        </div>
    )
}

export default Box;