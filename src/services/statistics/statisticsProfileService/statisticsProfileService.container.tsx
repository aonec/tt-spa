import React from 'react';
import { useParams } from 'react-router-dom';
import { StatisticProfile } from './view/StatisticProfile';
import { exportSubscribersConsumptionService } from '../subscribersConsumptionService/exportSubscribersConsumptionService';
import { useUnit } from 'effector-react';
import { StatisticProfileGrouptype } from './statisticsProfileService.types';
import { SubscribersConsumptionSearchType } from '../subscribersConsumptionService/subscribersConsumptionService.types';
import { displayStatisticsListByHousesService } from '../subscribersConsumptionService/displayStatisticsListByHousesService';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';

export const StatisticsProfileContainer = () => {
  const { grouptype, searchType } = useParams<{
    grouptype: StatisticProfileGrouptype;
    searchType: SubscribersConsumptionSearchType;
  }>();

  const handleOpenExportStatisticModal = useUnit(
    exportSubscribersConsumptionService.inputs.openModal,
  );
  const setFileName = useUnit(
    exportSubscribersConsumptionService.inputs.setFileName,
  );
  const housingStockId = useUnit(
    displayStatisticsListByHousesService.outputs.$selectedHousingStockId,
  );
  const housingStockAddress = useUnit(
    displayStatisticsListByHousesService.outputs.$housingStockAddress,
  );

  return (
    <>
      <CreateResourceDisconnectionContainer />
      <ChooseTypeOfResourceDisconnectionModalContainer />

      <StatisticProfile
        handleOpenExportStatisticModal={handleOpenExportStatisticModal}
        setFileName={setFileName}
        grouptype={grouptype}
        searchType={searchType}
        housingStockId={housingStockId}
        housingStockAddress={housingStockAddress}
      />
    </>
  );
};
