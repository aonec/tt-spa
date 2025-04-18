import React, { FC, useEffect, useMemo } from 'react';
import {
  ButtonPadding,
  Footer,
  GridContainer,
  HouseManagementWrapper,
  PageTitle,
  RightButtonBlock,
  Wrapper,
  WrapperLinkButton,
} from './MainInfoTab.styled';
import { MainInfoTabProps } from './MainInfoTab.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { EHouseCategory, HousingStockUpdateRequest } from 'api/types';
import { sortBy } from 'lodash';
import { LinkButton } from 'ui-kit/shared/LinkButton';
import { Button } from 'ui-kit/Button';
import { SelectedEntityPanel } from 'ui-kit/shared/SelectedEntityPanel';
import {
  CreateHeatingStationContainer,
  createHeatingStationService,
} from 'services/objects/heatingStations/createHeatingStationService';
import { EditHeatingStationContainer } from 'services/objects/heatingStations/editHeatingStationService';
import { ErrorMessage } from 'ui-kit/ErrorMessage';

const {
  inputs: { handleHeatingStationCreated },
} = createHeatingStationService;

const withoutHouseMagement = 'withoutHouseMagement';

export const MainInfoTab: FC<MainInfoTabProps> = ({
  houseManagements,
  openCreateHeatingStationModal,
  openEditHeatingStationModal,
  heatingStations,
  heatingStationCapture,
  onPageCancel,
  handleUpdateHousingStock,
  isHeatingStationsLoading,
  isHouseManagementsLoading,
  houseCategory,
  housingStock,
  nonResidentialBuilding,
  handleOpenEditHouseManagementModal,
  handleOpenHouseManagementModal,
}) => {
  const initialValues = useMemo(
    () => ({
      houseManagementId:
        houseCategory === EHouseCategory.Living
          ? housingStock?.houseManagement?.id || null
          : null,
      heatingStationId:
        (houseCategory === EHouseCategory.Living
          ? housingStock?.heatingStation?.id
          : nonResidentialBuilding?.heatingStation?.id) || null,
    }),
    [houseCategory, housingStock, nonResidentialBuilding],
  );

  const { values, handleSubmit, setFieldValue, errors } = useFormik({
    initialValues,
    enableReinitialize: true,
    onSubmit: (data: HousingStockUpdateRequest) => {
      handleUpdateHousingStock(data);
    },
    validateOnChange: false,
    validationSchema: yup.object().shape({
      houseManagement: yup.string().nullable(),
      heatingStationId: yup.string().nullable().required('Обязательное поле'),
    }),
  });

  const heatingStationsValues = heatingStations?.items;
  const selectedHeatingStation = heatingStations?.items?.find(
    (station) => station.id === values.heatingStationId,
  );
  const selectedHouseManagement = houseManagements?.find(
    (management) => management.id === values.houseManagementId,
  );

  useEffect(
    () =>
      handleHeatingStationCreated.watch((newHeatingStationData) =>
        setFieldValue('heatingStationId', newHeatingStationData?.id),
      ),
    [setFieldValue],
  );

  return (
    <>
      <CreateHeatingStationContainer />
      <EditHeatingStationContainer />
      <Wrapper>
        <PageTitle>Основная информация </PageTitle>

        {houseCategory === EHouseCategory.Living &&
          !values.houseManagementId && (
            <HouseManagementWrapper>
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

              <WrapperLinkButton>
                <LinkButton onClick={handleOpenHouseManagementModal}>
                  + Добавить домоуправление
                </LinkButton>
              </WrapperLinkButton>
            </HouseManagementWrapper>
          )}

        {houseCategory === EHouseCategory.Living &&
          values.houseManagementId && (
            <FormItem label="Домоуправление">
              <SelectedEntityPanel
                onEdit={() => {
                  handleOpenEditHouseManagementModal({
                    id: values.houseManagementId || '',
                    name: selectedHouseManagement?.name || '',
                  });
                }}
                onRemove={() => {
                  setFieldValue('houseManagementId', null);
                }}
              >
                {selectedHouseManagement?.name}
              </SelectedEntityPanel>
            </FormItem>
          )}

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
              {selectedHeatingStation?.name}
            </SelectedEntityPanel>
          </FormItem>
        )}

        <Footer>
          <RightButtonBlock>
            <ButtonPadding>
              <Button type="ghost" onClick={onPageCancel}>
                Отмена
              </Button>
            </ButtonPadding>
            <Button onClick={() => handleSubmit()}>Сохранить</Button>
          </RightButtonBlock>
        </Footer>
      </Wrapper>
    </>
  );
};
