import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { InputTT } from '01/tt-components';
import { allResources } from '01/tt-components/localBases';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { AutoComplete, Form, Select } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { StockIconTT } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';
import { EIndividualDeviceRateType, EResourceType } from 'myApi';
import { getIndividualDeviceRateNumByName } from '01/_pages/MetersPage/components/MeterDevices/ApartmentReadings';
import {
  $individualDevicesNames,
  IndividualDevicecModelsGate,
} from '01/features/individualDevices/displayIndividualDevicesNames/models';
import { getBitDepthAndScaleFactor } from '../../utils';
import {
  $contractors,
  ContractorsGate,
} from '01/features/contractors/displayContractors/models';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore($individualDeviceMountPlaces);
  const modelNames = useStore($individualDevicesNames);

  const { fields } = useForm(addIndividualDeviceForm);

  const contractors = useStore($contractors);

  const onChange = (e: any) => {
    const field = (fields as any)[e.target.name];

    if (!field) return;

    field.onChange(e.target.value);
  };

  const onChangeDateField = (name: string) => (value: moment.Moment | null) => {
    if (!value || !(fields as any)[name]) return;

    (fields as any)[name].onChange(value.toISOString(true));
  };

  const onChangeStartupReadings = (valueNumber: 1 | 2 | 3 | 4) => (e: any) =>
    fields.startupReadings.onChange({
      ...fields.startupReadings.value,
      [`value${valueNumber}`]:
        e.target.value === '' ? null : Number(e.target.value),
    });

  const onChangeDefaultReadings = (valueNumber: 1 | 2 | 3 | 4) => (e: any) =>
    fields.defaultReadings.onChange({
      ...fields.defaultReadings.value,
      [`value${valueNumber}`]:
        e.target.value === '' ? null : Number(e.target.value),
    });

  const rateNum = getIndividualDeviceRateNumByName(fields.rateType.value);

  const modelNameDebounced = fields.model.value;

  const bottomDateFields = (
    <>
      <FormItem label="Дата последней поверки прибора">
        <DatePickerNative
          onChange={(incomingValue: string) => {
            const value = moment(incomingValue);

            fields.lastCheckingDate.onChange(incomingValue);

            const nextCheckingDate = moment(value);

            if (!fields.resource.value) return;

            const nextYear =
              value?.year() +
              (fields.resource.value === EResourceType.Electricity ? 16 : 6);

            nextCheckingDate.set('year', nextYear);

            fields.futureCheckingDate.onChange(nextCheckingDate.toISOString(true));
          }}
          value={fields.lastCheckingDate.value}
        />
        <ErrorMessage>
          {fields.lastCheckingDate.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>
      <FormItem label="Дата следующей поверки прибора">
        <DatePickerNative
          onChange={fields.futureCheckingDate.onChange}
          value={fields.futureCheckingDate.value}
        />
        <ErrorMessage>
          {fields.futureCheckingDate.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>
    </>
  );

  const defaultReadingsFields = (
    <>
      <FormItem
        label={`Текущие показания прибора${rateNum !== 1 ? ' (День)' : ''}`}
      >
        <InputTT
          type="number"
          placeholder="Введите текущие показания"
          onChange={onChangeDefaultReadings(1)}
          value={fields.defaultReadings.value.value1}
        />
        <ErrorMessage>
          {fields.defaultReadings.errorText({
            requiredFirstField: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>

      {rateNum >= 2 && (
        <FormItem label="Первичные текущие прибора (Ночь)">
          <InputTT
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(2)}
            value={fields.defaultReadings.value.value2}
          />
          <ErrorMessage>
            {fields.defaultReadings.errorText({
              requiredSecondField: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>
      )}
      {rateNum >= 3 && (
        <FormItem>
          <InputTT
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(3)}
            value={fields.defaultReadings.value.value3}
          />
          <ErrorMessage>
            {fields.defaultReadings.errorText({
              requiredThirdField: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>
      )}
    </>
  );

  return (
    <Wrap>
      <IndividualDevicecModelsGate model={modelNameDebounced} />
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />
      <ContractorsGate />
      <FormHeader>Общие данные о приборе</FormHeader>

      <FormWrap>
        <FormItem label="Тип ресурса">
          <StyledSelect
            placeholder="Выберите тип ресурса"
            onChange={(value: any) => {
              fields.resource.onChange(value);

              if (!value) return;

              const { bitDepth, scaleFactor } = getBitDepthAndScaleFactor(
                value
              );

              fields.bitDepth.onChange(bitDepth);
              fields.scaleFactor.onChange(scaleFactor);
            }}
            value={fields.resource.value || undefined}
          >
            {allResources.map((elem) => (
              <Select.Option value={elem.value}>
                <Flex>
                  <StockIconTT
                    icon={DeviceIcons[elem.value]?.icon}
                    fill={DeviceIcons[elem.value]?.color}
                    dark
                  />
                  <Space />
                  <div>{elem.label}</div>
                </Flex>
              </Select.Option>
            ))}
          </StyledSelect>
          <ErrorMessage>
            {fields.resource.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Модель прибора">
          <StyledAutoComplete
            size="large"
            value={fields.model.value}
            placeholder="Введите модель прибора"
            onChange={fields.model.onChange}
            options={modelNames?.map((elem) => ({ value: elem })) || []}
          />
          <ErrorMessage>
            {fields.model.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Серийный номер">
          <InputTT
            type="text"
            placeholder="Введите серийный номер прибора"
            onChange={onChange}
            name="serialNumber"
            value={fields.serialNumber.value}
          />
          <ErrorMessage>
            {fields.serialNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Место установки">
          <StyledSelect
            placeholder="Выберите место установки"
            value={fields.mountPlaceId.value || undefined}
            onChange={(value: any) => fields.mountPlaceId.onChange(value)}
          >
            {mountPlaces?.map((elem) => (
              <Select.Option value={elem.id}>{elem.description}</Select.Option>
            ))}
          </StyledSelect>
          <ErrorMessage>
            {fields.mountPlaceId.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Разрядность">
          <InputTT
            type="number"
            placeholder="Введите разрядность прибора"
            name="bitDepth"
            onChange={onChange}
            value={fields.bitDepth.value}
          />
          <ErrorMessage>
            {fields.bitDepth.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Множитель">
          <InputTT
            type="number"
            placeholder="Введите множитель прибора"
            name="scaleFactor"
            onChange={onChange}
            value={fields.scaleFactor.value}
          />
          <ErrorMessage>
            {fields.scaleFactor.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>
      </FormWrap>

      <FormItem label="Тариф прибора">
        <StyledSelect
          placeholder="Выберите тариф прибора"
          value={fields.rateType.value}
          onChange={(value) => value && fields.rateType.onChange(value as any)}
        >
          <StyledSelect.Option value={EIndividualDeviceRateType.OneZone}>
            Одна зона
          </StyledSelect.Option>
          <StyledSelect.Option value={EIndividualDeviceRateType.TwoZone}>
            Две зоны
          </StyledSelect.Option>
          <StyledSelect.Option value={EIndividualDeviceRateType.ThreeZone}>
            Три зоны
          </StyledSelect.Option>
        </StyledSelect>
      </FormItem>

      <FormWrap>
        <FormItem
          label={`Первичные показания прибора${rateNum !== 1 ? ' (День)' : ''}`}
        >
          <InputTT
            type="number"
            placeholder="Введите первичные показания"
            onChange={onChangeStartupReadings(1)}
            value={fields.startupReadings.value.value1}
          />
          <ErrorMessage>
            {fields.startupReadings.errorText({
              requiredFirstField: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        {rateNum >= 2 && (
          <FormItem label="Первичные показания прибора (Ночь)">
            <InputTT
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(2)}
              value={fields.startupReadings.value.value2}
            />
            <ErrorMessage>
              {fields.startupReadings.errorText({
                requiredSecondField: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </FormItem>
        )}
        {rateNum >= 3 && (
          <FormItem>
            <InputTT
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(3)}
              value={fields.startupReadings.value.value3}
            />
            <ErrorMessage>
              {fields.startupReadings.errorText({
                requiredThirdField: 'Это поле обязательное',
              })}
            </ErrorMessage>
          </FormItem>
        )}

        {rateNum === 1 && defaultReadingsFields}
      </FormWrap>

      {rateNum !== 1 && <FormWrap>{defaultReadingsFields}</FormWrap>}

      <FormItem label="Дата ввода в эксплуатацию">
        <DatePickerNative
          onChange={fields.lastCommercialAccountingDate.onChange}
          value={fields.lastCommercialAccountingDate.value}
        />
        <ErrorMessage>
          {fields.lastCommercialAccountingDate.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>

      <FormWrap>{bottomDateFields}</FormWrap>

      <FormWrap>
        <FormItem label="Пломба">
          <InputTT
            placeholder="Номер пломбы"
            value={fields.magneticSealTypeName.value}
            onChange={onChange}
            name="magneticSealTypeName"
          />
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            onChange={fields.magneticSealInstallationDate.onChange}
            value={fields.magneticSealInstallationDate.value}
          />
        </FormItem>
      </FormWrap>

      <FormItem label="Монтажная организация">
        <StyledSelect
          onChange={(value: any) =>
            value && fields.contractorId.onChange(value)
          }
          value={fields.contractorId.value || void 0}
          placeholder="Выберите монтажную организацию"
        >
          {contractors?.map((elem) => (
            <StyledSelect.Option value={elem.id} key={elem.id}>
              {elem.name}
            </StyledSelect.Option>
          ))}
        </StyledSelect>
      </FormItem>
    </Wrap>
  );
};

const ErrorMessage = styled.div`
  color: red;
`;

const FormItem = styled(Form.Item)`
  width: 100%;
`;

const Wrap = styled.div`
  margin-bottom: -10px;
`;

const FormWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
`;

const StyledAutoComplete = styled(AutoComplete)`
  .ant-select-selector {
    border-radius: 4px !important;
    height: 48px !important;
    padding: 4px 24px !important;

    input {
      padding: 6px 12px 0 12px !important;
    }
  }
`;
