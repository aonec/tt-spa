import { RightAlign } from '01/shared/ui/Layout/RightAlign';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { message } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { useEffect, useMemo } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'ui-kit/Button';
import {
  $creationDeviceStage,
  $isCreateIndividualDeviceSuccess,
  AddIndividualDeviceDate,
  addIndividualDeviceForm,
  checkBeforSavingButtonClicked,
  resetCreationRequestStatus,
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

  useEffect(() => {
    if (!individualDeviceCreationRequestStatus) return;

    history.goBack();
    message.success('Прибор успешно создан!');
    resetCreationRequestStatus();
  }, [individualDeviceCreationRequestStatus, history]);

  const onCancel = () =>
    stageNumber === 0 ? history.goBack() : switchStageButtonClicked(0);

  const handleSubmit = useMemo(() => {
    if (stageNumber === 1) {
      return () => checkBeforSavingButtonClicked();
    }
    return () => submit();
  }, [stageNumber, submit]);

  return (
    <>
      <AddIndividualDeviceDate id={Number(id)} />
      <Wrap>
        {pages[stageNumber]}

        <Space style={{ height: 20 }} />

        <RightAlign>
          <Spaces flex>
            <Button type="ghost" onClick={onCancel}>
              {stageNumber === 0 ? 'Отмена' : 'Назад'}
            </Button>
            <Button onClick={handleSubmit}>
              {stageNumber === 1 ? 'Создать прибор' : 'Далее'}
            </Button>
          </Spaces>
        </RightAlign>
      </Wrap>
    </>
  );
};

const Wrap = styled.div`
  margin-bottom: 20px;
`;
