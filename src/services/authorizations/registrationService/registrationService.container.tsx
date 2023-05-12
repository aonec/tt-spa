import React, { useEffect } from 'react';
import { RegistrationPage } from './view/RegistrationPage';
import { registrationService } from './registrationService.model';
import { useEvent, useStore } from 'effector-react';
import { useHistory } from 'react-router-dom';

const { inputs, outputs } = registrationService;

export const RegistrationContainer = () => {
  const isLoading = useStore(outputs.$isLoading);

  const handleConfirmRegistration = useEvent(inputs.handleConfirmRegistration);
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
