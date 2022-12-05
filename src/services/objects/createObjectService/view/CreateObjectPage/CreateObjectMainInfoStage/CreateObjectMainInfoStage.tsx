import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React, { FC } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { PageTitle } from '../CreateObjectPage.styled';
import {
  ButtonPadding,
  FlexEnd,
  FlexStart,
  Footer,
  GridContainer,
  InputTypeDisplayingDiv,
  RightButtonBlock,
  Title,
  Wrapper,
  WrapperLinkButton,
  XIconSc,
} from './CreateObjectMainInfoStage.styled';
import {
  CreateObjectMainInfoStageProps,
  ObjectMainInfoValues,
} from './CreateObjectMainInfoStage.types';
import { useFormik } from 'formik';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import {
  HouseCategoryDictionary,
  LivingHouseTypeDictionary,
  NonResidentialHouseTypeDictionary,
  validationSchema,
} from './createObjectMainInfoStage.constants';
import { createObjectService } from 'services/objects/createObjectService/createObjectService.model';
import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
} from 'myApi';
import { sortBy } from 'lodash';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({
  houseManagements,
  goBackStage,
  onPageCancel,
  handleSubmitCreateObject,
  createObjectData,
  heatingStations,
}) => {
  const heatingStationsValues = heatingStations?.items;

  const initialValues = {
    houseManagement: createObjectData?.houseManagement || null,
    objectCategotry: createObjectData?.objectCategotry || null,
    livingHouseType: createObjectData?.livingHouseType || null,
    nonResidentialHouseType: createObjectData?.nonResidentialHouseType || null,
    heatingStationId: createObjectData?.heatingStationId || null,
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<ObjectMainInfoValues>({
    initialValues,
    enableReinitialize: true,
    onSubmit: (data) => {
      handleSubmitCreateObject(data);
    },
    validateOnChange: false,
    validationSchema,
  });

  const selectedHeatingStation = heatingStations?.items?.find(
    (station) => station.id === values.heatingStationId
  );

  return (
    <>
      <Wrapper>
        <PageTitle>Основная информация </PageTitle>

        <FormItem label="Домоуправления">
          <Select
            placeholder="Выберите из списка"
            onChange={(value) => setFieldValue('houseManagement', value)}
            value={values.houseManagement || undefined}
          >
            {houseManagements?.map(
              (houseManagement) =>
                houseManagement.name && (
                  <Select.Option
                    value={houseManagement.id}
                    key={houseManagement.id}
                  >
                    {houseManagement.name}
                  </Select.Option>
                )
            )}
          </Select>
          <ErrorMessage>{errors.houseManagement}</ErrorMessage>
        </FormItem>

        <SpaceLine />

        <GridContainer>
          <FormItem label="Категория объекта">
            <Select
              placeholder="Выберите из списка"
              onChange={(value) => {
                setFieldValue('objectCategotry', value);
                setFieldValue('livingHouseType', null);
                setFieldValue('nonResidentialHouseType', null);
              }}
              value={values.objectCategotry || undefined}
            >
              {Object.values(EHouseCategory).map((category) => (
                <Select.Option value={category} key={category}>
                  {HouseCategoryDictionary[category]}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.objectCategotry}</ErrorMessage>
          </FormItem>

          <FormItem label="Тип объекта">
            {!values.objectCategotry && (
              <Select disabled placeholder="Выберите" />
            )}
            {values.objectCategotry === EHouseCategory.Living && (
              <>
                <Select
                  placeholder="Выберите из списка"
                  onChange={(value) => setFieldValue('livingHouseType', value)}
                  value={values.livingHouseType || undefined}
                >
                  {Object.values(ELivingHouseType).map((houseType) => (
                    <Select.Option value={houseType} key={houseType}>
                      {LivingHouseTypeDictionary[houseType]}
                    </Select.Option>
                  ))}
                </Select>
                <ErrorMessage>{errors.livingHouseType}</ErrorMessage>
              </>
            )}

            {values.objectCategotry === EHouseCategory.NonResidential && (
              <>
                <Select
                  placeholder="Выберите из списка"
                  onChange={(value) =>
                    setFieldValue('nonResidentialHouseType', value)
                  }
                  value={values.nonResidentialHouseType || undefined}
                >
                  {Object.values(ENonResidentialHouseType).map((houseType) => (
                    <Select.Option value={houseType} key={houseType}>
                      {NonResidentialHouseTypeDictionary[houseType]}
                    </Select.Option>
                  ))}
                </Select>
                <ErrorMessage>{errors.nonResidentialHouseType}</ErrorMessage>
              </>
            )}
          </FormItem>
        </GridContainer>

        <SpaceLine />

        {!values.heatingStationId && (
          <GridContainer>
            <FormItem label="Тепловой пункт">
              <Select
                placeholder="Выберите из списка"
                onChange={(value) => {
                  setFieldValue('heatingStationId', value);
                }}
                value={values.heatingStationId || undefined}
              >
                {sortBy(heatingStationsValues || [], 'name').map(
                  (heatingStations) =>
                    heatingStations.name && (
                      <Select.Option
                        value={heatingStations.id}
                        key={heatingStations.id}
                      >
                        {heatingStations.name}
                      </Select.Option>
                    )
                )}
              </Select>
              <ErrorMessage>{errors.heatingStationId}</ErrorMessage>
            </FormItem>
            <WrapperLinkButton>
              <LinkButton onClick={() => {}}>+ Добавить новый ТП</LinkButton>
            </WrapperLinkButton>
          </GridContainer>
        )}

        {values.heatingStationId && (
          <FormItem label="Тепловой пункт">
            <InputTypeDisplayingDiv>
              <FlexStart>
                <Title>{selectedHeatingStation?.name}</Title>
              </FlexStart>
              <FlexEnd>
                <XIconSc
                  onClick={() => {
                    setFieldValue('heatingStationId', null);
                  }}
                />
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
