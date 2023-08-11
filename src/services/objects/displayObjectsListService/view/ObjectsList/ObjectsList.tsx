import React, { FC, useMemo, useState } from 'react';
import { HousingStockItem } from './HousingStockItem';
import { ObjectsListProps } from './ObjectsList.types';
import { TypeAddressToStart } from 'ui-kit/shared/TypeToStart';
import { WithLoader } from 'ui-kit/shared/WithLoader';
import {
  ConsolidatedReportContainer,
  consolidatedReportService,
} from 'services/objects/housingStockProfileService/consolidatedReportService';
import { BuildingListResponse } from 'api/types';
import { useUnit } from 'effector-react';
import { heatIndividualDevicesReportService } from 'services/objects/objectsProfileService/heatIndividualDevicesReportService';
import { chooseTypeOfResourceDisconnectionModalService } from 'services/resources/chooseTypeOfResourceDisconnectionModalService';

export const ObjectsList: FC<ObjectsListProps> = ({
  isLoading,
  housingStocks,
}) => {
  const [selectedBuilding, setSelectedBuilding] =
    useState<BuildingListResponse | null>();

  const {
    openConsolidatedReportModal,
    openHeatIndividualDeviceReportModal,
    openResourceDisconnectionReportModal,
  } = useUnit({
    openConsolidatedReportModal:
      consolidatedReportService.inputs.openConsolidatedReportModal,
    openHeatIndividualDeviceReportModal:
      heatIndividualDevicesReportService.inputs.openModal,
    openResourceDisconnectionReportModal:
      chooseTypeOfResourceDisconnectionModalService.inputs.openModal,
  });

  const housingStocksList = useMemo(() => {
    return housingStocks?.map((housingStock) => (
      <HousingStockItem
        key={housingStock.id}
        housingStock={housingStock}
        setSelectedBuilding={setSelectedBuilding}
        openConsolidatedReportModal={openConsolidatedReportModal}
        openHeatIndividualDeviceReportModal={
          openHeatIndividualDeviceReportModal
        }
        openResourceDisconnectionReportModal={
          openResourceDisconnectionReportModal
        }
      />
    ));
  }, [
    housingStocks,
    openConsolidatedReportModal,
    openHeatIndividualDeviceReportModal,
    openResourceDisconnectionReportModal,
  ]);

  const isEmpty = useMemo(() => !housingStocks?.length, [housingStocks]);

  return (
    <div>
      {selectedBuilding && (
        <ConsolidatedReportContainer building={selectedBuilding} />
      )}
      <WithLoader isLoading={isLoading}>
        {housingStocksList}
        {isEmpty && <TypeAddressToStart />}
      </WithLoader>
    </div>
  );
};
