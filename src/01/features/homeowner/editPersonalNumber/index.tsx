import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from './components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from './components/PersonalNumberEditForm';
import {
  $editRequestStatus,
  $isConfirmationModalOpen,
  $samePersonalAccountNumderId,
  AutoCompleteFormGate,
  editHomeownerAccountEffect,
  handleConfirmationModalClose,
  onForced,
  setEditRequestStatus,
} from './models';
import { message } from 'antd';
import { CloseHomeownerAccountModal } from './components/CloseHomeownerAccountModal';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { ConfirmationAddingExistingPersonalNumber } from '../../../../services/homeowner/personalNumber/components/ConfirmationAddingExistingPersonalNumberModal';
import { PersonalNumberFormMountPlaceType } from './components/PersonalNumberEditForm/personalNumberEditForm.controller';

export const EditHomeownerPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const loading = useStore(editHomeownerAccountEffect.pending);
  const status = useStore($editRequestStatus);
  const isConfirmationModalOpen = useStore($isConfirmationModalOpen);
  const samePersonalAccountNumderId = useStore($samePersonalAccountNumderId);
  const confirmationModalClose = useEvent(handleConfirmationModalClose);
  const handleForced = useEvent(onForced);

  const history = useHistory();

  const isMainPersonalAccountNumber = useStore(
    $apartment,
  )?.homeownerAccounts?.find(
    (account) => account.id === homeownerId,
  )?.isMainPersonalAccountNumber;

  useEffect(() => {
    if (!status) return;

    if (status === 'done') {
      history.goBack();
      message.success('Лицевой счет успешно изменен');
    }

    setEditRequestStatus(null);
  }, [status, history]);

  return (
    <>
      <CloseHomeownerAccountModal />
      <AutoCompleteFormGate autocomplete />
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage
        loading={loading}
        title="Редактирование лицевого счета"
      >
        <PersonalNumberEditForm
          type={PersonalNumberFormMountPlaceType.Edit}
          isMainPersonalAccountNumber={isMainPersonalAccountNumber}
        />
        <ConfirmationAddingExistingPersonalNumber
          isConfirmationModalOpen={isConfirmationModalOpen}
          samePersonalAccountNumderId={samePersonalAccountNumderId}
          confirmationModalClose={() => confirmationModalClose()}
          handleForced={handleForced}
        />
      </PersonaNumberActionPage>
    </>
  );
};
