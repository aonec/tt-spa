import React from 'react';

import {store} from '01/App/App'

export const Demo = () => {
  const a = 'test';
  const buttonHandler = () => {
      
      console.log("buttonHandlers")
      console.log(store.getState())
  }
  return (
    <div><button onClick={buttonHandler}>buttonHandler</button></div>
  );
};

export default Demo;
