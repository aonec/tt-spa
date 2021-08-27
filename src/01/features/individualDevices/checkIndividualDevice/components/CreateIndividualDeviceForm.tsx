import { RightAlign } from '01/shared/ui/Layout/RightAlign';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { message } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  $creationDeviceStage,
  $isCreateIndividualDeviceSuccess,
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
    $isCreateIndividualDeviceSuccess
  );

  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const pages = [<BaseInfoStage />, <DocumentsStage />];

  const { fields, submit } = useForm(addIndividualDeviceForm);

  useEffect(() => {
    if (!individualDeviceCreationRequestStatus) return;

    history.goBack();
    message.success('Поверка прибора выполнена!');
    resetCreationRequestStatus();
  }, [individualDeviceCreationRequestStatus]);

  useEffect(() => {
    fields.apartmentId.onChange(Number(id));
  }, [id]);

  const onCancel = () =>
    stageNumber === 0 ? history.goBack() : switchStageButtonClicked(0);

  return (
    <Wrap>
      {pages[stageNumber]}

      <Space style={{ height: 20 }} />

      <RightAlign>
        <Spaces flex>
          <ButtonTT color="white" onClick={onCancel}>
            {stageNumber === 0 ? 'Отмена' : 'Назад'}
          </ButtonTT>
          <ButtonTT
            color="blue"
            onClick={stageNumber === 1 ? checkBeforSavingButtonClicked : submit}
          >
            {stageNumber === 1 ? 'Сохранить' : 'Далее'}
          </ButtonTT>
        </Spaces>
      </RightAlign>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-bottom: 20px;
`;
