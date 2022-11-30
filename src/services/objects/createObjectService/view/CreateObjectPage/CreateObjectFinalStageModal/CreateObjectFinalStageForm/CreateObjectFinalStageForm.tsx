import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Form } from 'antd';
import React, { FC } from 'react';
import {
  Field,
  FieldDescrition,
  GridContainer,
  PageTitle,
  Wrapper,
} from './CreateObjectFinalStageForm.styled';
import { CreateObjectFinalStageFormProps } from './CreateObjectFinalStageForm.types';
import { HouseCategoryDictionary } from '../../CreateObjectMainInfoStage/createObjectMainInfoStage.constants';

export const CreateObjectFinalStageForm: FC<CreateObjectFinalStageFormProps> = ({
  formId,
  createObjectData,
  houseManagements,
}) => {
  const houseManagrmentName = houseManagements?.find(
    (e) => e.id === createObjectData?.houseManagement
  )?.name;

  const objectCategory = createObjectData?.objectCategotry 

  return (
    <Form id={formId} onSubmitCapture={() => {}}>
      <Wrapper>
        <PageTitle>1. Адрес объекта</PageTitle>

        <GridContainer>
          <FieldDescrition>Основной адрес</FieldDescrition>
          {createObjectData?.house ? (
            <Field>{`${createObjectData.city}, ул. ${createObjectData.street}, ${createObjectData.house} к. ${createObjectData.corpus}`}</Field>
          ) : (
            <Field>-</Field>
          )}
        </GridContainer>
        <SpaceLine />
        <>
          <GridContainer>
            <FieldDescrition>Индекс</FieldDescrition>
            <Field>{createObjectData?.index || '-'}</Field>
          </GridContainer>
          <SpaceLine />
        </>

        {createObjectData?.additionalAddresses?.length ? (
          createObjectData.additionalAddresses.map((e) => (
            <>
              <GridContainer>
                <FieldDescrition>
                  Адреса, под которыми известен объект
                </FieldDescrition>
                <Field>{`${createObjectData.city}, ул. ${e.street}, ${e.house} к. ${e.corpus}`}</Field>
              </GridContainer>
              <SpaceLine />

              <GridContainer>
                <FieldDescrition>Индекс</FieldDescrition>
                <Field>{e?.index || '-'}</Field>
              </GridContainer>
              <SpaceLine />
            </>
          ))
        ) : (
          <>
            <GridContainer>
              <FieldDescrition>
                Адреса, под которыми известен объект
              </FieldDescrition>
              <Field>-</Field>
            </GridContainer>
            <SpaceLine />
          </>
        )}
        <PageTitle>2. Основная информация </PageTitle>

        <GridContainer>
          <FieldDescrition>Домоуправление</FieldDescrition>
          <Field>{houseManagrmentName || '-'}</Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Категория объекта</FieldDescrition>
          <Field>
            {objectCategory
              ? HouseCategoryDictionary[objectCategory]
              : '-'}
          </Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Тип объекта</FieldDescrition>
          <Field>
            {createObjectData?.livingHouseType ||
              createObjectData?.nonResidentialHouseType ||
              '-'}
          </Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Тепловой пункт</FieldDescrition>
          {createObjectData?.heatingPoint?.heatingPointType ? (
            <Field>{`${createObjectData?.heatingPoint?.heatingPointType} (${createObjectData?.heatingPoint?.heatingPointNumber})`}</Field>
          ) : (
            <Field>-</Field>
          )}
        </GridContainer>
        <SpaceLine />

        <PageTitle>3. Дополнительная информация </PageTitle>

        <GridContainer>
          <FieldDescrition>Число этажей</FieldDescrition>
          <Field>{createObjectData?.floors || '-'}</Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Число подъездов</FieldDescrition>
          <Field>{createObjectData?.entrances || '-'}</Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Лифт</FieldDescrition>
          <Field>{createObjectData?.elevator || '-'}</Field>
        </GridContainer>
        <SpaceLine />
      </Wrapper>
    </Form>
  );
};
