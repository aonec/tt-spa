import { ENodeCommercialAccountStatus } from 'api/types';
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
