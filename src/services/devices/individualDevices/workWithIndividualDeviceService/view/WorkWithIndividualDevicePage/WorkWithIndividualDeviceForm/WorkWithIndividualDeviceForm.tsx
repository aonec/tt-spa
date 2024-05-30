import React, { FC, useCallback, useEffect } from 'react';
import { Switch, Form } from 'antd';
import dayjs from 'api/dayjs';
import { useParams } from 'react-router';
import { useUnit } from 'effector-react';
import {
  FormWrapper,
  InputWrapper,
  SwitchWrapper,
  TextWrapper,
} from './WorkWithIndividualDeviceForm.styled';
import {
  WorkWithIndividualDeviceFormProps,
  WorkWithIndividualDeviceFormType,
} from './WorkWithIndividualDeviceForm.types';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { DatePickerNative, fromEnter } from 'ui-kit/shared/DatePickerNative';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { dataKey, getDataKey } from './WorkWithIndividualDeviceForm.utils';
import { Select } from 'ui-kit/Select';
import { FormItem } from 'ui-kit/FormItem';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';
import { EIndividualDeviceRateType, EResourceType } from 'api/types';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { SwitchingReasonsDictionary } from 'dictionaries';
import { ResourceSelect } from 'ui-kit/shared/ResourceSelect';
import { Loader } from 'ui-kit/Loader';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { WorkWithIndividualDeviceInputs } from './WorkWithIndividualDeviceInputs';
import { SpaceLine } from 'ui-kit/SpaceLine';
import {
  NewIndividualDeviceTitleLookup,
  OldIndividualDeviceTitleLookup,
  validationSchema,
} from './WorkWithIndividualDeviceForm.constants';
import { useFormik } from 'formik';
import { prepareDeviceReadings } from '../../../workWithIndividualDeviceService.utils';

const { IndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const WorkWithIndividualDeviceForm: FC<
  WorkWithIndividualDeviceFormProps
> = ({
  type,
  contractors,
  handleFetchSerialNumberForCheck,
  isSerialNumberLoading,
  handleFetchModels,
  models,
  individualDevice,
  serialNumberForChecking,
  onSubmitCapture,
  handleSubmitForm,
  deviceInfoForm,
}) => {
  const { id } = useParams<{ id: string }>();

  const isCheck = type === WorkWithIndividualDeviceType.check;
  const isSwitch = type === WorkWithIndividualDeviceType.switch;
  const isReopen = type === WorkWithIndividualDeviceType.reopen;

  const mountPlaces = useUnit(
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
  );

  const { values, setFieldValue, errors, handleSubmit } =
    useFormik<WorkWithIndividualDeviceFormType>({
      initialValues: {
        model: deviceInfoForm?.model || null,
        serialNumber: deviceInfoForm?.serialNumber || null,
        bitDepth: deviceInfoForm?.bitDepth || null,
        scaleFactor: deviceInfoForm?.scaleFactor || null,
        rateType: deviceInfoForm?.rateType || EIndividualDeviceRateType.OneZone,
        sealNumber: deviceInfoForm?.sealNumber || null,
        sealInstallationDate: deviceInfoForm?.sealInstallationDate || null,
        lastCheckingDate: deviceInfoForm?.lastCheckingDate || null,
        futureCheckingDate: deviceInfoForm?.futureCheckingDate || null,
        contractorId: deviceInfoForm?.contractorId || null,
        oldDeviceClosingReason: deviceInfoForm?.oldDeviceClosingReason || null,
        lastCommercialAccountingDate:
          deviceInfoForm?.lastCommercialAccountingDate || null,
        documentsIds: deviceInfoForm?.documentsIds || [],
        isPolling: deviceInfoForm?.isPolling || false,
        mountPlaceId: deviceInfoForm?.mountPlaceId || null,
        oldDeviceReadings:
          deviceInfoForm?.oldDeviceReadings || prepareDeviceReadings([]),
        newDeviceReadings:
          deviceInfoForm?.newDeviceReadings || prepareDeviceReadings([]),
        resource: deviceInfoForm?.resource || null,
      },
      enableReinitialize: true,
      validationSchema,
      onSubmit: (data) => {
        handleSubmitForm(data);
      },
    });

  useEffect(
    () => onSubmitCapture.watch(() => handleSubmit()).unsubscribe,
    [handleSubmit, onSubmitCapture],
  );

  const isSerialNumberAllreadyExist =
    serialNumberForChecking[0]?.serialNumber === values.serialNumber;

  const next = useSwitchInputOnEnter(dataKey, true, false);

  const enterKeyDownHandler = useCallback(
    (index: number) => fromEnter(() => next(index)),
    [next],
  );

  useEffect(() => {
    if (isCheck) {
      const oldDeviceReadings = values.oldDeviceReadings;

      setFieldValue('newDeviceReadings', oldDeviceReadings);
    }
  }, [isCheck, values.oldDeviceReadings, setFieldValue]);

  return (
    <Form>
      {!isCheck && (
        <>
          <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />
          <FormWrapper>
            <FormItem label="Тип ресурса">
              <ResourceSelect disabled resource={values.resource} />
            </FormItem>

            <FormItem label="Место установки">
              <Select
                disabled
                placeholder="Выберите место установки"
                value={values.mountPlaceId || undefined}
                onChange={(value) => setFieldValue('mountPlaceId', value)}
              >
                {mountPlaces?.map((elem) => (
                  <Select.Option value={elem.id} key={elem.id}>
                    {elem.description}
                  </Select.Option>
                ))}
              </Select>
              <ErrorMessage>{errors.mountPlaceId}</ErrorMessage>
            </FormItem>

            <FormItem label="Серийный номер">
              <Input
                data-reading-input={getDataKey(isSwitch)}
                disabled={!isSwitch}
                type="text"
                placeholder="Введите серийный номер прибора"
                value={values.serialNumber || undefined}
                onChange={(e) => setFieldValue('serialNumber', e.target.value)}
                name="serialNumber"
                onKeyDown={enterKeyDownHandler(0)}
                onBlur={(value) =>
                  value.target.value &&
                  handleFetchSerialNumberForCheck(value.target.value)
                }
                suffix={<Loader show={isSerialNumberLoading} />}
              />
              <ErrorMessage>{errors.serialNumber}</ErrorMessage>
              {isSerialNumberAllreadyExist && (
                <ErrorMessage>
                  Данный серийный номер уже существует в базе
                </ErrorMessage>
              )}
            </FormItem>

            <FormItem label="Модель прибора">
              <AutoComplete
                data-reading-input={getDataKey(isSwitch)}
                disabled={!isSwitch}
                value={values.model}
                placeholder="Введите модель прибора"
                onChange={(value) => {
                  setFieldValue('model', String(value));
                  handleFetchModels(String(value));
                }}
                options={(models || []).map((elem) => ({ value: elem })) || []}
                onKeyDown={enterKeyDownHandler(1)}
              />
              <ErrorMessage>{errors.model}</ErrorMessage>
            </FormItem>

            <InputWrapper>
              <FormItem label="Разрядность">
                <Input
                  data-reading-input={getDataKey(isSwitch)}
                  disabled={!isSwitch}
                  type="number"
                  placeholder="Введите разрядность прибора"
                  name="bitDepth"
                  value={values.bitDepth || undefined}
                  onChange={(e) =>
                    setFieldValue('bitDepth', Number(e.target.value))
                  }
                  onKeyDown={enterKeyDownHandler(2)}
                />
                <ErrorMessage>{errors.bitDepth}</ErrorMessage>
              </FormItem>

              <FormItem label="Множитель">
                <Input
                  data-reading-input={getDataKey(isSwitch)}
                  disabled={!isSwitch}
                  type="number"
                  placeholder="Введите множитель прибора"
                  name="scaleFactor"
                  value={values.scaleFactor || undefined}
                  onChange={(e) =>
                    setFieldValue('scaleFactor', Number(e.target.value))
                  }
                  onKeyDown={enterKeyDownHandler(3)}
                />
                <ErrorMessage>{errors.scaleFactor}</ErrorMessage>
              </FormItem>
            </InputWrapper>

            <FormItem label="Дата ввода в эксплуатацию">
              <DatePickerNative
                dataKey={getDataKey(isSwitch)}
                disabled={!isSwitch}
                value={values.lastCommercialAccountingDate}
                onChange={(value) =>
                  setFieldValue('lastCommercialAccountingDate', value)
                }
                placeholder="Введите дату"
                onKeyDown={enterKeyDownHandler(4)}
              />
              <ErrorMessage>{errors.lastCommercialAccountingDate}</ErrorMessage>
            </FormItem>
          </FormWrapper>
        </>
      )}
      {isSwitch && (
        <>
          <FormWrapper>
            <FormItem label="Тариф прибора">
              <Select
                data-reading-input={getDataKey(isSwitch)}
                onKeyDown={enterKeyDownHandler(5)}
                disabled={!isSwitch}
                placeholder="Выберите тариф прибора"
                value={values.rateType}
                onChange={(value) => setFieldValue('rateType', value)}
                showAction={['focus']}
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

            <FormItem label="Причина замены">
              <Select
                data-reading-input={getDataKey(isSwitch)}
                onKeyDown={enterKeyDownHandler(6)}
                disabled={!isSwitch}
                placeholder="Выберите причину замены"
                value={values.oldDeviceClosingReason || undefined}
                onChange={(value) =>
                  setFieldValue('oldDeviceClosingReason', value)
                }
                showAction={['focus']}
                allowClear
              >
                {Object.entries(SwitchingReasonsDictionary).map(
                  ([key, elem]) => (
                    <Select.Option value={key} key={key}>
                      {elem}
                    </Select.Option>
                  ),
                )}
              </Select>
            </FormItem>
          </FormWrapper>

          <SwitchWrapper>
            <Switch
              checked={values.isPolling}
              onChange={(value) => setFieldValue('isPolling', value)}
            />
            <TextWrapper
              onClick={() => setFieldValue('isPolling', !values.isPolling)}
            >
              Дистанционное снятие показаний
            </TextWrapper>
          </SwitchWrapper>
        </>
      )}

      {!isCheck && <SpaceLine />}

      <FormWrapper>
        <FormItem label="Дата последней поверки прибора">
          <DatePickerNative
            dataKey={getDataKey(!isReopen)}
            onKeyDown={enterKeyDownHandler(isCheck ? 0 : 7)}
            disabled={isReopen}
            value={values.lastCheckingDate}
            onChange={(incomingValue: string | null) => {
              const value = dayjs(incomingValue);

              setFieldValue(
                'lastCheckingDate',
                value.utcOffset(0, true).toISOString(),
              );

              if (!values.resource) return;

              const nextYear =
                value?.year() +
                (values.resource === EResourceType.Electricity ? 16 : 6);

              const nextDate = value
                .set('year', nextYear)
                .utcOffset(0, true)
                .toISOString();

              !Boolean(values.futureCheckingDate) &&
                setFieldValue('futureCheckingDate', nextDate);
            }}
          />
          <ErrorMessage>{errors.lastCheckingDate}</ErrorMessage>
        </FormItem>

        <FormItem label="Дата следующей поверки прибора">
          <DatePickerNative
            dataKey={getDataKey(!isReopen)}
            onKeyDown={enterKeyDownHandler(isCheck ? 1 : 8)}
            disabled={isReopen}
            value={values.futureCheckingDate}
            onChange={(date) => {
              setFieldValue(
                'futureCheckingDate',
                dayjs(date).utcOffset(0, true).toISOString(),
              );
            }}
          />
          <ErrorMessage>{errors.futureCheckingDate}</ErrorMessage>
        </FormItem>
      </FormWrapper>

      <SpaceLine />

      {!isCheck && (
        <WorkWithIndividualDeviceInputs
          model={individualDevice.model || ''}
          resource={individualDevice.resource}
          serialNumber={individualDevice.serialNumber || ''}
          rateType={individualDevice.rateType}
          readings={values.oldDeviceReadings}
          onChange={(readings) => {
            setFieldValue('oldDeviceReadings', readings);
          }}
          title={OldIndividualDeviceTitleLookup[type]}
        />
      )}

      <WorkWithIndividualDeviceInputs
        model={values.model}
        resource={values.resource}
        serialNumber={values.serialNumber}
        rateType={values.rateType}
        readings={values.newDeviceReadings}
        onChange={(readings) => setFieldValue('newDeviceReadings', readings)}
        title={NewIndividualDeviceTitleLookup[type]}
      />
      <ErrorMessage>{errors.newDeviceReadings as string}</ErrorMessage>

      <SpaceLine />

      <FormWrapper>
        <FormItem label="Пломба">
          <Input
            data-reading-input={getDataKey(!isCheck)}
            onKeyDown={enterKeyDownHandler(isReopen ? 0 : 9)}
            disabled={isCheck}
            placeholder="Номер пломбы"
            value={values.sealNumber || undefined}
            onChange={(e) => setFieldValue('sealNumber', e.target.value)}
            name="sealNumber"
          />
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            dataKey={getDataKey(!isCheck)}
            onKeyDown={enterKeyDownHandler(isReopen ? 1 : 10)}
            disabled={isCheck}
            value={values.sealInstallationDate}
            onChange={(value) => setFieldValue('sealInstallationDate', value)}
            placeholder="Введите дату"
          />
        </FormItem>
      </FormWrapper>

      <FormItem label="Монтажная организация">
        <Select
          data-reading-input={getDataKey(!isCheck)}
          disabled={isCheck}
          value={values.contractorId || void 0}
          onChange={(value) => setFieldValue('contractorId', value)}
          placeholder="Выберите монтажную организацию"
          showAction={['focus']}
          allowClear
        >
          {(contractors || []).map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.name}
            </Select.Option>
          ))}
        </Select>
      </FormItem>
    </Form>
  );
};
