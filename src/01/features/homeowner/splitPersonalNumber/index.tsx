import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { useStore } from 'effector-react';
import React from 'react';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { $homeowner, HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import { Stages } from './components/Stages';
import { $splitPersonalNumberStageNumber } from './models';

export const SplitPersonalNumber = () => {
  const { homeownerId } = useParams<{ homeownerId: string }>();
  const homeowner = useStore($homeowner);
  const stage = useStore($splitPersonalNumberStageNumber);

  const stages = [
    <>
      <StyledSelect
        disabled
        value={homeowner?.personalAccountNumber!}
        style={{ width: '50%' }}
      />
      <SpaceLine />
      <PersonalNumberEditForm type="switch" />
    </>,
    <>Улица дом квартира</>,
    <>Выбор приборов</>,
  ];

  return (
    <>
      <HomeownerGate id={homeownerId} />
      <Wrap>
        <PersonaNumberActionPage title="Разделение лицевого счета" type="split">
          {stages[stage - 1]}
        </PersonaNumberActionPage>
        <Space w={45} />
        <div>
          <Space h={100} />
          <Stages />
        </div>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  display: flex;
`;
