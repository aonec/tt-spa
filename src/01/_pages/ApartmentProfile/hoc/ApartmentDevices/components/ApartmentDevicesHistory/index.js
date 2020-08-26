import React from "react";

export function ApartmentDevicesHistory() {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: '10fr 2fr'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline'
      }}><p className='icon-list'

      ></p><span style={{
        paddingLeft:' 4px'
      }}>История показаний</span></div>
      <button className='icon-menu'
              style={{
                border: "1px solid #DCDEE4",
                boxSizingizing: 'border-box',
                bordeRadius: '4px',
                width: '32px',
                height: '32px'
              }}></button>
    </div>
  )
}