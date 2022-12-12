import { ENodeCommercialAccountStatus } from 'myApi';
import { FC } from 'react';
import {
  NotRegisteredIcon,
  PendingApprovalIcon,
  PreparedForDeliveryIcon,
  RegisteredIcon,
} from 'ui-kit/icons';

export const NodeStatusIconsDictionary: {
  [key in ENodeCommercialAccountStatus]: FC;
} = {
  [ENodeCommercialAccountStatus.NotRegistered]: NotRegisteredIcon,
  [ENodeCommercialAccountStatus.Prepared]: PreparedForDeliveryIcon,
  [ENodeCommercialAccountStatus.OnReview]: PendingApprovalIcon,
  [ENodeCommercialAccountStatus.Registered]: RegisteredIcon,
};

export const NodeStatusTextDictionary: {
  [key in ENodeCommercialAccountStatus]: string;
} = {
  [ENodeCommercialAccountStatus.NotRegistered]: 'Не на коммерческом учете',
  [ENodeCommercialAccountStatus.Prepared]: 'Подготовлен к сдаче',
  [ENodeCommercialAccountStatus.OnReview]: 'На утверждении',
  [ENodeCommercialAccountStatus.Registered]: 'Сдан на коммерческий учет',
};