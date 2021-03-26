import React, { useState, FunctionComponent } from 'react';
import Label from './Label';
import Radiobutton from './Radiobutton';

type ScrollScreenProps = {
  onChange: (scrollCount: number) => void 
}

const ScrollScreen: FunctionComponent<ScrollScreenProps> = ({ onChange }) => {

  const [scrollCount, setScrollCount] = useState(0);
  const [direction, setDirection] = useState(-1);

  const handleScrollCountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextScrollCount = parseInt(event.target.value);
    setScrollCount(nextScrollCount);
    onChange(direction * nextScrollCount); 
  }

  const handleDirectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nextDirection = parseInt(event.target.value);
    setDirection(nextDirection);
    onChange(nextDirection * scrollCount); 
  }

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