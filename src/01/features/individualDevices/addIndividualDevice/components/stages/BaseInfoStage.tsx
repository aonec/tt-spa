import { AutoComplete, Form, Switch } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useEvent, useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';
import { EIndividualDeviceRateType, EResourceType } from 'myApi';
import { DatePickerNative } from 'ui-kit/shared_components/DatePickerNative';
import { SwitchWrapper, TextWrapper } from './BaseInfoStage.styled';
import { getIndividualDeviceRateNumByName } from 'utils/getIndividualDeviceRateNumByName';
import {
  $isFetchSerialNumberLoading,
  $serialNumberForChecking,
  handleFetchSerialNumberForCheck,
} from '01/features/individualDevices/switchIndividualDevice/models/init';
import { displayContractorsService } from 'services/contractors/displayContractorsService';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { Loader } from 'ui-kit/Loader';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { getBitDepthAndScaleFactor } from 'utils/getBitDepthAndScaleFactor';
import { displayIndividualDeviceAndNamesService } from 'services/devices/individualDevices/displayIndividualDeviceAndNamesService';

const {
  outputs,
  gates: { ContractorsGate },
} = displayContractorsService;
const { IndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

const {
  outputs: { $individualDevicesNames },
  gates: { IndividualDevicecModelsGate },
} = displayIndividualDeviceAndNamesService;

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore(
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
  );
  const modelNames = useStore($individualDevicesNames);

  const { fields } = useForm(addIndividualDeviceForm);

  const contractors = useStore(outputs.$contractors);

  const onChange = (e: any) => {
    const field = (fields as any)[e.target.name];

    if (!field) return;

    field.onChange(e.target.value);
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

            fields.futureCheckingDate.onChange(nextCheckingDate.format());
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
        <Input
          type="number"
          placeholder="Введите текущие показания"
          onChange={onChangeDefaultReadings(1)}
          value={fields.defaultReadings.value.value1 || undefined}
        />
        <ErrorMessage>
          {fields.defaultReadings.errorText({
            requiredFirstField: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>

      {rateNum >= 2 && (
        <FormItem label="Первичные текущие прибора (Ночь)">
          <Input
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(2)}
            value={fields.defaultReadings.value.value2 || undefined}
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
          <Input
            type="number"
            placeholder="Введите текущие показания"
            onChange={onChangeDefaultReadings(3)}
            value={fields.defaultReadings.value.value3 || undefined}
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

  const eventFetchSerialNumberForCheck = useEvent(
    handleFetchSerialNumberForCheck,
  );
  const serialNumberForChecking = useStore($serialNumberForChecking);

  const isFetchSerialNumberLoading = useStore($isFetchSerialNumberLoading);

  const isSerialNumberAllreadyExist =
    serialNumberForChecking?.items?.[0]?.serialNumber ===
    fields.serialNumber.value;

  return (
    <Wrap>
      <IndividualDevicecModelsGate model={modelNameDebounced} />
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />
      <ContractorsGate />
      <FormHeader>Общие данные о приборе</FormHeader>

      <FormWrap>
        <FormItem label="Тип ресурса">
          <ResourceSelect
            onChange={(value: any) => {
              fields.resource.onChange(value);

              if (!value) return;

              const { bitDepth, scaleFactor } =
                getBitDepthAndScaleFactor(value);

              fields.bitDepth.onChange(bitDepth);
              fields.scaleFactor.onChange(scaleFactor);
            }}
            resource={fields.resource.value}
          />

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
          <Input
            type="text"
            placeholder="Введите серийный номер прибора"
            onChange={onChange}
            name="serialNumber"
            value={fields.serialNumber.value}
            onBlur={(value) =>
              value.target.value &&
              eventFetchSerialNumberForCheck(value.target.value)
            }
            suffix={<Loader show={isFetchSerialNumberLoading} />}
            
          />
          <ErrorMessage>
            {fields.serialNumber.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
          {isSerialNumberAllreadyExist && (
            <ErrorMessage>
              Данный серийный номер уже существует в базе
            </ErrorMessage>
          )}
        </FormItem>

        <FormItem label="Место установки">
          <Select
            placeholder="Выберите место установки"
            value={fields.mountPlaceId.value || undefined}
            onChange={(value: any) => fields.mountPlaceId.onChange(value)}
          >
            {mountPlaces?.map((elem) => (
              <Select.Option value={elem.id} key={elem.id}>{elem.description}</Select.Option>
            ))}
          </Select>
          <ErrorMessage>
            {fields.mountPlaceId.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Разрядность">
          <Input
            type="number"
            placeholder="Введите разрядность прибора"
            name="bitDepth"
            onChange={onChange}
            value={fields.bitDepth.value || undefined}
          />
          <ErrorMessage>
            {fields.bitDepth.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Множитель">
          <Input
            type="number"
            placeholder="Введите множитель прибора"
            name="scaleFactor"
            onChange={onChange}
            value={fields.scaleFactor.value || undefined}
          />
          <ErrorMessage>
            {fields.scaleFactor.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>
      </FormWrap>

      <FormItem label="Тариф прибора">
        <Select
          placeholder="Выберите тариф прибора"
          value={fields.rateType.value}
          onChange={(value) => value && fields.rateType.onChange(value as any)}
        >
          <Select.Option value={EIndividualDeviceRateType.OneZone}>
            Одна зона
          </Select.Option>
          <Select.Option value={EIndividualDeviceRateType.TwoZone}>
            Две зоны
          </Select.Option>
          <Select.Option value={EIndividualDeviceRateType.ThreeZone}>
            Три зоны
          </Select.Option>
        </Select>
      </FormItem>

      <FormWrap>
        <FormItem
          label={`Первичные показания прибора${rateNum !== 1 ? ' (День)' : ''}`}
        >
          <Input
            type="number"
            placeholder="Введите первичные показания"
            onChange={onChangeStartupReadings(1)}
            value={fields.startupReadings.value.value1 || undefined}
          />
          <ErrorMessage>
            {fields.startupReadings.errorText({
              requiredFirstField: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        {rateNum >= 2 && (
          <FormItem label="Первичные показания прибора (Ночь)">
            <Input
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(2)}
              value={fields.startupReadings.value.value2 || undefined}
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
            <Input
              type="number"
              placeholder="Введите первичные показания"
              onChange={onChangeStartupReadings(3)}
              value={fields.startupReadings.value.value3 || undefined}
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

      <SwitchWrapper>
        <Switch
          checked={fields.isPolling.value}
          onChange={fields.isPolling.onChange}
        />
        <TextWrapper>Дистанционное снятие показаний</TextWrapper>
      </SwitchWrapper>

      <FormWrap>{bottomDateFields}</FormWrap>

      <FormWrap>
        <FormItem label="Пломба">
          <Input
            placeholder="Номер пломбы"
            value={fields.magneticSealTypeName.value || undefined}
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
        <Select
          onChange={(value: any) =>
            value && fields.contractorId.onChange(value)
          }
          value={fields.contractorId.value || void 0}
          placeholder="Выберите монтажную организацию"
        >
          {contractors?.map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.name}
            </Select.Option>
          ))}
        </Select>
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
