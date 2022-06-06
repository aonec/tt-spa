import React, { FC } from 'react';
import { Wrapper } from './DevicesList.styled';
import { DevicesListProps } from './DevicesList.types';

export const DevicesList: FC<DevicesListProps> = ({
  calculators,
  isLoading,
}) => {
  return (
    <Wrapper>
      {isLoading ? (
        <div role="loader">ЗАГРУЗКА...</div>
      ) : (
        <div>
          <div>
            {calculators?.map((elem) => (
              <div>{elem.address?.address?.mainAddress?.street}</div>
            ))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};
