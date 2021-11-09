import { IndividualDevicesGate } from '01/features/individualDevices/displayIndividualDevices/models';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import styled from 'styled-components';
import { $homeowner, HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import { NewApartmentForm } from './components/NewApartmentForm';
import { Stages } from './components/Stages';
import { TransferDevices } from './components/TransferDevices';
import {
  $splitPersonalNumberStageNumber,
  homeownerAccountForSplittedApartmentForm,
  newApartmentPersonalNumberForm,
  previousSplitPersonalNumberPage,
  SplitPersonalNumberGate,
} from './models';

export const SplitPersonalNumber = () => {
  const { homeownerId, id: apartmentId } = useParams<{
    homeownerId: string;
    id: string;
  }>();
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
      <PersonalNumberEditForm
        type="switch"
        form={homeownerAccountForSplittedApartmentForm}
      />
    </>,
    <NewApartmentForm />,
    <TransferDevices />,
  ];

  const firstForm = useForm(homeownerAccountForSplittedApartmentForm);
  const secondForm = useForm(newApartmentPersonalNumberForm);

  const nextHandlers = [firstForm.submit, secondForm.submit];

  const history = useHistory();

  return (
    <>
      <IndividualDevicesGate ApartmentId={Number(apartmentId)} />
      <HomeownerGate id={homeownerId} />
      <SplitPersonalNumberGate />
      <Wrap>
        <PersonaNumberActionPage
          onSaveHandler={nextHandlers[stage - 1]}
          onCancelHandler={
            stage === 1 ? history.goBack : previousSplitPersonalNumberPage
          }
          title="Разделение лицевого счета"
          type="split"
        >
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
