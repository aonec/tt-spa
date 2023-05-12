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
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import {
  EHouseCategory,
  ELivingHouseType,
  ENonResidentialHouseType,
  HousingStockUpdateRequest,
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
import { ErrorMessage } from 'ui-kit/ErrorMessage';

const HeatingStationsFetchGate =
  createObjectService.gates.HeatingStationsFetchGate;
const HouseManagementsFetchGate =
  createObjectService.gates.HouseManagementsFetchGate;
const withoutHouseMagement = 'withoutHouseMagement';

export const MainInfoTab: FC<MainInfoTabProps> = ({
  housingStock,
  houseManagements,
  openCreateHeatingStationModal,
  openEditHeatingStationModal,
  heatingStations,
  heatingStationCapture,
  onPageCancel,
  handleUpdateHousingStock,
  isHeatingStationsLoading,
  isHouseManagementsLoading,
}) => {
  const initialValues = useMemo(
    () => ({
      houseManagementId: housingStock.houseManagement?.id || null,
      // houseCategory: housingStock.houseCategory || null,
      // livingHouseType: housingStock.livingHouseType || null,
      // nonResidentialHouseType: housingStock.nonResidentialHouseType || null,
      heatingStationId: housingStock.heatingStation?.id || null,
    }),
    [housingStock],
  );

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (data: HousingStockUpdateRequest) => {
      handleUpdateHousingStock(data);
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
      <HouseManagementsFetchGate />
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
                return setFieldValue('houseManagementId', null);
              }
              setFieldValue('houseManagementId', value);
            }}
            value={
              !isHouseManagementsLoading
                ? values.houseManagementId === null
                  ? withoutHouseMagement
                  : values.houseManagementId
                : undefined
            }
            disabled={isHouseManagementsLoading}
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
          <ErrorMessage>{errors.houseManagementId}</ErrorMessage>
        </FormItem>

        {/* <SpaceLine /> */}

        {/* <GridContainer>
          <FormItem label="Категория объекта">
            <Select
              placeholder="Выберите из списка"
              onChange={(value) => {
                setFieldValue('houseCategory', value);
                setFieldValue('livingHouseType', null);
                setFieldValue('nonResidentialHouseType', null);
              }}
              value={values.houseCategory || undefined}
            >
              {Object.values(EHouseCategory).map((category) => (
                <Select.Option value={category} key={category}>
                  {HouseCategoryDictionary[category]}
                </Select.Option>
              ))}
            </Select>
            <ErrorMessage>{errors.houseCategory}</ErrorMessage>
          </FormItem>

          <FormItem label="Тип объекта">
            {!values.houseCategory && (
              <Select disabled placeholder="Выберите" />
            )}
            {values.houseCategory === EHouseCategory.Living && (
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

            {values.houseCategory === EHouseCategory.NonResidential && (
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
        </GridContainer> */}

        {/* <SpaceLine /> */}

        {!values.heatingStationId && (
          <GridContainer>
            <FormItem label="Тепловой пункт">
              <Select
                placeholder="Выберите из списка"
                onChange={(value) => {
                  setFieldValue('heatingStationId', value);
                }}
                value={
                  (isHeatingStationsLoading && values.heatingStationId) ||
                  undefined
                }
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
              <Button type="ghost" onClick={onPageCancel}>
                Отмена
              </Button>
            </ButtonPadding>
            <Button
              // sidePadding={25}
              onClick={() => handleSubmit()}
            >
              Сохранить
            </Button>
          </RightButtonBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
