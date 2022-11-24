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
  FlexEnd,
  FlexStart,
  Footer,
  GridContainer,
  InputTypeDisplayingDiv,
  PencilIconSc,
  RightButtonBlock,
  Subtitle,
  Title,
  Wrapper,
  XIconSc,
} from './CreateObjectMainInfoStage.styled';
import { CreateObjectMainInfoStageProps } from './CreateObjectMainInfoStage.types';
import { CreateNewHeatingPointModal } from './CreateNewHeatingPointModal/CreateNewHeatingPointModal';
import { EditNewHeatingPointModal } from './EditNewHeatingPointModal';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({
  houseManagements,
  goBackStage,
  onPageCancel,
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

        {false && (
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
        )}

        {true && (
          <FormItem label="Тепловой пункт">
            <InputTypeDisplayingDiv>
              <FlexStart>
                <Title> ЦТП 2 </Title> <Subtitle> (123456789) </Subtitle>
              </FlexStart>
              <FlexEnd>
                <PencilIconSc />
                <XIconSc />
              </FlexEnd>
            </InputTypeDisplayingDiv>
          </FormItem>
        )}

        <Footer>
          <Button type="ghost" onClick={() => goBackStage()}>
            Назад
          </Button>
          <RightButtonBlock>
            <ButtonPadding>
              <Button type="ghost" onClick={() => onPageCancel()}>
                Отмена
              </Button>
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
