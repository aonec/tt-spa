import { Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { objectProfileService } from './objectProfileService.model';
import { ObjectProfile } from './view/ObjectProfile';

const { inputs, outputs, gates } = objectProfileService;
const { ObjectProfileIdGate } = gates;

export const ObjectProfileContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const housingStock = useStore(outputs.$housingStock);
  const isLoading = useStore(outputs.$isLoading);
  const currentGrouptype = useStore(outputs.$currentGrouptype);

  const setCurrentGrouptype = useEvent(inputs.setCurrentGroutype);

  return (
    <>
      <ObjectProfileIdGate objectId={Number(housingStockId)} />
      {isLoading && <Skeleton active />}
      {!isLoading && housingStock && (
        <ObjectProfile
          housingStock={housingStock}
          setCurrentGrouptype={setCurrentGrouptype}
          currentGrouptype={currentGrouptype}
        />
      )}
    </>
  );
};
