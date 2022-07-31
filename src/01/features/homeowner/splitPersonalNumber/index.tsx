import { message } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
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
  splitPersonalNumberFx,
  SplitPersonalNumberGate,
  transferDevicesForm,
} from './models';
import { ConfirmUsingExistingApartmentModal } from './components/ConfirmUsingExistingApartment';
import { StyledSelect } from '../../../_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { IndividualDevicesGate } from '../../individualDevices/displayIndividualDevices/models';
import { Space, SpaceLine } from '../../../shared/ui/Layout/Space/Space';

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
  const thirdForm = useForm(transferDevicesForm);

  const nextHandlers = [firstForm.submit, secondForm.submit, thirdForm.submit];

  const history = useHistory();

  const pending = useStore(splitPersonalNumberFx.pending);

  function onSuccesRequest() {
    history.goBack();

    message.success('Данные успешно сохранены');
  }

  useEffect(() => {
    const unwatch = splitPersonalNumberFx.doneData.watch(onSuccesRequest);

    return () => unwatch();
  }, []);

  return (
    <>
      <IndividualDevicesGate ApartmentId={Number(apartmentId)} />
      <HomeownerGate id={homeownerId} />
      <SplitPersonalNumberGate />
      <ConfirmUsingExistingApartmentModal />
      <Wrap>
        <PersonaNumberActionPage
          saveButtonText={stage === 3 ? 'Сохранить' : void 0}
          cancelButtonText={stage !== 1 ? 'Назад' : void 0}
          onSaveHandler={nextHandlers[stage - 1]}
          onCancelHandler={
            stage === 1 ? history.goBack : previousSplitPersonalNumberPage
          }
          title="Разделение лицевого счета"
          type="split"
          loading={pending}
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
