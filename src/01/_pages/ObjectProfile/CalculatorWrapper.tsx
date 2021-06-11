import { NavLink } from 'react-router-dom';
import React from 'react';

interface CalculatorWrapperInterface {
  id: number | undefined;
  children: React.ReactNode;
}

export const CalculatorWrapper: React.FC<CalculatorWrapperInterface> = ({
  id,
  children,
}) => {
  if (typeof id === 'number')
    return <NavLink to={`/calculators/${id}`}>{children}</NavLink>;
  return <div>{children}</div>;
};
