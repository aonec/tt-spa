import { Pagination } from 'antd';
import React, { FC } from 'react';
import { Wrapper } from './DevicesList.styled';
import { DevicesListProps } from './DevicesList.types';
import { CalculatorListResponsePagedList } from 'myApi';
import { displayDevicesService } from '../../displayDevicesService.models';
import { useEvent, useStore } from 'effector-react';
import { Loader } from '01/components';

export const DevicesList: FC<DevicesListProps> = ({params}) => {
const { outputs , inputs } = displayDevicesService 

const loading = useStore(outputs.$loading)
const calculators = useStore(outputs.$calculators)
// const fetchcalc = useEvent(inputs.fetchCalculators)
console.log(calculators)
const { DisplayCalculatorsGate } = inputs 

  return <Wrapper>
    <DisplayCalculatorsGate params={params}/>
    {loading ? (
            <div role="loader">
              ЗАГРУЗКА...
              <Loader show />
            </div>
          ) : (
            <div>
              <div>{calculators}</div>
              {/* <Pagination>{pagination}</Pagination> */}
            </div>
          )}
  </Wrapper>
};
