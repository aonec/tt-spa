import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { StyledSelect } from '01/shared/ui/Select/components';
import React, { FC, useState } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { PageTitle } from '../CreateObjectPage.styled';
import {
  AddTPButton,
  ButtonPadding,
  Footer,
  GridContainer,
  RightButtonBlock,
  Wrapper,
} from './CreateObjectMainInfoStage.styled';
import { CreateObjectMainInfoStageProps } from './CreateObjectMainInfoStage.types';
import { CreateNewHeatingPointModal } from './CreateNewHeatingPointModal/CreateNewHeatingPointModal';
import { EditNewHeatingPointModal } from './EditNewHeatingPointModal';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({
  houseManagements,
}) => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);

  return (
    <>
      <CreateNewHeatingPointModal
        isModalOpen={isModalOpen}
        setModalOpen={setModalOpen}
      />
      <EditNewHeatingPointModal />
      <Wrapper>
        <PageTitle>Основная информация </PageTitle>

        <FormItem label="Домоуправления">
          <StyledSelect
            placeholder="Выберите из списка"
            onChange={(value) => {}}
          >
            {houseManagements?.map(
              (houseManagement) =>
                houseManagement.name && (
                  <Select.Option value={houseManagement.name}>
                    {houseManagement.name}
                  </Select.Option>
                )
            )}
          </StyledSelect>
        </FormItem>

        <SpaceLine />

        <GridContainer>
          <FormItem label="Категория объекта">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => {}}
            >
              {houseManagements?.map(
                (houseManagement) =>
                  houseManagement.name && (
                    <Select.Option value={houseManagement.name}>
                      {houseManagement.name}
                    </Select.Option>
                  )
              )}
            </StyledSelect>
          </FormItem>

          <FormItem label="Тип объекта">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => {}}
            >
              {houseManagements?.map(
                (houseManagement) =>
                  houseManagement.name && (
                    <Select.Option value={houseManagement.name}>
                      {houseManagement.name}
                    </Select.Option>
                  )
              )}
            </StyledSelect>
          </FormItem>
        </GridContainer>

        <SpaceLine />

        <GridContainer>
          <FormItem label="Тепловой пункт">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => {}}
            >
              {houseManagements?.map(
                (houseManagement) =>
                  houseManagement.name && (
                    <Select.Option value={houseManagement.name}>
                      {houseManagement.name}
                    </Select.Option>
                  )
              )}
            </StyledSelect>
          </FormItem>

          <AddTPButton
            className="ant-btn-link"
            onClick={() => setModalOpen((prev) => !prev)}
          >
            + Добавить новый ТП
          </AddTPButton>
        </GridContainer>

        <Footer>
          <Button type="ghost">Назад</Button>
          <RightButtonBlock>
            <ButtonPadding>
              <Button type="ghost">Отмена</Button>
            </ButtonPadding>
            <Button sidePadding={25} onClick={() => {}}>
              Далее
            </Button>
          </RightButtonBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
