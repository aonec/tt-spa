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
import { message, Steps } from 'antd';
import styled from 'styled-components';

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
    <Wrap>
      <HomeownerGate id={homeownerId} />
      <PersonaNumberActionPage
        onSaveHandler={switchPersonalNumber}
        loading={pendingSwitch}
        title="Разделение лицевого счета"
      >
        <StyledSelect
          disabled
          value={homeowner?.personalAccountNumber!}
          style={{ width: '50%' }}
        />
        <SpaceLine />
        <PersonalNumberEditForm type="split" />
      </PersonaNumberActionPage>
      <Steps direction="vertical" current={1}>
        <Step title="Finished" description="This is a description." />
        <Step title="In Progress" description="This is a description." />
        <Step title="Waiting" description="This is a description." />
      </Steps>
    </Wrap>
  );
};
const Step = Steps.Step;

const Wrap = styled.div``;
