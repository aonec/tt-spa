import React from 'react';

export interface ReadingInputElem {
  value1: number | null;
  value2?: number | null;
  value3?: number | null;
  value4?: number | null;
}

interface Props {
  readings: ReadingInputElem[];
}

export const ReadingsInput: React.FC<Props> = () => {
  return <>
    
  </>;
};
