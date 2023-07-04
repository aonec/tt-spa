import { RightAlign } from '01/shared/ui/Layout/RightAlign';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { message } from 'antd';
import { useForm } from 'effector-forms';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import {
  $creationDeviceStage,
  $isCreateIndividualDeviceSuccess,
  addIndividualDeviceForm,
  ApartmentIdGate,
  resetCreationRequestStatus,
  SwitchIndividualDeviceGate,
  switchStageButtonClicked,
} from '../models';
import { BaseInfoStage } from './stages/BaseInfoStage';
import { DocumentsStage } from './stages/DocumentsStage';

export const CreateIndividualDeviceForm = () => {
  const stageNumber = useStore($creationDeviceStage);
  const individualDeviceCreationRequestStatus = useStore(
    $isCreateIndividualDeviceSuccess,
  );

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const pages = [<BaseInfoStage />, <DocumentsStage />];

  const { submit } = useForm(addIndividualDeviceForm);

  const type = useStore(
    SwitchIndividualDeviceGate.state.map(({ type }) => type),
  );

  useEffect(() => {
    if (!individualDeviceCreationRequestStatus) return;

    const messageText =
      type === 'check'
        ? 'поверен'
        : type === 'reopen'
        ? 'переоткрыт'
        : type === 'switch'
        ? 'заменен'
        : '';

    history.goBack();
    message.success(`Прибор успешно ${messageText}!`);
    resetCreationRequestStatus();
  }, [individualDeviceCreationRequestStatus, history, type]);

  const onCancel = () =>
    stageNumber === 0 ? history.goBack() : switchStageButtonClicked(0);

  return (
    <>
      <ApartmentIdGate apartmentId={Number(id)} />
      <Wrap>
        {pages[stageNumber]}

        <Space style={{ height: 20 }} />

        <RightAlign>
          <Spaces flex>
            <Button type="ghost" onClick={onCancel}>
              {stageNumber === 0 ? 'Отмена' : 'Назад'}
            </Button>
            <Button onClick={() => submit()}>Далее</Button>
          </Spaces>
        </RightAlign>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin-bottom: 20px;
`;
