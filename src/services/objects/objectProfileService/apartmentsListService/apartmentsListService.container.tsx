import { Empty, Skeleton } from 'antd';
import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router-dom';
import { apartmentsListService } from './apartmentsListService.model';
import { ApartmentsView } from './view/ApartmentsView';

const { outputs, gates } = apartmentsListService;
const { ApartmentsListGate } = gates;

export const ApartmentsListContainer = () => {
  const { id } = useParams<{ id: string }>();

  const apartmentsPagedList = useStore(outputs.$apartmentsPagedList);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      <ApartmentsListGate housingStockId={Number(id)} />
      <ApartmentsView
        isLoading={isLoading}
        apartmentsPagedList={apartmentsPagedList}
      />
    </>
  );
};
