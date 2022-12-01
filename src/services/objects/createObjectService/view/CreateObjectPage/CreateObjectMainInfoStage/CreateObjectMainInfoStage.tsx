import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
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
import { CreateNewHeatingStationModal } from './CreateNewHeatingStationModal/CreateNewHeatingStationModal';
import { EditNewHeatingStationModal } from './EditNewHeatingStationModal';
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
import { useEvent } from 'effector-react';

export const CreateObjectMainInfoStage: FC<CreateObjectMainInfoStageProps> = ({
  houseManagements,
  goBackStage,
  onPageCancel,
  handleSubmitCreateObject,
  createObjectData,
  heatingStations,
}) => {
  const [isCreateModalOpen, setCreateModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);

  const [
    isInputTypeDisplayingDivShow,
    setInputTypeDisplayingDivShow,
  ] = useState<boolean>(false);

  const handleCreateHeatingStation = useEvent(
    createObjectService.inputs.handleCreateHeatingStation
  );

  const { gates } = createObjectService;
  const { HeatingStationsFetchGate } = gates;

  const heatingStationsValues = heatingStations?.items;

  const initialValues = {
    houseManagement: createObjectData?.houseManagement || null,
    objectCategotry: createObjectData?.objectCategotry || null,
    livingHouseType: createObjectData?.livingHouseType || null,
    nonResidentialHouseType: createObjectData?.nonResidentialHouseType || null,
    heatingStation: {
      heatingStationType:
        createObjectData?.heatingStation?.heatingStationType || null,
      heatingStationNumber:
        createObjectData?.heatingStation?.heatingStationNumber || null,
    },
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
    validateOnBlur: true,
    validationSchema,
  });

  return (
    <>
      <HeatingStationsFetchGate />
      <CreateNewHeatingStationModal
        isCreateModalOpen={isCreateModalOpen}
        setCreateModalOpen={setCreateModalOpen}
        setNewHeatingStationModalData={(heatingStation) =>
          setFieldValue('heatingStation', heatingStation)
        }
        setInputTypeDisplayingDivShow={setInputTypeDisplayingDivShow}
        handleCreateHeatingStation={handleCreateHeatingStation}
      />
      <EditNewHeatingStationModal
        isEditModalOpen={isEditModalOpen}
        setEditModalOpen={setEditModalOpen}
        setNewHeatingStationModalData={(heatingStation) =>
          setFieldValue('heatingStation', heatingStation)
        }
      />
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

        {!isInputTypeDisplayingDivShow && (
          <GridContainer>
            <FormItem label="Тепловой пункт">
              <Select
                placeholder="Выберите из списка"
                onChange={(value) => {
                  setFieldValue('heatingStation', {
                    ...values.heatingStation,
                    heatingStationType: value,
                  });
                }}
                value={values.heatingStation.heatingStationType || undefined}
              >
                {sortBy(heatingStationsValues, 'name')?.map(
                  (heatingStations) =>
                    heatingStations.name && (
                      <Select.Option value={heatingStations.name}>
                        {heatingStations.name}
                      </Select.Option>
                    )
                )}
              </Select>
              <ErrorMessage>
                {errors.heatingStation?.heatingStationType}
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

        {isInputTypeDisplayingDivShow && (
          <FormItem label="Тепловой пункт">
            <InputTypeDisplayingDiv>
              <FlexStart>
                <Title>{values.heatingStation.heatingStationType}</Title>
                <Subtitle>{values.heatingStation.heatingStationNumber}</Subtitle>
              </FlexStart>
              <FlexEnd>
                <PencilIconSc onClick={() => setEditModalOpen(true)} />
                <XIconSc
                  onClick={() => {
                    setInputTypeDisplayingDivShow(false);
                    setFieldValue('heatingStation', {
                      heatingStationType: '',
                      heatingStationNumber: '',
                    });
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
