import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import React, { FC, useEffect, useMemo } from 'react';
import { Button } from 'ui-kit/Button';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { PageTitle } from '../CreateObjectPage.styled';
import {
  ButtonPadding,
  Footer,
  GridContainer,
  RightButtonBlock,
  Title,
  WrapperLinkButton,
  ButtonSC,
} from './CreateObjectMainInfoStage.styled';
import {
  CreateObjectMainInfoStageProps,
  ObjectMainInfoValues,
} from './CreateObjectMainInfoStage.types';
import { useFormik } from 'formik';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
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
} from 'api/types';
import { sortBy } from 'lodash';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { createHeatingStationService } from 'services/objects/heatingStations/createHeatingStationService';
import { editHeatingStationService } from 'services/objects/heatingStations/editHeatingStationService';
import { SelectedEntityPanel } from 'ui-kit/shared/SelectedEntityPanel';

const {
  inputs: { handleHeatingStationCreated },
} = createHeatingStationService;
const {
  inputs: { handleHeatingStationEdited },
} = editHeatingStationService;
const withoutHouseMagement = 'withoutHouseMagement';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({
  houseManagements,
  goBackStage,
  onPageCancel,
  handleSubmitCreateObject,
  createObjectData,
  heatingStations,
  openCreateHeatingStationModal,
  openEditHeatingStationModal,
  heatingStationCapture,
}) => {
  const { gates } = createObjectService;
  const { HeatingStationsFetchGate } = gates;

  const heatingStationsValues = heatingStations?.items;

  const initialValues = useMemo(
    () => ({
      houseManagement: createObjectData?.houseManagement || null,
      objectCategory: createObjectData?.objectCategory || null,
      livingHouseType: createObjectData?.livingHouseType || null,
      nonResidentialHouseType:
        createObjectData?.nonResidentialHouseType || null,
      heatingStationId: createObjectData?.heatingStationId || null,
    }),
    [createObjectData],
  );

  const { values, handleSubmit, setFieldValue, errors } =
    useFormik<ObjectMainInfoValues>({
      initialValues,
      enableReinitialize: true,
      onSubmit: (data) => {
        handleSubmitCreateObject(data);
      },
      validateOnChange: false,
      validationSchema,
    });

  useEffect(
    () =>
      handleHeatingStationCreated.watch((newHeatingStationData) =>
        setFieldValue('heatingStationId', newHeatingStationData?.id),
      ),
    [setFieldValue],
  );
  useEffect(
    () =>
      handleHeatingStationEdited.watch((editedHeatingStationData) =>
        setFieldValue('heatingStationId', editedHeatingStationData?.id),
      ),
    [setFieldValue],
  );

  const selectedHeatingStation = heatingStationsValues?.find(
    (station) => station.id === values.heatingStationId,
  );

  return (
    <>
      <HeatingStationsFetchGate />
      <>
        <PageTitle>Основная информация </PageTitle>

        <FormItem label="Домоуправления">
          <Select
            placeholder="Выберите из списка"
            onChange={(value) => {
              if (value === withoutHouseMagement) {
                return setFieldValue('houseManagement', null);
              }
              setFieldValue('houseManagement', value);
            }}
            value={
              values.houseManagement === null
                ? withoutHouseMagement
                : values.houseManagement || undefined
            }
          >
            <Select.Option value={withoutHouseMagement}>
              Без домоуправления
            </Select.Option>
            {houseManagements?.map(
              (houseManagement) =>
                houseManagement.name && (
                  <Select.Option
                    value={houseManagement.id}
                    key={houseManagement.id}
                  >
                    {houseManagement.name}
                  </Select.Option>
                ),
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
                setFieldValue('objectCategory', value);
                setFieldValue('livingHouseType', null);
                setFieldValue('nonResidentialHouseType', null);
              }}
              value={values.objectCategory || undefined}
            >
              {Object.values(EHouseCategory).map((category) => (
                <Select.Option value={category} key={category}>
                  {HouseCategoryDictionary[category]}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.objectCategory}</ErrorMessage>
          </FormItem>

          <FormItem label="Тип объекта">
            {!values.objectCategory && (
              <Select disabled placeholder="Выберите" />
            )}
            {values.objectCategory === EHouseCategory.Living && (
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

            {values.objectCategory === EHouseCategory.NonResidential && (
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
                    ),
                )}
              </Select>
              <ErrorMessage>{errors.heatingStationId}</ErrorMessage>
            </FormItem>
            <WrapperLinkButton>
              <LinkButton onClick={openCreateHeatingStationModal}>
                + Добавить новый ТП
              </LinkButton>
            </WrapperLinkButton>
          </GridContainer>
        )}

        {values.heatingStationId && (
          <FormItem label="Тепловой пункт">
            <SelectedEntityPanel
              children={<Title>{selectedHeatingStation?.name}</Title>}
              onEdit={() => {
                openEditHeatingStationModal();
                selectedHeatingStation &&
                  heatingStationCapture(selectedHeatingStation);
              }}
              onRemove={() => {
                setFieldValue('heatingStationId', null);
              }}
            />
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
            <ButtonSC onClick={() => handleSubmit()}>Далее</ButtonSC>
          </RightButtonBlock>
        </Footer>
      </>
    </>
  );
};
