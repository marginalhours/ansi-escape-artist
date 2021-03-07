import React from 'react';


const shadowStyle = {
    width: "0px",
    height: "0px",
    borderStyle: "solid",
    borderWidth: "0px 9px 10px",
    borderColor: "transparent transparent rgba(0, 0, 0, 0.1)",
}

const triangleStyle = {
    width: "0px", 
    height: "0px", 
    borderStyle: "solid", 
    borderWidth: "0px 9px 10px", 
    borderColor: "transparent transparent rgb(255, 255, 255)",
}

function Triangle({top, left}: {top: number, left: number}){
    return (<>
                <div className="absolute" style={{...shadowStyle, top: `${top - 1}px`, left: `${left}px`}}></div>
                <div className="absolute" style={{...triangleStyle, top: `${top}px`, left: `${left}px` }}></div>
            </>
    );
}

export default Triangle; 