import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';


export const MapPage = () => {
  console.log("Map")
  return (
    <YMaps>
      <div style={{width: '100vw', height: '100vh'}}>
        My awesome application with maps!
        <Map defaultState={{ center: [55.75, 48.57], zoom: 7 }} />
      </div>
    </YMaps>
  )
}

export default MapPage