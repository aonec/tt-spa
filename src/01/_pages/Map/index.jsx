import React from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

export const MapPage = () => {
  console.log('Map');
  const [zoom, setZoom] = React.useState(9);
  const mapState = React.useMemo(() => ({
    center: [55.664758, 51.838521],
    zoom: 12,
    controls: ['zoomControl', 'fullscreenControl'],
  }), [
    zoom,
  ]);

  const coordinates = [
    [55.644758, 51.818521],
    [57.654758, 51.828521],
    [55.664758, 51.838521],
    [55.674758, 51.848521],
    [55.645758, 51.817521],
    [57.656758, 51.826521],
    [55.667758, 51.835521],
    [55.678758, 51.844521],
  ];

  return (
    <YMaps>
      <div style={{ width: '100vw', height: '100vh' }}>
        My awesome application with maps!
        <Map
          defaultState={{ center: [55.63, 51.83], zoom: 12, controls: ['zoomControl', 'fullscreenControl'] }}
                    // style={{ width: '100vw', height: '100vh' }}
          width={600}
          height={400}
          modules={['control.ZoomControl', 'control.FullscreenControl']}
          state={mapState}
        >
          {/* 48.763028%2C55.747686&z=13.89 */}
          {coordinates.map((coordinate) => (
            <Placemark
              geometry={coordinate}
              modules={['geoObject.addon.balloon']}
              properties={{ balloonContentBody: 'Информация об объекте' }}
            />
          ))}

        </Map>
        <button onClick={() => setZoom((zoom) => (zoom === 9 ? 12 : 9))}>
          Приблизить карту
        </button>
      </div>
    </YMaps>
  );
};

export default MapPage;

{ /* <Placemark */
}
{ /*  defaultGeometry={[55.63, 51.83]} */
}
{ /*  modules={['geoObject.addon.balloon']} */
}
{ /*  properties={{ */
}
{ /*    balloonContentBody: 'Информация об объекте', */
}
{ /*  }} */
}
{ /* /> */
}
