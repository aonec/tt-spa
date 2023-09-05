import React, { FC } from 'react';
import {
  Panel,
  PanelInfoLabel,
  PanelInfoText,
  StickyWrapper,
  Title,
} from './HousingStockInfoPanel.styled';
import { HousingStockInfoPanelProps } from './HousingStockInfoPanel.types';
import { getBuildingAddress } from 'utils/getBuildingAddress';

export const HousingStockInfoPanel: FC<HousingStockInfoPanelProps> = ({
  housingStock,
  inspector,
}) => {
  const addressString = getBuildingAddress(housingStock, true);

  return (
    <StickyWrapper>
      <Title>{addressString}</Title>
      <Panel>
        <div>
          <PanelInfoLabel>Контролер</PanelInfoLabel>
          <PanelInfoText>{inspector?.fullName || 'Нет данных'}</PanelInfoText>
        </div>
        <div>
          <PanelInfoLabel>День снятия показаний</PanelInfoLabel>
          <PanelInfoText>{housingStock.inspectedDay}</PanelInfoText>
        </div>
      </Panel>
    </StickyWrapper>
  );
};
