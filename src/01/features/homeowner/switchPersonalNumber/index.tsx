import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import { $homeowner, HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import {
  $switchRequestStatus,
  setSwitchRequestStatus,
  switchPersonalNumber,
  switchPersonalNumberFx,
} from './models';
import { message } from 'antd';

export const SwitchPersonalNumberPage = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const homeowner = useStore($homeowner);
  const pendingSwitch = useStore(switchPersonalNumberFx.pending);
  const status = useStore($switchRequestStatus);
  const history = useHistory();

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
  }, [status]);

  return (
    <>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage
        onSaveHandler={switchPersonalNumber}
        loading={pendingSwitch}
        title="Замена лицевого счета"
      >
        <StyledSelect
          disabled
          value={homeowner?.personalAccountNumber!}
          style={{ width: '50%' }}
        />
        <SpaceLine />
        <PersonalNumberEditForm type="switch" />
      </PersonaNumberActionPage>
    </>
  );
};
