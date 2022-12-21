import React from 'react';
import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import { useParams } from 'react-router-dom';
import { objectProfileService } from './objectProfileService.model';
import { ObjectProfile } from './view/ObjectProfile';
import { ConsolidatedReportContainer } from './consolidatedReportService';

const { inputs, outputs, gates } = objectProfileService;
const { ObjectProfileIdGate } = gates;

export const ObjectProfileContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const housingStock = useStore(outputs.$housingStock);
  const isLoading = useStore(outputs.$isLoading);
  const currentGrouptype = useStore(outputs.$currentGrouptype);

  const setCurrentGrouptype = useEvent(inputs.setCurrentGroutype);
  const openConsolidatedReportModal = useEvent(
    inputs.openConsolidatedReportModal
  );

  return (
    <>
      <ObjectProfileIdGate objectId={Number(housingStockId)} />
      <ConsolidatedReportContainer />
      {isLoading && <Skeleton active />}
      {!isLoading && housingStock && (
        <ObjectProfile
          housingStock={housingStock}
          setCurrentGrouptype={setCurrentGrouptype}
          currentGrouptype={currentGrouptype}
          openCommonReport={() => openConsolidatedReportModal()}
        />
      )}
    </>
  );
};
