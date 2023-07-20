import React, { FC, useCallback, useEffect } from 'react';
import {
  FormWrapper,
  InputWrapper,
  SwitchWrapper,
  TextWrapper,
} from './WorkWithIndividualDeviceForm.styled';
import { WorkWithIndividualDeviceFormProps } from './WorkWithIndividualDeviceForm.types';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { Switch } from 'antd';
import {
  DatePickerNative,
  fromEnter,
} from 'ui-kit/shared_components/DatePickerNative';
import { WorkWithIndividualDeviceType } from '../../../workWithIndividualDeviceService.types';
import { dataKey, getDataKey } from './WorkWithIndividualDeviceForm.utils';
import { useForm } from 'effector-forms';
import { Select } from 'ui-kit/Select';
import { FormItem } from 'ui-kit/FormItem';
import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { Input } from 'ui-kit/Input';
import moment from 'moment';
import { EIndividualDeviceRateType, EResourceType } from 'api/types';
import { useParams } from 'react-router';
import { useUnit } from 'effector-react';
import { individualDeviceMountPlacesService } from 'services/devices/individualDeviceMountPlacesService';
import { ClosingReasonsDictionary } from 'dictionaries';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import { Loader } from 'ui-kit/Loader';
import { AutoComplete } from 'ui-kit/AutoComplete';
import { WorkWithIndividualDeviceInputs } from './WorkWithIndividualDeviceInputs';
import { Form } from 'antd';
import { SpaceLine } from '01/shared/ui/Layout/Space/Space';
import {
  NewIndividualDeviceTitleLookup,
  OldIndividualDeviceTitleLookup,
} from './WorkWithIndividualDeviceForm.constants';

const { IndividualDeviceMountPlacesGate } =
  individualDeviceMountPlacesService.gates;

export const WorkWithIndividualDeviceForm: FC<
  WorkWithIndividualDeviceFormProps
> = ({
  type,
  form,
  contractors,
  handleFetchSerialNumberForCheck,
  isSerialNumberAllreadyExist,
  isSerialNumberLoading,
  handleFetchModels,
  models,
  individualDevice,
}) => {
  const { id } = useParams<{ id: string }>();

  const isCheck = type === WorkWithIndividualDeviceType.check;
  const isSwitch = type === WorkWithIndividualDeviceType.switch;
  const isReopen = type === WorkWithIndividualDeviceType.reopen;

  const mountPlaces = useUnit(
    individualDeviceMountPlacesService.outputs.$individualDeviceMountPlaces,
  );

  const { fields, set } = useForm(form);

  const next = useSwitchInputOnEnter(dataKey, true);

  const enterKeyDownHandler = useCallback(
    (index: number) => fromEnter(() => next(index)),
    [next],
  );

  useEffect(() => {
    if (isCheck) {
      const oldDeviceReadings = fields.oldDeviceReadings.value;

      set({ newDeviceReadings: oldDeviceReadings });
    }
  }, [isCheck, fields.oldDeviceReadings.value, set]);

  return (
    <Form>
      {!isCheck && (
        <>
          <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />
          <FormWrapper>
            <FormItem label="Тип ресурса">
              <ResourceSelect disabled resource={fields.resource.value} />
            </FormItem>

            <FormItem label="Место установки">
              <Select
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
              </Select>
              <ErrorMessage>
                {fields.mountPlaceId.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
            </FormItem>

            <FormItem label="Серийный номер">
              <Input
                data-reading-input={getDataKey(isSwitch)}
                disabled={!isSwitch}
                type="text"
                placeholder="Введите серийный номер прибора"
                onChange={(e) => fields.serialNumber.onChange(e.target.value)}
                name="serialNumber"
                value={fields.serialNumber.value}
                onKeyDown={enterKeyDownHandler(0)}
                onBlur={(value) =>
                  value.target.value &&
                  handleFetchSerialNumberForCheck(value.target.value)
                }
                suffix={<Loader show={isSerialNumberLoading} />}
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

            <FormItem label="Модель прибора">
              <AutoComplete
                data-reading-input={getDataKey(isSwitch)}
                disabled={!isSwitch}
                value={fields.model.value}
                placeholder="Введите модель прибора"
                onChange={(value) => {
                  fields.model.onChange(value);
                  handleFetchModels(value);
                }}
                options={(models || []).map((elem) => ({ value: elem })) || []}
                onKeyDown={enterKeyDownHandler(1)}
              />
              <ErrorMessage>
                {fields.model.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
            </FormItem>

            <InputWrapper>
              <FormItem label="Разрядность">
                <Input
                  data-reading-input={getDataKey(isSwitch)}
                  disabled={!isSwitch}
                  type="number"
                  placeholder="Введите разрядность прибора"
                  name="bitDepth"
                  onChange={(e) =>
                    fields.bitDepth.onChange(Number(e.target.value))
                  }
                  value={fields.bitDepth.value || undefined}
                  onKeyDown={enterKeyDownHandler(2)}
                />
                <ErrorMessage>
                  {fields.bitDepth.errorText({
                    required: 'Это поле обязательное',
                  })}
                </ErrorMessage>
              </FormItem>

              <FormItem label="Множитель">
                <Input
                  data-reading-input={getDataKey(isSwitch)}
                  disabled={!isSwitch}
                  type="number"
                  placeholder="Введите множитель прибора"
                  name="scaleFactor"
                  onChange={(e) =>
                    fields.scaleFactor.onChange(Number(e.target.value))
                  }
                  value={fields.scaleFactor.value || undefined}
                  onKeyDown={enterKeyDownHandler(3)}
                />
                <ErrorMessage>
                  {fields.scaleFactor.errorText({
                    required: 'Это поле обязательное',
                  })}
                </ErrorMessage>
              </FormItem>
            </InputWrapper>

            <FormItem label="Дата ввода в эксплуатацию">
              <DatePickerNative
                dataKey={getDataKey(isSwitch)}
                disabled={!isSwitch}
                value={fields.lastCommercialAccountingDate.value}
                onChange={fields.lastCommercialAccountingDate.onChange}
                placeholder="Введите дату"
                onKeyDown={enterKeyDownHandler(4)}
              />
              <ErrorMessage>
                {fields.lastCommercialAccountingDate.errorText({
                  required: 'Это поле обязательное',
                })}
              </ErrorMessage>
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
                value={fields.rateType.value}
                onChange={(value) =>
                  value && fields.rateType.onChange(value as any)
                }
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
                value={fields.oldDeviceClosingReason.value || undefined}
                onChange={fields.oldDeviceClosingReason.onChange as any}
                showAction={['focus']}
              >
                {Object.entries(ClosingReasonsDictionary).map(([key, elem]) => (
                  <Select.Option value={key} key={key}>
                    {elem}
                  </Select.Option>
                ))}
              </Select>
            </FormItem>
          </FormWrapper>

          <SwitchWrapper>
            <Switch
              checked={fields.isPolling.value}
              onChange={fields.isPolling.onChange}
            />
            <TextWrapper
              onClick={() => fields.isPolling.onChange(!fields.isPolling.value)}
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
            onChange={(incomingValue: string) => {
              const value = moment(incomingValue);

              fields.lastCheckingDate.onChange(
                value.utcOffset(0, true).toISOString(),
              );

              const nextCheckingDate = moment(value);

              if (!fields.resource.value) return;

              const nextYear =
                value?.year() +
                (fields.resource.value === EResourceType.Electricity ? 16 : 6);

              nextCheckingDate.set('year', nextYear);

              fields.futureCheckingDate.onChange(
                nextCheckingDate.utcOffset(0, true).toISOString(),
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
            dataKey={getDataKey(!isReopen)}
            onKeyDown={enterKeyDownHandler(isCheck ? 1 : 8)}
            disabled={isReopen}
            onChange={(date) =>
              fields.futureCheckingDate.onChange(
                moment(date).utcOffset(0, true).toISOString(),
              )
            }
            value={fields.futureCheckingDate.value}
          />
          <ErrorMessage>
            {fields.futureCheckingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>
      </FormWrapper>

      <SpaceLine />

      {!isCheck && (
        <WorkWithIndividualDeviceInputs
          model={individualDevice.model || ''}
          resource={individualDevice.resource}
          serialNumber={individualDevice.serialNumber || ''}
          rateType={individualDevice.rateType}
          readings={fields.oldDeviceReadings.value}
          onChange={(readings) => {
            fields.oldDeviceReadings.onChange(readings);
          }}
          title={OldIndividualDeviceTitleLookup[type]}
        />
      )}

      <WorkWithIndividualDeviceInputs
        model={fields.model.value}
        resource={fields.resource.value}
        serialNumber={fields.serialNumber.value}
        rateType={fields.rateType.value}
        readings={fields.newDeviceReadings.value}
        onChange={(readings) => fields.newDeviceReadings.onChange(readings)}
        title={NewIndividualDeviceTitleLookup[type]}
      />
      <ErrorMessage>
        {fields.newDeviceReadings.errorText({
          required: 'Введите хотя бы одно показание',
          validReadings: 'Введенное показание не может быть меньше предыдущего',
        })}
      </ErrorMessage>

      <SpaceLine />

      <FormWrapper>
        <FormItem label="Пломба">
          <Input
            data-reading-input={getDataKey(!isCheck)}
            onKeyDown={enterKeyDownHandler(isReopen ? 0 : 9)}
            disabled={isCheck}
            placeholder="Номер пломбы"
            value={fields.sealNumber.value || undefined}
            onChange={(e) => fields.sealNumber.onChange(e.target.value)}
            name="sealNumber"
          />
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            dataKey={getDataKey(!isCheck)}
            onKeyDown={enterKeyDownHandler(isReopen ? 1 : 10)}
            disabled={isCheck}
            value={fields.sealInstallationDate.value}
            onChange={fields.sealInstallationDate.onChange}
            placeholder="Введите дату"
          />
        </FormItem>
      </FormWrapper>

      <FormItem label="Монтажная организация">
        <Select
          data-reading-input={getDataKey(!isCheck)}
          disabled={isCheck}
          onChange={(value: any) =>
            value && fields.contractorId.onChange(value)
          }
          value={fields.contractorId.value || void 0}
          placeholder="Выберите монтажную организацию"
          showAction={['focus']}
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
