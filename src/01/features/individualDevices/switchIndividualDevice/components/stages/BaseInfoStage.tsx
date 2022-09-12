import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { InputTT } from '01/tt-components';
import { allResources } from '01/tt-components/localBases';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { AutoComplete, Form, Select, Switch } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  addIndividualDeviceForm,
  SwitchIndividualDeviceGate,
} from '../../models';
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
import { ReadingsInput } from '../ReadingsInput';
import {
  $individualDevice,
  fetchIndividualDeviceFx,
} from '../../../displayIndividualDevice/models';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { Loader } from '01/components';
import { SwitchWrapper, TextWrapper } from './BaseInfoStage.styled';

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore($individualDeviceMountPlaces);
  const modelNames = useStore($individualDevicesNames);
  const contractors = useStore($contractors);
  const device = useStore($individualDevice);
  const { fields } = useForm(addIndividualDeviceForm);
  const type = useStore(
    SwitchIndividualDeviceGate.state.map(({ type }) => type)
  );
  const isCheck = type === 'check';
  const isReopen = type === 'reopen';
  const isSwitch = type === 'switch';

  const pending = useStore(fetchIndividualDeviceFx.pending);

  const onChange = (e: any) => {
    const field = (fields as any)[e.target.name];

    if (!field) return;

    field.onChange(e.target.value);
  };

  const modelNameDebounced = fields.model.value;

  const bottomDateFields = (
    <FormWrap>
      <FormItem label="Дата последней поверки прибора">
        <DatePickerNative
          disabled={isReopen}
          onChange={(incomingValue: string) => {
            const value = moment(incomingValue);

            fields.lastCheckingDate.onChange(incomingValue);

            const nextCheckingDate = moment(value);

            if (!fields.resource.value) return;

            const nextYear =
              value?.year() +
              (fields.resource.value === EResourceType.Electricity ? 16 : 6);

            nextCheckingDate.set('year', nextYear);

            fields.futureCheckingDate.onChange(
              nextCheckingDate.toISOString(true)
            );
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
          disabled={isReopen}
          onChange={fields.futureCheckingDate.onChange}
          value={fields.futureCheckingDate.value}
        />
        <ErrorMessage>
          {fields.futureCheckingDate.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>
    </FormWrap>
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

  const baseInfo = (
    <FormWrap>
      <FormItem label="Тип ресурса">
        <StyledSelect
          disabled
          placeholder="Выберите тип ресурса"
          onChange={(value: any) => fields.resource.onChange(value)}
          value={fields.resource.value || undefined}
        >
          {allResources.map((elem) => (
            <Select.Option value={elem.value} key={elem.value}>
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

      <FormItem label="Место установки">
        <StyledSelect
          disabled
          placeholder="Выберите место установки"
          value={fields.mountPlaceId.value || undefined}
          onChange={(value: any) => fields.mountPlaceId.onChange(value)}
        >
          {mountPlaces?.map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.description}
            </Select.Option>
          ))}
        </StyledSelect>
        <ErrorMessage>
          {fields.mountPlaceId.errorText({
            required: 'Это поле обязательное',
          })}
        </ErrorMessage>
      </FormItem>

      <FormItem label="Серийный номер">
        <InputTT
          disabled={isCheck || isReopen}
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

      <FormItem label="Модель прибора">
        <StyledAutoComplete
          disabled={isCheck || isReopen}
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

      <Flex>
        <FormItem label="Разрядность">
          <InputTT
            disabled={isCheck || isReopen}
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
        <Space />
        <FormItem label="Множитель">
          <InputTT
            disabled={isCheck || isReopen}
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
      </Flex>

      <FormItem label="Дата ввода в эксплуатацию">
        <DatePickerNative
          disabled={isCheck || isReopen}
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

      {isSwitch && (
        <>
          {rateTypeSelector}
          {selectSwitchReason}

          <SwitchWrapper>
            <Switch
              checked={fields.isPolling.value}
              onChange={fields.isPolling.onChange}
            />
            <TextWrapper>Дистанционное снятие показаний</TextWrapper>
          </SwitchWrapper>
        </>
      )}
    </FormWrap>
  );

  const seal = (
    <>
      <FormWrap>
        <FormItem label="Пломба">
          <Flex>
            <InputTT
              disabled={isCheck}
              placeholder="Номер пломбы"
              value={fields.sealNumber.value}
              onChange={onChange}
              name="sealNumber"
            />
          </Flex>
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            disabled={isCheck}
            value={fields.sealInstallationDate.value}
            onChange={fields.sealInstallationDate.onChange}
            placeholder="Введите дату"
          />
        </FormItem>
      </FormWrap>
      <FormItem label="Монтажная организация">
        <StyledSelect
          disabled={isCheck}
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

  const readingInputs = device && (
    <div style={{ margin: '10px 0' }}>
      {!isCheck && (
        <>
          <ReadingsInput
            title={
              isSwitch
                ? 'Заменяемый прибор'
                : isCheck
                ? 'Прибор до поверки'
                : isReopen
                ? 'Прибор до переоткрытия'
                : ''
            }
            readings={fields.oldDeviceReadings.value}
            onChange={fields.oldDeviceReadings.onChange}
            device={device}
          />
          <Space />
        </>
      )}
      <ReadingsInput
        title={
          isSwitch
            ? 'Новый прибор'
            : isCheck
            ? 'Прибор после поверки'
            : isReopen
            ? 'Прибор после переоткрытия'
            : ''
        }
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
    </div>
  );

  const form = (
    <>
      {!isCheck && (
        <>
          {baseInfo}
          <SpaceLine />
        </>
      )}
      {bottomDateFields}
      <SpaceLine />
      {readingInputs}
      <SpaceLine />
      {seal}
    </>
  );

  return (
    <Wrap>
      <ContractorsGate />
      <IndividualDevicecModelsGate model={modelNameDebounced} />
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />

      {!isCheck && <FormHeader>Общие данные о приборе</FormHeader>}

      {pending ? <Loader show size={32} /> : form}
    </Wrap>
  );
};

export const closingReasons = {
  [EClosingReason.Manually]: 'Плановая замена',
  [EClosingReason.DeviceBroken]: 'Поломка',
  [EClosingReason.CertificateIssued]: 'Выдана справка',
  [EClosingReason.ByLetter]: 'Письмо из УК',
};

const ErrorMessage = styled.div`
  margin-top: 5px;
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
