import React, { FC, useMemo } from 'react';
import { Wrapper } from './MeteringDeviceReadingsTableHeader.styled';
import { MeteringDeviceReadingsTableHeaderProps } from './MeteringDeviceReadingsTableHeader.types';

export const MeteringDeviceReadingsTableHeader: FC<MeteringDeviceReadingsTableHeaderProps> = ({
  isColdWater,
}) => {
  const volumeColumns = () => (
    <>
      <div>V1, м³</div>
      {!isColdWater && <div>V2, м³</div>}
    </>
  );

  return (
    <Wrapper isColdWater={isColdWater}>
      <div>Месяц</div>
      {volumeColumns()}
      <div>Расход, м³</div>
    </Wrapper>
  );
};
