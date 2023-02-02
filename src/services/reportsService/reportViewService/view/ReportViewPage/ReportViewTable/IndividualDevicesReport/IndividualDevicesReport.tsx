import React, { FC } from 'react';
import { Wrapper } from './IndividualDevicesReport.styled';
import { IndividualDevicesReportProps } from './IndividualDevicesReport.types';

export const IndividualDevicesReport: FC<IndividualDevicesReportProps> = ({
  individualDevicesReportData,
}) => {
  return (
    <Wrapper>
      {individualDevicesReportData.map((elem) => (
        <div>{elem.address}</div>
      ))}
    </Wrapper>
  );
};
