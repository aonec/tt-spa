import { RightAlign } from '01/shared/ui/Layout/RightAlign';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { $creationDeviceStage, addIndividualDeviceForm } from '../models';
import { BaseInfoStage } from './stages/BaseInfoStage';
import { DocumentsStage } from './stages/DocumentsStage';

export const CreateIndividualDeviceForm = () => {
  const stageNumber = useStore($creationDeviceStage);
  const { id } = useParams<{ id: string }>();

  const pages = [<BaseInfoStage />, <DocumentsStage />];

  const { fields } = useForm(addIndividualDeviceForm);

  useEffect(() => {
    fields.apartmentId.onChange(Number(id));
  }, [id]);

  return (
    <Wrap>
      {pages[stageNumber]}

      <Space style={{ height: 20 }} />

      <RightAlign>
        <Spaces flex>
          <ButtonTT color="white">Отмена</ButtonTT>
          <ButtonTT color="blue" onClick={() => {}}>
            {stageNumber === 1 ? 'Создать прибор' : 'Далее'}
          </ButtonTT>
        </Spaces>
      </RightAlign>
    </Wrap>
  );
};

const Wrap = styled.div`
  margin-bottom: 20px;
`;
