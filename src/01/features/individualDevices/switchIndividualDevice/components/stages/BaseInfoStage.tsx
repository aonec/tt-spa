import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { DatePickerTT, InputTT } from '01/tt-components';
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
import {
  EIndividualDeviceRateType,
  EResourceType,
  EClosingReason,
} from 'myApi';
import {
  $individualDevicesNames,
  IndividualDevicecModelsGate,
} from '01/features/individualDevices/displayIndividualDevicesNames/models';
import {
  $contractors,
  ContractorsGate,
} from '01/features/contractors/displayContractors/models';
import { ReadingsInput } from './ReadingsInput';
import {
  $individualDevice,
  fetchIndividualDeviceFx,
} from '../../../displayIndividualDevice/models';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { Loader } from '01/components';

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore($individualDeviceMountPlaces);
  const modelNames = useStore($individualDevicesNames);
  const contractors = useStore($contractors);
  const device = useStore($individualDevice);
  const { fields } = useForm(addIndividualDeviceForm);

  const pending = useStore(fetchIndividualDeviceFx.pending);

  const onChange = (e: any) => {
    const field = (fields as any)[e.target.name];

    if (!field) return;

    field.onChange(e.target.value);
  };

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

            fields.futureCheckingDate.onChange(nextCheckingDate.toISOString());
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

  const rateTypeSelector = (
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
  );

  const selectSwitchReason = (
    <Form.Item label="Причина замены">
      <StyledSelect
        placeholder="Выберите причину замены"
        value={fields.oldDeviceClosingReason.value || undefined}
        onChange={fields.oldDeviceClosingReason.onChange as any}
      >
        {Object.entries(closingReasons).map(([key, elem]) => (
          <Select.Option value={key} key={key}>
            {elem}
          </Select.Option>
        ))}
      </StyledSelect>
    </Form.Item>
  );

  const form = (
    <>
      <FormWrap>
        <FormItem label="Тип ресурса">
          <StyledSelect
            disabled
            placeholder="Выберите тип ресурса"
            onChange={(value: any) => fields.resource.onChange(value)}
            value={fields.resource.value || undefined}
          >
            {allResources.map((elem) => (
              <Select.Option value={elem.value}>
                <Flex>
                  <StockIconTT
                    icon={DeviceIcons[elem.value]?.icon}
                    dark
                    fill={DeviceIcons[elem.value]?.color}
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
            disabled
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
            disabled
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
            disabled
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
      <FormWrap>
        {rateTypeSelector}
        {selectSwitchReason}
      </FormWrap>
      {device && (
        <>
          <Space />
          <ReadingsInput
            title="Закрываемый прибор"
            readings={fields.oldDeviceReadings.value}
            onChange={fields.oldDeviceReadings.onChange}
            device={device}
          />
          <Space />
          <ReadingsInput
            title="Новый прибор"
            readings={fields.newDeviceReadings.value}
            onChange={fields.newDeviceReadings.onChange}
            device={{
              resource: fields.resource.value!,
              model: fields.model.value,
              serialNumber: fields.serialNumber.value,
              measurableUnitString: device?.measurableUnitString,
              rateType: fields.rateType.value,
            }}
          />
          <ErrorMessage>
            {fields.newDeviceReadings.errorText({
              required: 'Заполните хотя бы одно показание',
            })}
          </ErrorMessage>
        </>
      )}
      <Space />
      <FormItem label="Дата ввода в эксплуатацию">
        <DatePickerNative
          value={fields.lastCommercialAccountingDate.value}
          onChange={fields.lastCommercialAccountingDate.onChange}
          placeholder="Введите дату"
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
          <Flex>
            <InputTT
              placeholder="Номер пломбы"
              value={fields.magneticSealTypeName.value}
              onChange={onChange}
              name="magneticSealTypeName"
            />
          </Flex>
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            value={fields.magneticSealInstallationDate.value}
            onChange={fields.magneticSealInstallationDate.onChange}
            placeholder="Введите дату"
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
    </>
  );

  return (
    <Wrap>
      <ContractorsGate />
      <IndividualDevicecModelsGate model={modelNameDebounced} />
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />

      <FormHeader>Общие данные о приборе</FormHeader>

      {pending ? <Loader show size={32} /> : form}
    </Wrap>
  );
};

export const closingReasons = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
};

function getDatePickerValue(value: string | null) {
  if (value) return moment(value);
}

const ErrorMessage = styled.div`
  color: red;
`;

const DatePicker = styled(DatePickerTT)`
  border-radius: 4px;
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
