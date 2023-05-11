import React from 'react';
import { AddPersonalNumberPage } from './view/AddPersonalNumberPage';
import { addPersonalNumberService } from './addPersonalNumberService.model';
import { useStore } from 'effector-react';

const { outputs } = addPersonalNumberService;

export const AddPersonalNumberContainer = () => {
  const apartment = useStore(outputs.$apartment);
  const isLoading = useStore(outputs.$isLoading);

  return (
    <>
      <AddPersonalNumberPage apartment={apartment} isLoading={isLoading} />
    </>
  );
};
