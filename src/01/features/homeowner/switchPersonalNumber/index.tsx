import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import {
  $switchRequestStatus,
  setSwitchRequestStatus,
  switchPersonalNumber,
  switchPersonalNumberFx,
} from './models';
import { message } from 'antd';
import styled from 'styled-components';
import { $apartment } from '01/features/apartments/displayApartment/models';

export const SwitchPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const apartment = useStore($apartment);
  const pendingSwitch = useStore(switchPersonalNumberFx.pending);
  const status = useStore($switchRequestStatus);
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

    if (status === 'failed') {
      message.error('Ошибка сохранения');
    }

    setSwitchRequestStatus(null);
  }, [status, history]);

  return (
    <Wrap>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage
        onSaveHandler={switchPersonalNumber}
        loading={pendingSwitch}
        title="Замена лицевого счета"
      >
        <StyledSelect
          disabled
          value={personalAccountNumber || undefined}
          style={{ width: '50%' }}
        />
        <SpaceLine />
        <PersonalNumberEditForm type="split" />
      </PersonaNumberActionPage>
    </Wrap>
  );
};
const Wrap = styled.div``;
