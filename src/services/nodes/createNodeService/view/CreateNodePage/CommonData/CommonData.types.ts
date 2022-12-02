import { ENodeCommercialAccountStatus, EResourceType } from 'myApi';
import { FC } from 'react';

export type CommonDataProps = {
  goPrevStep: () => void;
};

export type NodeResourcesList = { resource: EResourceType; text: string }[];

export type NodeStatusesList = {
  nodeStatus: ENodeCommercialAccountStatus,
  text: string,
  Icon: FC
}[]