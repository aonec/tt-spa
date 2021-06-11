import { StyledModal } from '01/shared/ui/Modal/Modal';
import { useStore } from 'effector-react';
import React from 'react';
import {
  $isEditStaffStatusModalVisible,
  editStaffStatusCancelButtonClicked,
} from './models';

export const EditStaffStatusModal: React.FC = () => {
  const visible = useStore($isEditStaffStatusModalVisible);

  const onCancel = () => editStaffStatusCancelButtonClicked();

  return <StyledModal visible={visible} onCancel={onCancel}></StyledModal>;
};
