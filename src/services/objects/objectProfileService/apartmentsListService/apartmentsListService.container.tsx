import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentsListService } from './apartmentsListService.model';
import { ApartmentsView } from './view/ApartmentsView';

const { outputs, inputs, gates } = apartmentsListService;
const { ApartmentsListGate } = gates;

export const ApartmentsListContainer = () => {
  const { housingStockId } = useParams<{ housingStockId: string }>();

  const apartmentsPagedList = useStore(outputs.$apartmentsPagedList);
  const isLoading = useStore(outputs.$isLoading);
  const currentApartmentId = useStore(outputs.$currentApartmentId);

  const currentSegment = useStore(outputs.$currentSegment);
  const setCurrentSegment = useEvent(inputs.setCurrentSegment);
  const setCurrentApartmentId = useEvent(inputs.setCurrentApartmentId);
  const clearCurrentApartmentId = useEvent(inputs.clearCurrentApartmentId);

  return (
    <>
      <ApartmentsListGate housingStockId={Number(housingStockId)} />
      <ApartmentsView
        hosuingStockId={Number(housingStockId)}
        isLoading={isLoading}
        apartmentsPagedList={apartmentsPagedList}
        setCurrentSegment={setCurrentSegment}
        currentSegment={currentSegment}
        setCurrentApartmentId={setCurrentApartmentId}
        currentApartmentId={currentApartmentId}
        clearCurrentApartmentId={() => clearCurrentApartmentId()}
      />
    </>
  );
};
