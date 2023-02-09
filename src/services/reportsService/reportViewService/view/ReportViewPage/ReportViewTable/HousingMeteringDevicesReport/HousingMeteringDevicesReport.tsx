import { Empty } from 'antd';
import React, { FC } from 'react';
import { Wrapper } from './HousingMeteringDevicesReport.styled';
import { HousingMeteringDevicesReportProps } from './HousingMeteringDevicesReport.types';

export const HousingMeteringDevicesReport: FC<HousingMeteringDevicesReportProps> = ({}) => {
  return <Wrapper>
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
  </Wrapper>
};
