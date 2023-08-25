import React from 'react';
import { removeAssignmentService } from './removeAssignmentService.model';
import { useUnit } from 'effector-react';
import { Dialog } from 'ui-kit/shared/Dialog/Dialog';
import { removeAssignmentMutation } from './removeAssignmentService.api';

const { inputs, outputs } = removeAssignmentService;

export const RemoveAssignmentContainer = () => {
  const { pending: isLoading } = useUnit(removeAssignmentMutation);

  const { isOpen } = useUnit({
    isOpen: outputs.$isOpen,
  });

  const { closeModal, removeAssignment } = useUnit({
    removeAssignment: inputs.removeAssignment,
    closeModal: inputs.closeModal,
  });

  return (
    <Dialog
      isOpen={isOpen}
      onCancel={closeModal}
      type="danger"
      isLoading={isLoading}
      onSubmit={removeAssignment}
      submitText="Расформировать"
      description="После расформирования задания заявки снова станут нераспределенными."
      title="Вы действительно хотите расформировать задание?"
    />
  );
};
