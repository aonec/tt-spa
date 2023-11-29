import React, { useEffect } from 'react';
import { RegistrationPage } from './view/RegistrationPage';
import { registrationService } from './registrationService.model';
import { useEvent, useStore } from 'effector-react';
import {  useNavigate } from 'react-router-dom';

const { inputs, outputs } = registrationService;

export const RegistrationContainer = () => {
  const isLoading = useStore(outputs.$isLoading);

  const handleConfirmRegistration = useEvent(inputs.handleConfirmRegistration);
  const successRegistration = inputs.successRegistration;

  const history =  useNavigate();
  useEffect(() => {
    successRegistration.watch(() =>  history('/login'));
  }, [successRegistration, history]);

  return (
    <RegistrationPage
      isLoading={isLoading}
      handleConfirmRegistration={handleConfirmRegistration}
    />
  );
};
