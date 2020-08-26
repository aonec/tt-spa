import React from 'react';
import './ApartmentInput.css';
import 'icomoon/style.css';

export function ApartmentInput() {

  return (
    <div className='input__wrap'>
      <div className='row'>
        <h4 className='plan'>Тариф 1</h4>
        <input className='input' placeholder='123 м3'/>
      </div>
      <div className='row'>
        <h4 className='plan'>Тариф 1</h4>
        <input className='input' placeholder='123 м3'/>
      </div>
    </div>
  )
}

