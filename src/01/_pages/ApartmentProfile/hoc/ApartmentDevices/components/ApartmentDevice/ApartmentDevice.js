import React from 'react';
import './ApartmentDevice.css';
import twitterLogo from 'public/icons/ColdWaterSupply.svg'
// import '../../../../../../../icomoon/style.css';
import 'icomoon/style.css';

export function ApartmentDevice() {


  return (
    <div className='wrap'>
      <div className='top'>
      <div className='icon-drop'></div>
      <h2 className='name'>СГВ-5</h2>
      <p className='number'>(123456789)</p>
      </div>
      <div className='bottom'>
      <div className='icon-green'></div>
      <h4 className='state'>Активен</h4>
      <p className='dates'>01.09.2017 — 01.09.2024</p>
      <p className='place'>Туалет</p>
      </div>
    </div>
  )
}

