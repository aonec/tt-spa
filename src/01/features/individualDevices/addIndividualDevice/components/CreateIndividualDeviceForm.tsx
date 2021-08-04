import { RightAlign } from '01/shared/ui/Layout/RightAlign';
import { Space, Spaces } from '01/shared/ui/Layout/Space/Space';
import { ButtonTT } from '01/tt-components';
import { useStore } from 'effector-react';
import React from 'react';
import styled from 'styled-components';
import { $creationDeviceStage } from '../models';
import { BaseInfoStage } from './stages/BaseInfoStage';
import { DocumentsStage } from './stages/DocumentsStage';

export const CreateIndividualDeviceForm = () => {
  const stageNumber = useStore($creationDeviceStage);

  const pages = [<BaseInfoStage />, <DocumentsStage />];

  return (
    <Wrap>
      {pages[stageNumber]}

      <Space style={{ height: 20 }} />

      <RightAlign>
        <Spaces flex>
          <ButtonTT color="white">Отмена</ButtonTT>
          <ButtonTT color="blue">
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

