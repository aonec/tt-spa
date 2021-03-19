import React, { useContext, useMemo, useState } from 'react';
import {Map, Placemark, ZoomControl, FullscreenControl} from 'react-yandex-maps';
import objectIcon from './object.svg';
import styled from 'styled-components'
import {IconTT } from '../../../../tt-components';
import { ObjectContext } from '../../index';

export const MapObject = () => {
  const { object } = useContext(ObjectContext);
  const { coordinates } = object;
  const { latitude, longitude } = coordinates;
  // coordinates: {latitude: 55.810405, longitude: 49.191192}
  const objectCoordinates = [latitude, longitude];
  const [zoom, setZoom] = useState(15);
  const mapState = useMemo(() => ({
    center: objectCoordinates,
    // controls: ['zoomControl', 'fullscreenControl'],
    zoom,
  }),
  [
    zoom,
  ]);
  const coordinatesList = [
    objectCoordinates,
    // [55.664758, 51.838521],
  ];

  const [show, setShow] = useState(false);
  // console.log('show', show);
  return (
    <div>
      <ShowHide><IconTT icon={show ? 'off' : 'on'}/>&nbsp;<button onClick={() => setShow((show) => !show)}>{show ? 'Скрыть карту' : 'Показать карту'}</button></ShowHide>
      <div hidden={!show}>
        <Map
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          width="100%"
          height={360}
          state={mapState}

        >
          {coordinatesList.map((coordinate, index) => (
            <Placemark
              geometry={coordinate}
              modules={[
                'geoObject.addon.balloon',
                'geoObject.addon.hint',
              ]}
              properties={{
                // hintContent: 'Информация об объекте',
                // balloonContentBody: 'Это красивая метка',
              }}
              options={{
                iconLayout: 'default#image',
                iconImageHref: `${objectIcon}`,
                iconImageSize: [64, 88],
                iconImageOffset: [-3, -42],
              }}
            />
          ))}
            <FullscreenControl options={{position : { right: 16, top: 16}}} style={{color: 'red'}}  />
            <ZoomControl options={{ size: 'small',position : { right: 16, bottom: 32}}} />
        </Map>

      </div>
    </div>

  );
};

export default MapObject;

const ShowHide = styled.div`
  padding: 16px 0;
  font-size: 12px;
  line-height: 16px;
  color: #272F5A;
  display: flex;
  align-items: center;
`