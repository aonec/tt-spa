import React from 'react';

const AddCalculatorContext = React.createContext();

export const AddCalculatorProvider = ({ children }) => {
  const test = 'test';
  return (
    <AddCalculatorContext.Provider value={{}}>
      {children}
    </AddCalculatorContext.Provider>
  );
};

export default AddCalculatorProvider;
