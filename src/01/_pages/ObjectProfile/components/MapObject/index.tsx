import React, { useContext, useMemo, useState } from 'react';
import {
  Map,
  Placemark,
  ZoomControl,
  FullscreenControl,
} from 'react-yandex-maps';
import objectIcon from './object.svg';
import styled from 'styled-components';
import { IconTT } from '../../../../tt-components';
import { ObjectContext } from '../../index';

interface MapObjectInterface {
  object: any;
}

export const MapObject = ({ object }: MapObjectInterface) => {
  const [show, setShow] = useState(false);
  const [zoom, setZoom] = useState(15);
  const { coordinates } = object;
  console.log('object', object);
  const mapState = useMemo(
    () => ({
      center: coordinates,
      // controls: ['zoomControl', 'fullscreenControl'],
      zoom,
    }),
    [zoom]
  );

  if (!coordinates) {
    return null;
  }

  const coordinatesList = [coordinates];

  return (
    <div>
      <ShowHide>
        <IconTT icon={show ? 'off' : 'on'} />
        &nbsp;
        <button onClick={() => setShow((show) => !show)}>
          {show ? 'Скрыть карту' : 'Показать карту'}
        </button>
      </ShowHide>
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
              modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
              properties={
                {
                  // hintContent: 'Информация об объекте',
                  // balloonContentBody: 'Это красивая метка',
                }
              }
              options={{
                iconLayout: 'default#image',
                iconImageHref: `${objectIcon}`,
                iconImageSize: [64, 88],
                iconImageOffset: [-3, -42],
              }}
            />
          ))}
          <FullscreenControl
            options={{ position: { right: 16, top: 16 } }}
            style={{ color: 'red' }}
          />
          <ZoomControl
            options={{ size: 'small', position: { right: 16, bottom: 32 } }}
          />
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
  color: #272f5a;
  display: flex;
  align-items: center;
`;
