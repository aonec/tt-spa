import React from 'react';
import { Map } from 'react-yandex-maps';

export const ObjectMapsContainer = () => {
  return (
    <Map
      defaultState={{ center: [55.63, 51.82], zoom: 15 }}
      width={window.screen.width - 210}
      height={window.screen.height - 195}
    />
  );
};

