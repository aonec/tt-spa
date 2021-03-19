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
  const mapState = useMemo(() => ({
    center: objectCoordinates,
    controls: ['zoomControl', 'fullscreenControl'],
    zoom,
  }),
  [
    zoom,
  ]);
  const coordinatesList = [
    objectCoordinates,
    // [55.664758, 51.838521],
  ];

  const [state, setState] = useState(false);
  console.log('state', state);
  return (
    <div>
      <button onClick={() => setState((state) => !state)}>Скрыть карту</button>
      <div hidden={state}>
        <Map
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          width="100%"
          height={240}
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

      </div>
    </div>

  );
};

export default MapObject;

{ /* <ButtonTT */ }
{ /*  color="blue" */ }
{ /*  onClick={() => setZoom((zoom) => (zoom === 12 ? 15 : 12))} */ }
{ /* > */ }
{ /*  Приблизить карту */ }
{ /* </ButtonTT> */ }
{ /* </YMaps> */ }

// defaultState={{
//   center: objectCoordinates,
//   zoom: 15,
//   controls: ['zoomControl', 'fullscreenControl'],
// }}

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
