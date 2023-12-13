import React, { useEffect } from 'react';
import { RegistrationPage } from './view/RegistrationPage';
import { registrationService } from './registrationService.model';
import { useUnit } from 'effector-react';
import { useNavigate } from 'react-router-dom';

const { inputs, outputs } = registrationService;

export const RegistrationContainer = () => {
  const { handleConfirmRegistration, isLoading } = useUnit({
    isLoading: outputs.$isLoading,
    handleConfirmRegistration: inputs.handleConfirmRegistration,
  });

  const successRegistration = inputs.successRegistration;

  const navigate = useNavigate();
  useEffect(() => {
    successRegistration.watch(() => navigate('/login'));
  }, [successRegistration, navigate]);

  return (
    <RegistrationPage
      isLoading={isLoading}
      handleConfirmRegistration={handleConfirmRegistration}
    />
  );
};
