import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { StatisticProfile } from './view/StatisticProfile';
import { exportSubscribersConsumptionService } from '../subscribersConsumptionService/exportSubscribersConsumptionService';
import { useUnit } from 'effector-react';
import { StatisticProfileGrouptype } from './statisticsProfileService.types';
import { SubscribersConsumptionSearchType } from '../subscribersConsumptionService/subscribersConsumptionService.types';
import { displayStatisticsListByHousesService } from '../subscribersConsumptionService/displayStatisticsListByHousesService';
import { CreateResourceDisconnectionContainer } from 'services/resources/createResourceDisconnectionService';
import { ChooseTypeOfResourceDisconnectionModalContainer } from 'services/resources/chooseTypeOfResourceDisconnectionModalService/chooseTypeOfResourceDisconnectionModalService.container';
import { resourceDisablingScheduleServiceService } from 'services/settings/resourcesDisablingScheduleService/ResourceDisablingScheduleService.model';
import { exportResourceDisconnectionsService } from 'services/resources/exportResourceDisconnections';

export const StatisticsProfileContainer = () => {
  const { grouptype, searchType } = useParams<{
    grouptype: StatisticProfileGrouptype;
    searchType: SubscribersConsumptionSearchType;
  }>() as {
    grouptype: StatisticProfileGrouptype;
    searchType: SubscribersConsumptionSearchType;
  };

  const {
    handleOpenExportStatisticModal,
    setFileName,
    housingStockId,
    housingStockAddress,
    resourceDisconnectingfilters,
    handleExportResourceDisconnections,
  } = useUnit({
    handleOpenExportStatisticModal:
      exportSubscribersConsumptionService.inputs.openModal,
    setFileName: exportSubscribersConsumptionService.inputs.setFileName,
    housingStockId:
      displayStatisticsListByHousesService.outputs.$selectedHousingStockId,
    housingStockAddress:
      displayStatisticsListByHousesService.outputs.$housingStockAddress,
    resourceDisconnectingfilters:
      resourceDisablingScheduleServiceService.outputs.$filters,
    handleExportResourceDisconnections:
      exportResourceDisconnectionsService.inputs
        .handleExportResourceDisconnections,
  });

  const handleClickExportResourceDisconnecting = useCallback(() => {
    handleExportResourceDisconnections(resourceDisconnectingfilters);
  }, [resourceDisconnectingfilters, handleExportResourceDisconnections]);

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
        handleClickExportResourceDisconnecting={
          handleClickExportResourceDisconnecting
        }
      />
    </>
  );
};
