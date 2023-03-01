import React, { FC } from 'react';
import { Wrapper } from './TasksMapView.styled';
import { TasksMapViewProps } from './TasksMapView.types';
import {
  Map,
  FullscreenControl,
  ZoomControl,
  Placemark,
} from '@pbe/react-yandex-maps';
import { TasksMapFiltration } from './TasksMapFiltration';

export const TasksMapView: FC<TasksMapViewProps> = ({
  taskTypes,
  housingStocksWithTasks,
}) => {
  return (
    <Wrapper>
      <TasksMapFiltration taskTypes={taskTypes} />
      <Map
        width={'100%'}
        height={'calc(100vh - 130px)'}
        defaultState={{
          center: [55.75, 37.57],
          zoom: 14,
        }}
      >
        {housingStocksWithTasks.map((housingStockWithTask) => {
          return (
            <Placemark
              key={housingStockWithTask.housingStock?.id}
              defaultGeometry={
                housingStockWithTask.housingStock?.coordinates
                  ? [
                      housingStockWithTask.housingStock?.coordinates.latitude,
                      housingStockWithTask.housingStock?.coordinates.longitude,
                    ]
                  : undefined
              }
              options={{
                iconLayout: 'default#image',
                iconImageHref:
                  'data:image/svg+xml;base64,' +
                  btoa(`<svg width="36" height="48" viewBox="0 0 36 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31.5 20.5C31.5 22.6568 30.5452 25.4275 29.0526 28.418C27.5678 31.393 25.5828 34.5235 23.5899 37.3813C21.5982 40.2372 19.6056 42.811 18.1103 44.6714C17.3628 45.6013 16.7402 46.3523 16.3047 46.8704C16.1897 47.0073 16.0877 47.1279 16 47.2313C15.9123 47.1279 15.8103 47.0073 15.6953 46.8704C15.2598 46.3523 14.6372 45.6013 13.8897 44.6714C12.3944 42.811 10.4018 40.2372 8.41012 37.3813C6.41725 34.5235 4.43224 31.393 2.94737 28.418C1.45477 25.4275 0.5 22.6568 0.5 20.5C0.5 11.6488 7.45398 4.5 16 4.5C24.546 4.5 31.5 11.6488 31.5 20.5Z" fill="#272F5A" stroke="white"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M13 15C12.4477 15 12 15.4477 12 16V21H10C9.44772 21 9 21.4477 9 22V28H23V19.5C23 18.9477 22.5523 18.5 22 18.5H20V16C20 15.4477 19.5523 15 19 15H13ZM20 19.5V27H22V19.5H20ZM10 22H12V27H10V22ZM19 16H13V27H15V25H17V27H19V16ZM17 20H15V21H17V20ZM15 18H17V19H15V18ZM17 22H15V23H17V22Z" fill="white"/>
<path d="M20.5 8C20.5 3.85786 23.8579 0.5 28 0.5C32.1421 0.5 35.5 3.85786 35.5 8C35.5 12.1421 32.1421 15.5 28 15.5C23.8579 15.5 20.5 12.1421 20.5 8Z" fill="white" stroke="#272F5A"/>
<path d="M26.1208 11H29.8008V10.312H27.1128L28.5848 8.92C29.3688 8.184 29.8008 7.6 29.8008 7.008C29.8008 6.04 29.0808 5.336 27.9608 5.336C26.8488 5.336 26.1208 6.04 26.1208 7.04H26.9048C26.9048 6.448 27.3208 6.056 27.9608 6.056C28.6008 6.056 29.0168 6.448 29.0168 7.008C29.0168 7.416 28.7208 7.792 28.0328 8.464L26.1208 10.312V11Z" fill="#272F5A"/>
<text x="20" y="35" class="small">2</text>
</svg>
`),
                iconImageSize: [52, 52],
              }}
            ></Placemark>
          );
        })}
        <FullscreenControl />
        <ZoomControl
          options={{
            position: {
              top: 50,
              right: 10,
            },
          }}
        />
      </Map>
    </Wrapper>
  );
};
