import React from 'react';
import {ApartmentDevice} from './components/ApartmentDevice'
import {ApartmentInput} from './components/ApartmentInput'

export const ApartmentDevices = () => {
  return (
    <>
      <h2>Компонент Приборы Учета</h2>
      <ApartmentDevice/>
      <ApartmentInput />
    </>
  )
}