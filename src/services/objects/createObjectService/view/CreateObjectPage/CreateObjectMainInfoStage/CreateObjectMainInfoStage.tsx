import { SpaceLine } from 'ui-kit/SpaceLine';
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
  HouseManagementWrapper,
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
import { houseManagementsService } from 'services/objects/houseManagementsService';

const {
  inputs: { handleHeatingStationCreated },
} = createHeatingStationService;
const {
  inputs: { handleHeatingStationEdited },
} = editHeatingStationService;

const {
  inputs: { handleHouseManagementCreated },
} = houseManagementsService;

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
  handleOpenHouseManagementModal,
  handleOpenUpdateHouseManagementModal,
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
      hasIndividualHeatingStation:
        createObjectData?.hasIndividualHeatingStation || false,
    }),
    [createObjectData],
  );

  const { values, handleSubmit, setFieldValue, errors, setValues } =
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
  useEffect(
    () =>
      handleHouseManagementCreated.watch((newHouseManagement) =>
        setFieldValue('houseManagement', newHouseManagement?.id),
      ).unsubscribe,
    [setFieldValue],
  );

  const selectedHeatingStation = heatingStationsValues?.find(
    (station) => station.id === values.heatingStationId,
  );

  const selectedHouseManagement = houseManagements?.find(
    (management) => management.id === values.houseManagement,
  );

  return (
    <>
      <HeatingStationsFetchGate />
      <>
        <PageTitle>Основная информация </PageTitle>

        <GridContainer>
          <FormItem label="Категория объекта">
            <Select
              placeholder="Выберите из списка"
              onChange={(value) => {
                setValues({
                  ...values,
                  objectCategory: value as EHouseCategory | null,
                  livingHouseType: null,
                  nonResidentialHouseType: null,
                });
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

        {values.objectCategory === EHouseCategory.Living &&
          !values.houseManagement && (
            <>
              <HouseManagementWrapper>
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

                <WrapperLinkButton>
                  <LinkButton onClick={() => handleOpenHouseManagementModal()}>
                    + Добавить новое домоуправление
                  </LinkButton>
                </WrapperLinkButton>
              </HouseManagementWrapper>
            </>
          )}

        {values.objectCategory === EHouseCategory.Living &&
          values.houseManagement && (
            <FormItem label="Домоуправление">
              <SelectedEntityPanel
                onEdit={() =>
                  handleOpenUpdateHouseManagementModal({
                    name: selectedHouseManagement?.name || '',
                    id: values.houseManagement || '',
                  })
                }
                onRemove={() => {
                  setFieldValue('houseManagement', null);
                }}
              >
                <Title>{selectedHouseManagement?.name}</Title>
              </SelectedEntityPanel>
            </FormItem>
          )}

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
              onEdit={() => {
                openEditHeatingStationModal();
                if (selectedHeatingStation) {
                  heatingStationCapture(selectedHeatingStation);
                }
              }}
              onRemove={() => {
                setFieldValue('heatingStationId', null);
              }}
            >
              <Title>{selectedHeatingStation?.name}</Title>
            </SelectedEntityPanel>
          </FormItem>
        )}
        <GridContainer>
          <FormItem label="Индивидуальный тепловой пункт">
            <Select
              placeholder="Выберите из списка"
              onChange={(value) =>
                setFieldValue('hasIndividualHeatingStation', Boolean(value))
              }
              value={values.hasIndividualHeatingStation ? 1 : 0}
            >
              <Select.Option value={1}>Есть</Select.Option>
              <Select.Option value={0}>Нет</Select.Option>
            </Select>
          </FormItem>
        </GridContainer>

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
