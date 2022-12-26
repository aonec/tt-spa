import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { EditEmailModal } from './EditEmailModal';
import { SendReportToEmailModal } from './SendReportToEmailModal';
import { sendReportToEmailService } from './sendReportToEmailService.model';

const { inputs, outputs } = sendReportToEmailService;

export const SendReportToEmailContainer = () => {
  const isOpen = useStore(outputs.$isOpen);
  const setEmailIsOpen = useStore(outputs.$isOpenSetEmail);
  const defaultEmail = useStore(outputs.$defaultEmail);

  const handleClose = useEvent(inputs.closeModal);
  const submitEmail = useEvent(inputs.submitEmail);
  const handleOpenSetEmailModal = useEvent(inputs.openSetEmailModal);
  const handleCloseSetEmailModal = useEvent(inputs.closeSetEmailModal);
  const setEmail = useEvent(inputs.setEmail);

  return (
    <>
      <SendReportToEmailModal
        defaultEmail={defaultEmail}
        handleClose={() => handleClose()}
        handleOpenSetEmailModal={() => handleOpenSetEmailModal()}
        isOpen={isOpen}
        submitEmail={() => submitEmail()}
      />
      <EditEmailModal
        email={defaultEmail}
        handleCloseSetEmailModal={() => handleCloseSetEmailModal()}
        setEmail={setEmail}
        setEmailIsOpen={setEmailIsOpen}
        submitEmail={() => submitEmail()}
      />
    </>
  );
};
