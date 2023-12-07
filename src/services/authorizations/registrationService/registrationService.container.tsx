import React, { useEffect } from 'react';
import { RegistrationPage } from './view/RegistrationPage';
import { registrationService } from './registrationService.model';
import { useUnit } from 'effector-react';
import { useHistory } from 'react-router-dom';

const { inputs, outputs } = registrationService;

export const RegistrationContainer = () => {
  const { handleConfirmRegistration, isLoading } = useUnit({
    isLoading: outputs.$isLoading,
    handleConfirmRegistration: inputs.handleConfirmRegistration,
  });

  const successRegistration = inputs.successRegistration;

  const history = useHistory();
  useEffect(() => {
    successRegistration.watch(() => history.push('/login'));
  }, [successRegistration, history]);

  return (
    <RegistrationPage
      isLoading={isLoading}
      handleConfirmRegistration={handleConfirmRegistration}
    />
  );
};
