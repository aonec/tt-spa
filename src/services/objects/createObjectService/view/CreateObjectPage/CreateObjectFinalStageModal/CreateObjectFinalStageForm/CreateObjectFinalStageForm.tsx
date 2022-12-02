import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { Form } from 'antd';
import React, { FC } from 'react';
import {
  Field,
  FieldDescrition,
  FieldForAdditionalAddresses,
  GridContainer,
  GridContainerForAdditionalAddresses,
  PageTitle,
  SpacedIndex,
  SpacesHouseNumber,
  Wrapper,
} from './CreateObjectFinalStageForm.styled';
import { CreateObjectFinalStageFormProps } from './CreateObjectFinalStageForm.types';
import {
  HouseCategoryDictionary,
  LivingHouseTypeDictionary,
  NonResidentialHouseTypeDictionary,
} from '../../CreateObjectMainInfoStage/createObjectMainInfoStage.constants';
import { ElevatorDictionary } from '../CreateObjectFinalStageModal.constants';

export const CreateObjectFinalStageForm: FC<CreateObjectFinalStageFormProps> = ({
  formId,
  createObjectData,
  houseManagements,
  heatingStations,
}) => {
  const houseManagrmentName = houseManagements?.find(
    (e) => e.id === createObjectData?.houseManagement
  )?.name;

  const objectCategory = createObjectData?.objectCategotry;

  const preparedLivingType =
    createObjectData?.livingHouseType &&
    LivingHouseTypeDictionary[createObjectData?.livingHouseType];

  const preparedNonResidentialType =
    createObjectData?.nonResidentialHouseType &&
    NonResidentialHouseTypeDictionary[
      createObjectData?.nonResidentialHouseType
    ];

  const heatingStation = heatingStations?.items?.find(
    (e) => e.id === createObjectData?.heatingStationId
  );

  return (
    <Form id={formId} onSubmitCapture={() => {}}>
      <Wrapper>
        <PageTitle>1. Адрес объекта</PageTitle>

        <GridContainer>
          <FieldDescrition>Основной адрес</FieldDescrition>
          {createObjectData?.house ? (
            <Field>
              {createObjectData.city}, ул. {createObjectData.street},
              <SpacesHouseNumber>{createObjectData.house}</SpacesHouseNumber>
              {createObjectData.corpus ? `к. ${createObjectData.corpus} ` : ''}
              {createObjectData.index ? (
                <SpacedIndex>({createObjectData?.index})</SpacedIndex>
              ) : (
                ''
              )}
            </Field>
          ) : (
            <Field>-</Field>
          )}
        </GridContainer>
        <SpaceLine />

        {createObjectData?.additionalAddresses?.length ? (
          <>
            <GridContainer>
              <FieldDescrition>
                Адреса, под которыми известен объект
              </FieldDescrition>
              <GridContainerForAdditionalAddresses>
                {createObjectData.additionalAddresses.map((e, i, arr) => (
                  <FieldForAdditionalAddresses>
                    ул. {e.street},
                    <SpacesHouseNumber>{e.house}</SpacesHouseNumber>
                    {e.corpus ? `к. ${e.corpus} ` : ''}
                    {e.index ? <SpacedIndex>({e?.index})</SpacedIndex> : ''}
                  </FieldForAdditionalAddresses>
                ))}
              </GridContainerForAdditionalAddresses>
            </GridContainer>
            <SpaceLine />
          </>
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
            {objectCategory ? HouseCategoryDictionary[objectCategory] : '-'}
          </Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Тип объекта</FieldDescrition>
          <Field>
            {preparedLivingType || preparedNonResidentialType || '-'}
          </Field>
        </GridContainer>
        <SpaceLine />
        <GridContainer>
          <FieldDescrition>Тепловой пункт</FieldDescrition>
          <Field>{heatingStation?.name || '-'}</Field>
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
          <Field>
            {createObjectData?.elevator
              ? ElevatorDictionary[createObjectData?.elevator]
              : '-'}
          </Field>
        </GridContainer>
        <SpaceLine />
      </Wrapper>
    </Form>
  );
};
