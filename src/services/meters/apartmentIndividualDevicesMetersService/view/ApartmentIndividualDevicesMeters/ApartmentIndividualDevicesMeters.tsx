import { Checkbox, Skeleton } from 'antd';
import React, { FC } from 'react';
import { Header, Wrapper } from './ApartmentIndividualDevicesMeters.styled';
import { ApartmentIndividualDevicesMetersProps } from './ApartmentIndividualDevicesMeters.types';

export const ApartmentIndividualDevicesMeters: FC<ApartmentIndividualDevicesMetersProps> = ({
  individualDevicesList,
  isLoading,
}) => {
  return (
    <Wrapper>
      <Header>
        <div className="device-info">Информация о приборе</div>
        <Checkbox>Закрытые приборы (n)</Checkbox>
      </Header>
      {isLoading && <Skeleton active />}
      {!isLoading &&
        individualDevicesList.map(({ id, model, serialNumber }) => (
          <div key={id}>
            {serialNumber} {model}
          </div>
        ))}
    </Wrapper>
  );
};
