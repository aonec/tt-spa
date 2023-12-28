import { useUnit } from 'effector-react';
import React from 'react';
import { EditEmailModal } from './EditEmailModal';
import { SendReportToEmailModal } from './SendReportToEmailModal';
import { sendReportToEmailService } from './sendReportToEmailService.model';

const { inputs, outputs } = sendReportToEmailService;

export const SendReportToEmailContainer = () => {
  const {
    defaultEmail,
    handleClose,
    handleCloseSetEmailModal,
    handleOpenSetEmailModal,
    isOpen,
    setEmail,
    setEmailIsOpen,
    submitEmail,
  } = useUnit({
    isOpen: outputs.$isOpen,
    setEmailIsOpen: outputs.$isOpenSetEmail,
    defaultEmail: outputs.$defaultEmail,
    handleClose: inputs.closeModal,
    submitEmail: inputs.submitEmail,
    handleOpenSetEmailModal: inputs.openSetEmailModal,
    handleCloseSetEmailModal: inputs.closeSetEmailModal,
    setEmail: inputs.setEmail,
  });

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
