import { Empty, Skeleton } from 'antd';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentsListService } from './apartmentsListService.model';
import { ApartmentsView } from './view/ApartmentsView';

const { outputs, inputs, gates } = apartmentsListService;
const { ApartmentsListGate } = gates;

export const ApartmentsListContainer = () => {
  const { id } = useParams<{ id: string }>();

  const apartmentsPagedList = useStore(outputs.$apartmentsPagedList);
  const isLoading = useStore(outputs.$isLoading);

  const currentSegment = useStore(outputs.$currentSegment);
  const setCurrentSegment = useEvent(inputs.setCurrentSegment);

  return (
    <>
      <ApartmentsListGate housingStockId={Number(id)} />
      <ApartmentsView
        hosuingStockId={Number(id)}
        isLoading={isLoading}
        apartmentsPagedList={apartmentsPagedList}
        setCurrentSegment={setCurrentSegment}
        currentSegment={currentSegment}
      />
    </>
  );
};
