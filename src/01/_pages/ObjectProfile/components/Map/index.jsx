import React, { useContext, useMemo, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import objectIcon from './object.svg';
import { ButtonTT } from '../../../../tt-components';
import { ObjectContext } from '../../index';
// background-image: url(${img});

export const MapObject = () => {
  const { object } = useContext(ObjectContext);
  const { coordinates } = object;
  const { latitude, longitude } = coordinates;
  // coordinates: {latitude: 55.810405, longitude: 49.191192}
  const objectCoordinates = [latitude, longitude];
  const [zoom, setZoom] = useState(15);
  const mapState = useMemo(() => ({ center: objectCoordinates, zoom }), [
    zoom,
  ]);

  const coordinatesList = [
    objectCoordinates,
    // [55.664758, 51.838521],
    // [57.654758, 51.828521],
    // [55.664758, 51.838521],
    // [55.674758, 51.848521],
    // [55.645758, 51.817521],
    // [57.656758, 51.826521],
    // [55.667758, 51.835521],
    // [55.678758, 51.844521],
  ];

  const [state, setState] = useState(false);
  console.log('state', state);
  return (
    <div>
      <button onClick={() => setState((state) => !state)}>Скрыть карту</button>
      <div hidden={state}>
        <YMaps>
          <Map
            defaultState={{
              center: [55.664758, 51.838521],
              zoom: 9,
              controls: ['zoomControl', 'fullscreenControl'],
            }}
                  // defaultState={{ center: [55.63, 51.83], zoom: 12, controls: ['zoomControl', 'fullscreenControl'] }}
                  // style={{ width: '100vw', height: '100vh' }}
            width="100%"
            height={240}
            modules={[
              'control.ZoomControl',
              'control.FullscreenControl',
            ]}
            state={mapState}
          >
            {/* 48.763028%2C55.747686&z=13.89 */}
            {coordinatesList.map((coordinate, index) => (
              <Placemark
                geometry={coordinate}
                modules={[
                  'geoObject.addon.balloon',
                  'geoObject.addon.hint',
                ]}
                properties={{
                  hintContent: 'Информация об объекте',
                  balloonContentBody: 'Это красивая метка',
                }}
                options={{
                  iconLayout: 'default#image',
                  iconImageHref: `${objectIcon}`,
                  iconImageSize: [64, 88],
                  iconImageOffset: [-3, -42],
                }}
              />
            ))}
          </Map>
          {/* <ButtonTT */}
          {/*  color="blue" */}
          {/*  onClick={() => setZoom((zoom) => (zoom === 12 ? 15 : 12))} */}
          {/* > */}
          {/*  Приблизить карту */}
          {/* </ButtonTT> */}
        </YMaps>
      </div>
    </div>

  );
};

export default MapObject;

{
  /* <Placemark */
}
{
  /*  defaultGeometry={[55.63, 51.83]} */
}
{
  /*  modules={['geoObject.addon.balloon']} */
}
{
  /*  properties={{ */
}
{
  /*    balloonContentBody: 'Информация об объекте', */
}
{
  /*  }} */
}
{
  /* /> */
}
