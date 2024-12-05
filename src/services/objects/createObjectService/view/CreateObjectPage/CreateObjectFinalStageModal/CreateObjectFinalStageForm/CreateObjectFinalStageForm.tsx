import { SpaceLine } from 'ui-kit/SpaceLine';
import { Form } from 'antd';
import React, { FC, useMemo } from 'react';
import {
  Field,
  FieldDescrition,
  FieldForAdditionalAddresses,
  GridContainer,
  GridContainerForAdditionalAddresses,
  PageTitle,
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
import { AddressField } from './AddressField';

export const CreateObjectFinalStageForm: FC<
  CreateObjectFinalStageFormProps
> = ({ formId, createObjectData, houseManagements, heatingStations }) => {
  const houseManagrmentName = useMemo(() => {
    if (createObjectData?.houseManagement === null) {
      return 'Без домоуправления';
    }
    return houseManagements?.find(
      (elem) => elem.id === createObjectData?.houseManagement,
    )?.name;
  }, [houseManagements, createObjectData]);

  const objectCategory = createObjectData?.objectCategory;

  const preparedLivingType =
    createObjectData?.livingHouseType &&
    LivingHouseTypeDictionary[createObjectData?.livingHouseType];

  const preparedNonResidentialType =
    createObjectData?.nonResidentialHouseType &&
    NonResidentialHouseTypeDictionary[
      createObjectData?.nonResidentialHouseType
    ];

  const heatingStation = heatingStations?.items?.find(
    (elem) => elem.id === createObjectData?.heatingStationId,
  );

  return (
    <Form id={formId} onSubmitCapture={() => {}}>
      <Wrapper>
        <PageTitle>1. Адрес объекта</PageTitle>

        <GridContainer>
          <FieldDescrition>Основной адрес</FieldDescrition>
          <AddressField createObjectData={createObjectData} />
        </GridContainer>
        <SpaceLine />

        {createObjectData?.additionalAddresses?.length ? (
          <>
            <GridContainer>
              <FieldDescrition>
                Адреса, под которыми известен объект
              </FieldDescrition>
              <GridContainerForAdditionalAddresses>
                {createObjectData.additionalAddresses.map((elem) => (
                  <FieldForAdditionalAddresses
                    key={`${elem.street}${elem.house}${elem.corpus}`}
                  >
                    ул. {elem.street},
                    <SpacesHouseNumber>{elem.house}</SpacesHouseNumber>
                    {elem.corpus ? `к. ${elem.corpus} ` : ''}
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
        <GridContainer>
          <FieldDescrition> Год постройки </FieldDescrition>
          <Field>{createObjectData?.constructionYear || '-'}</Field>
        </GridContainer>
        <SpaceLine />
      </Wrapper>
    </Form>
  );
};
