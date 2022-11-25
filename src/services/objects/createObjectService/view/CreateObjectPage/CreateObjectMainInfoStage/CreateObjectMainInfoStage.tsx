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
import {
  CreateObjectMainInfoStageProps,
  ObjectMainInfoValues,
} from './CreateObjectMainInfoStage.types';
import { CreateNewHeatingPointModal } from './CreateNewHeatingPointModal/CreateNewHeatingPointModal';
import { EditNewHeatingPointModal } from './EditNewHeatingPointModal';
import { useFormik } from 'formik';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { HeatingPoint } from './NewHeatingPointForm/NewHeatingPointForm.types';
import {
  initialValues,
  validationSchema,
} from './createObjectMainInfoStage.constants';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({
  houseManagements,
  goBackStage,
  onPageCancel,
}) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [
    newHeatingPointModalData,
    setNewHeatingPointModalData,
  ] = useState<HeatingPoint | null>(null);

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<ObjectMainInfoValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (data) => {
      console.log(data);
    },
    validateOnBlur: true,
    validationSchema,
  });

  return (
    <>
      <CreateNewHeatingPointModal
        isCreateModalOpen={isCreateModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        setNewHeatingPointModalData={setNewHeatingPointModalData}
      />
      <EditNewHeatingPointModal
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
        setNewHeatingPointModalData={setNewHeatingPointModalData}
      />
      <Wrapper>
        <PageTitle>Основная информация </PageTitle>

        <FormItem label="Домоуправления">
          <StyledSelect
            placeholder="Выберите из списка"
            onChange={(value) => setFieldValue('houseManagement', value)}
            value={values.houseManagement}
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
          <ErrorMessage>{errors.houseManagement}</ErrorMessage>
        </FormItem>

        <SpaceLine />

        <GridContainer>
          <FormItem label="Категория объекта">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => setFieldValue('objectCategotry', value)}
              value={values.objectCategotry}
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
            <ErrorMessage>{errors.objectCategotry}</ErrorMessage>
          </FormItem>

          <FormItem label="Тип объекта">
            <StyledSelect
              placeholder="Выберите из списка"
              onChange={(value) => setFieldValue('objectType', value)}
              value={values.objectType}
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
            <ErrorMessage>{errors.objectType}</ErrorMessage>
          </FormItem>
        </GridContainer>

        <SpaceLine />

        {!newHeatingPointModalData && (
          <GridContainer>
            <FormItem label="Тепловой пункт">
              <StyledSelect
                placeholder="Выберите из списка"
                onChange={(value) => setFieldValue('heatingPoint', value)}
                value={
                  (values.heatingPoint.heatingPointType,
                  values.heatingPoint.heatingPointNumber)
                }
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
              <ErrorMessage>
                {errors.heatingPoint?.heatingPointType}
              </ErrorMessage>
            </FormItem>

            <AddTPButton
              className="ant-btn-link"
              onClick={() => setCreateModalOpen((prev) => !prev)}
            >
              + Добавить новый ТП
            </AddTPButton>
          </GridContainer>
        )}

        {newHeatingPointModalData && (
          <FormItem label="Тепловой пункт">
            <InputTypeDisplayingDiv>
              <FlexStart>
                <Title>
                  {newHeatingPointModalData.heatingPoint.heatingPointType}
                </Title>
                <Subtitle>
                  ({newHeatingPointModalData.heatingPoint.heatingPointNumber})
                </Subtitle>
              </FlexStart>
              <FlexEnd>
                <PencilIconSc onClick={() => setEditModalOpen(true)} />
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
            <Button sidePadding={25} onClick={() => handleSubmit()}>
              Далее
            </Button>
          </RightButtonBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
