import React, { useEffect, useState } from 'react';
import Label from './Label';
import Radiobutton from './Radiobutton';

function ScrollScreen({ onChange }) {

  const [scrollCount, setScrollCount] = useState(0);
  const [direction, setDirection] = useState(-1);

  const handleScrollCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(event.target.value);
    setScrollCount(v);
  }

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(event.target.value);
    setDirection(v);
  }

  useEffect(() => {
    onChange(direction * scrollCount); 
  }, [scrollCount, direction]);

  return (
    <>
      <Label text="Scroll" />
      <div className="flex flex-row justify-center items-center">
        <span className="mr-2">Scroll screen by</span>
        <input className="inline-block w-12 text-center border-b" type="number" min="0" value={scrollCount} onChange={handleScrollCountChange} />
        <span className="ml-2 mr-6 inline-block ">lines</span>
        <div className="inline-block" onChange={handleDirectionChange}>
          <Radiobutton label="up" name="scrollDirection" value="-1" checked={direction === -1} />
          <Radiobutton label="down" name="scrollDirection" value="1" checked={direction === 1} />
        </div>
      </div>
    </>
  );
}

export default ScrollScreen;