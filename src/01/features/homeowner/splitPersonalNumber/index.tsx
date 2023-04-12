import { IndividualDevicesGate } from '01/features/individualDevices/displayIndividualDevices/models';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { message } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useEvent, useStore } from 'effector-react';
import React, { useCallback } from 'react';
import { useHistory, useParams } from 'react-router';
import { useEffect } from 'react';
import styled from 'styled-components';
import { HomeownerGate } from '../displayHomeowner/models';
import { PersonaNumberActionPage } from '../editPersonalNumber/components/PersonalNumberActionPage';
import { PersonalNumberEditForm } from '../editPersonalNumber/components/PersonalNumberEditForm';
import { NewApartmentForm } from './components/NewApartmentForm';
import { Stages } from './components/Stages';
import { TransferDevices } from './components/TransferDevices';
import {
  $isConfirmationModalOpen,
  $samePersonalAccountNumderId,
  $splitPersonalNumberStageNumber,
  handleConfirmationModalClose,
  homeownerAccountForSplittedApartmentForm,
  newApartmentPersonalNumberForm,
  onForced,
  previousSplitPersonalNumberPage,
  splitPersonalNumberFx,
  SplitPersonalNumberGate,
  transferDevicesForm,
} from './models';
import { ConfirmUsingExistingApartmentModal } from './components/ConfirmUsingExistingApartment';
import { $apartment } from '01/features/apartments/displayApartment/models';
import { PersonalNumberFormMountPlaceType } from '../editPersonalNumber/components/PersonalNumberEditForm/personalNumberEditForm.controller';
import { ConfirmationAddingExistingPersonalNumber } from '../editPersonalNumber/components/ConfirmationAddingExistingPersonalNumberModal';
import { StyledSelect } from '01/tt-components/StyledSelect/StyledSelect';

export const SplitPersonalNumber = () => {
  const { homeownerId, id: apartmentId } = useParams<{
    homeownerId: string;
    id: string;
  }>();
  const homeowner = useStore($apartment)?.homeownerAccounts?.find(
    (account) => account.id === homeownerId,
  );

  const stage = useStore($splitPersonalNumberStageNumber);

  const stages = [
    <>
      <StyledSelect
        disabled
        value={homeowner?.personalAccountNumber || undefined}
        style={{ width: '50%' }}
      />
      <SpaceLine />
      <PersonalNumberEditForm
        type={PersonalNumberFormMountPlaceType.Split}
        form={homeownerAccountForSplittedApartmentForm}
      />
    </>,
    <NewApartmentForm />,
    <TransferDevices />,
  ];

  const samePersonalAccountNumderId = useStore($samePersonalAccountNumderId);
  const isConfirmationModalOpen = useStore($isConfirmationModalOpen);

  const confirmationModalClose = useEvent(handleConfirmationModalClose);
  const handleForced = useEvent(onForced);

  const firstForm = useForm(homeownerAccountForSplittedApartmentForm);
  const secondForm = useForm(newApartmentPersonalNumberForm);
  const thirdForm = useForm(transferDevicesForm);

  const nextHandlers = [firstForm.submit, secondForm.submit, thirdForm.submit];

  const history = useHistory();

  const pending = useStore(splitPersonalNumberFx.pending);

  const onSuccesRequest = useCallback(() => {
    history.goBack();

    message.success('Данные успешно сохранены');
  }, [history]);

  useEffect(() => {
    const unwatch = splitPersonalNumberFx.doneData.watch(onSuccesRequest);

    return () => unwatch();
  }, [onSuccesRequest]);

  return (
    <>
      <IndividualDevicesGate ApartmentId={Number(apartmentId)} />
      <HomeownerGate id={homeownerId} />
      <SplitPersonalNumberGate />
      <ConfirmUsingExistingApartmentModal />
      <ConfirmationAddingExistingPersonalNumber
        isConfirmationModalOpen={isConfirmationModalOpen}
        samePersonalAccountNumderId={samePersonalAccountNumderId}
        confirmationModalClose={() => confirmationModalClose()}
        handleForced={handleForced}
      />
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
