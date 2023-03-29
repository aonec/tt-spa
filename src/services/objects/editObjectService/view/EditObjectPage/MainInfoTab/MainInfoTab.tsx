import React, { FC, useMemo } from 'react';
import {
  ButtonPadding,
  Footer,
  GridContainer,
  PageTitle,
  RightButtonBlock,
  Wrapper,
  WrapperLinkButton,
} from './MainInfoTab.styled';
import { MainInfoTabProps } from './MainInfoTab.types';
import { createObjectService } from 'services/objects/createObjectService';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useFormik } from 'formik';
import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
} from 'myApi';
import {
  HouseCategoryDictionary,
  LivingHouseTypeDictionary,
  NonResidentialHouseTypeDictionary,
} from 'services/objects/createObjectService/view/CreateObjectPage/CreateObjectMainInfoStage/createObjectMainInfoStage.constants';
import { sortBy } from 'lodash';
import { LinkButton } from 'ui-kit/shared_components/LinkButton';
import { Button } from 'ui-kit/Button';
import { SelectedEntityPanel } from 'ui-kit/shared_components/SelectedEntityPanel';
import { CreateHeatingStationContainer } from 'services/objects/heatingStations/createHeatingStationService';
import { EditHeatingStationContainer } from 'services/objects/heatingStations/editHeatingStationService';

const HeatingStationsFetchGate =
  createObjectService.gates.HeatingStationsFetchGate;
const withoutHouseMagement = 'withoutHouseMagement';

export const MainInfoTab: FC<MainInfoTabProps> = ({
  housingStock,
  houseManagements,
  openCreateHeatingStationModal,
  openEditHeatingStationModal,
  heatingStations,
  heatingStationCapture,
}) => {
  const initialValues = useMemo(
    () => ({
      houseManagement: housingStock.houseManagement || null,
      objectCategory: housingStock.houseCategory || null,
      livingHouseType: housingStock.livingHouseType || null,
      nonResidentialHouseType: housingStock.nonResidentialHouseType || null,
      heatingStationId: housingStock.heatingStation?.id || null,
    }),
    [housingStock],
  );

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (data) => {
      // handleSubmitCreateObject(data);
    },
    validateOnChange: false,
    // validationSchema,
  });

  const heatingStationsValues = heatingStations?.items;
  const selectedHeatingStation = heatingStations?.items?.find(
    (station) => station.id === values.heatingStationId,
  );

  return (
    <>
      <HeatingStationsFetchGate />
      <CreateHeatingStationContainer />
      <EditHeatingStationContainer />
      <Wrapper>
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
                : values.houseManagement.name || undefined
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
              children={selectedHeatingStation?.name}
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
          <RightButtonBlock>
            <ButtonPadding>
              <Button
                type="ghost"
                onClick={() => {
                  // onPageCancel()
                }}
              >
                Отмена
              </Button>
            </ButtonPadding>
            <Button sidePadding={25} onClick={() => handleSubmit()}>
              Сохранить
            </Button>
          </RightButtonBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
