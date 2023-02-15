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
  editHomeownerSaveButtonClicked,
  handleConfirmationModalClose,
  onForced,
  setEditRequestStatus,
} from './models';
import { message } from 'antd';
import { CloseHomeownerAccountModal } from './components/CloseHomeownerAccountModal';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { ConfirmationAddingExistingPersonalNumber } from './components/ConfirmationAddingExistingPersonalNumberModal';

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

    if (status === 'failed') {
      message.error('Ошибка сохранения');
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
        onSaveHandler={editHomeownerSaveButtonClicked}
      >
        <PersonalNumberEditForm
          type="edit"
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
