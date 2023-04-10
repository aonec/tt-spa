import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { useEvent, useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import {
  $isConfirmationModalOpen,
  $samePersonalAccountNumderId,
  $switchRequestStatus,
  handleConfirmationModalClose,
  onForced,
  setSwitchRequestStatus,
  switchPersonalNumberFx,
} from './models';
import { message } from 'antd';
import styled from 'styled-components';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { ConfirmationAddingExistingPersonalNumber } from '../editPersonalNumber/components/ConfirmationAddingExistingPersonalNumberModal';
import { PersonalNumberFormMountPlaceType } from '../editPersonalNumber/components/PersonalNumberEditForm/personalNumberEditForm.controller';
import { Select } from 'ui-kit/Select';

export const SwitchPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const apartment = useStore($apartment);
  const pendingSwitch = useStore(switchPersonalNumberFx.pending);
  const status = useStore($switchRequestStatus);
  const samePersonalAccountNumderId = useStore($samePersonalAccountNumderId);
  const isConfirmationModalOpen = useStore($isConfirmationModalOpen);

  const confirmationModalClose = useEvent(handleConfirmationModalClose);
  const handleForced = useEvent(onForced);

  const history = useHistory();

  const personalAccountNumber = apartment?.homeownerAccounts?.find(
    (account) => account.id === homeownerId,
  )?.personalAccountNumber;

  useEffect(() => {
    if (!status) return;

    if (status === 'done') {
      history.goBack();
      message.success('Лицевой счет успешно изменен');
    }
    setSwitchRequestStatus(null);
  }, [status, history]);

  return (
    <Wrap>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage
        loading={pendingSwitch}
        title="Замена лицевого счета"
      >
        <Select
          disabled
          value={personalAccountNumber || undefined}
          style={{ width: '50%' }}
        />
        <ConfirmationAddingExistingPersonalNumber
          isConfirmationModalOpen={isConfirmationModalOpen}
          samePersonalAccountNumderId={samePersonalAccountNumderId}
          confirmationModalClose={() => confirmationModalClose()}
          handleForced={handleForced}
        />
        <SpaceLine />
        <PersonalNumberEditForm
          type={PersonalNumberFormMountPlaceType.Switch}
        />
      </PersonaNumberActionPage>
    </Wrap>
  );
};
const Wrap = styled.div``;
