import React, { FC } from 'react';
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';
import { Wrapper, ZoomButton } from './MapZoomControl.styled';
import { MapZoomControlProps } from './MapZoomControl.types';

export const MapZoomControl: FC<MapZoomControlProps> = ({ map }) => {
  const handlePlus = () => {
    map.setZoom(map.getZoom() + 1, { duration: 300 });
  };

  const handleMinus = () => {
    map.setZoom(map.getZoom() - 1, { duration: 300 });
  };

  return (
    <Wrapper>
      <ZoomButton onClick={handlePlus}>
        <PlusCircle />
      </ZoomButton>
      <ZoomButton onClick={handleMinus}>
        <DashCircle />
      </ZoomButton>
    </Wrapper>
  );
};
