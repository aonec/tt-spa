import React from 'react';
import styled from 'styled-components';
import { EResourceType } from '../../../../myApi';
import { useStore } from 'effector-react';
import { $isColdWaterSupply, $resource } from '../models';

export const HousingMeteringReadingsHeader = ({
  resource,
}: {
  resource: EResourceType;
}) => {
  const isColdWaterSupply = useStore($isColdWaterSupply);

  const renderVolumes = () => {
    // const isColdWaterSupply = resource === ResourceType.ColdWaterSupply;
    debugger;

    return isColdWaterSupply ? (
      <div style={{ paddingLeft: 80 }}>V1, м³</div>
    ) : (
      <div style={{ display: 'flex' }}>
        <div style={{ width: '50%' }}>V1, м³</div>
        <div style={{ width: '50%' }}>V2, м³</div>
      </div>
    );
  };

  return (
    <HeaderWrapper isColdWaterSupply={isColdWaterSupply}>
      <div>Месяц</div>
      {renderVolumes()}
      <div>Потребление, м³</div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.div<{ isColdWaterSupply: boolean }>`
  display: grid;
  position: sticky;
  top: 0;
  align-items: center;
  padding: 0 16px;
  margin-bottom: 8px;
  height: 48px;
  grid-template-columns: ${({ isColdWaterSupply }) =>
    isColdWaterSupply ? '2.5fr 5.5fr 4fr' : '3fr 5fr 4fr'};
  background-color: var(--main-4);
  overflow: hidden;
`;
