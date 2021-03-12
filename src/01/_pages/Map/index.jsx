import React, { useMemo, useState } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { ButtonTT } from '../../tt-components'
import img from './electro.png'
// background-image: url(${img});

export const MapPage = () => {
    const [zoom, setZoom] = useState(12)
    const mapState = useMemo(() => ({ center: [55.664758, 51.838521], zoom }), [
        zoom,
    ])

    const coordinates = [
        [55.644758, 51.818521],
        [57.654758, 51.828521],
        [55.664758, 51.838521],
        [55.674758, 51.848521],
        [55.645758, 51.817521],
        [57.656758, 51.826521],
        [55.667758, 51.835521],
        [55.678758, 51.844521],
    ]

    return (
        <YMaps>
            <div style={{ width: '100vw', height: '100vh' }}>
                My awesome application with maps!
                <Map
                    defaultState={{
                        center: [55.664758, 51.838521],
                        zoom: 9,
                        controls: ['zoomControl', 'fullscreenControl'],
                    }}
                    // defaultState={{ center: [55.63, 51.83], zoom: 12, controls: ['zoomControl', 'fullscreenControl'] }}
                    // style={{ width: '100vw', height: '100vh' }}
                    width={600}
                    height={400}
                    modules={[
                        'control.ZoomControl',
                        'control.FullscreenControl',
                    ]}
                    state={mapState}
                >
                    {/* 48.763028%2C55.747686&z=13.89 */}
                    {coordinates.map((coordinate, index) => (
                        <Placemark
                            geometry={coordinate}
                            modules={[
                                'geoObject.addon.balloon',
                                'geoObject.addon.hint',
                            ]}
                            properties={{
                                hintContent: `Номер задачи ${index + 1}`,
                                balloonContentBody: 'Это красивая метка',
                            }}
                            options={{
                                iconLayout: 'default#image',
                                iconImageHref: `${img}`,
                                iconImageSize: [64, 88],
                                iconImageOffset: [-3, -42],
                            }}
                        />
                    ))}
                </Map>
                <ButtonTT
                    color="blue"
                    onClick={() => setZoom((zoom) => (zoom === 12 ? 15 : 12))}
                >
                    Приблизить карту
                </ButtonTT>
            </div>
        </YMaps>
    )
}

export default MapPage

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
