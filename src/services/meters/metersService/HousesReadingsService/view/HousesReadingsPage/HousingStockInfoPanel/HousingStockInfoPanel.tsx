import React, { FC } from 'react';
import {
  Panel,
  PanelInfoLabel,
  PanelInfoText,
  Title,
} from './HousingStockInfoPanel.styled';
import { HousingStockInfoPanelProps } from './HousingStockInfoPanel.types';
import { getHousingStockAddress } from 'utils/getHousingStockAddress';

export const HousingStockInfoPanel: FC<HousingStockInfoPanelProps> = ({
  housingStock,
  inspector,
}) => {
  const addressString = getHousingStockAddress(housingStock, true);

  return (
    <div>
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
    </div>
  );
};
