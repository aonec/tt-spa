import { Pagination } from 'antd';
import React, { FC } from 'react';
import { Wrapper } from './DevicesList.styled';
import { DevicesListProps } from './DevicesList.types';
import { CalculatorListResponsePagedList } from 'myApi';
import { displayDevicesService } from '../../displayDevicesService.models';
import { useStore } from 'effector-react';
import { Loader } from '01/components';

export const DevicesList: FC<DevicesListProps> = () => {
const { outputs , inputs } = displayDevicesService 

const loading = useStore(outputs.$loading)
const calculators = useStore(outputs.$calculators)

  return <Wrapper>
    {loading ? (
            <div role="loader">
              ЗАГРУЗКА...
              <Loader show />
            </div>
          ) : (
            <div>
              <div>{calculators}</div>
              <Pagination>{pagination}</Pagination>
            </div>
          )}
  </Wrapper>
};
