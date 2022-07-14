import React, { FC, useCallback } from 'react';
import { EResourceType, SwitchHousingDeviceReadingsCreateRequest } from 'myApi';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import {
  BaseInfoWrapper,
  ButtonsWrapper,
  ChangingDeviceInfoWrapper,
  ChangingReasonSelectWrapper,
  CheckingDatesWrapper,
  DeviceResourceOptionWrapper,
  FormSC,
  SealInfoWrapper,
} from './ChangeODPUForm.styled';
import { ChangeODPUFormProps } from './ChangeODPUForm.types';
import {
  checkIsDateNotFuture,
  getDatePickerValue,
} from './ChangeODPUForm.utils';
import { DatePickerNative } from '01/shared/ui/DatePickerNative';
import { useFormik } from 'formik';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import {
  closingReasonDictionary,
  initialValues,
  ODPUPhaseDictionary,
  yearQuarterDictionary,
} from './ChangeODPUForm.constants';
import { ButtonTT } from '01/tt-components';
import { ChangeODPUReadingsContainer } from '../../ChangeODPUReadingsService';

export const ChangeODPUForm: FC<ChangeODPUFormProps> = ({ oldDevice }) => {
  const { values, handleChange, setFieldValue, submitForm } = useFormik({
    initialValues: { ...initialValues, id: oldDevice.id },
    onSubmit: () => {},
  });

  const handleNewReadingsChange = useCallback(
    (newDeviceReadings: SwitchHousingDeviceReadingsCreateRequest[]) => {
      setFieldValue('newDeviceReadings', newDeviceReadings);
    },
    [setFieldValue]
  );

  const handleOldReadingsChange = useCallback(
    (oldDeviceReadings: SwitchHousingDeviceReadingsCreateRequest[]) => {
      setFieldValue('oldDeviceReadings', oldDeviceReadings);
    },
    [setFieldValue]
  );

  return (
    <FormSC onSubmitCapture={submitForm}>
      <BaseInfoWrapper>
        <div id="resourceType">
          <FormItem label="Тип ресурса">
            <Select value={1} disabled>
              <Select.Option value={1}>
                <DeviceResourceOptionWrapper>
                  <ResourceIconLookup resource={EResourceType.Electricity} />
                  <span className="device-resource-name">Электричество</span>
                </DeviceResourceOptionWrapper>
              </Select.Option>
            </Select>
          </FormItem>
        </div>
        <div id="deviceType">
          <FormItem label="Тип прибора">
            <Select
              placeholder="Выберите тип прибора"
              disabled
              value={oldDevice.phaseNumber || void 0}
            >
              {ODPUPhaseDictionary.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </div>
        <div id="deviceModel">
          <FormItem label="Модель прибора">
            <Input
              value={values.model}
              name="model"
              onChange={handleChange}
              placeholder="Введите модель"
            />
          </FormItem>
        </div>
        <div id="serialNumber">
          <FormItem label="Серийный номер">
            <Input
              value={values.serialNumber}
              name="serialNumber"
              onChange={handleChange}
              placeholder="Введите серийный номер"
            />
          </FormItem>
        </div>
        <div id="yearOfManufacture">
          <FormItem label="Год выпуска">
            <DatePicker
              value={getDatePickerValue(values.manufactureYear)}
              onChange={(_, dateString) =>
                setFieldValue('manufactureYear', dateString)
              }
              disabledDate={checkIsDateNotFuture}
              picker="year"
              placeholder="Введите год"
            />
          </FormItem>
        </div>
        <div id="deviceInstallationDate">
          <FormItem label="Дата установки прибора">
            <DatePickerNative
              value={values.openingDate}
              onChange={(value) => setFieldValue('openingDate', value)}
              placeholder="Введите дату"
            />
          </FormItem>
        </div>
        <div id="scaleFactor">
          <FormItem label="Коэффициент">
            <Input
              value={values.scaleFactor}
              onChange={handleChange}
              name="scaleFactor"
              type="number"
              placeholder="Введите коэффициент"
            />
          </FormItem>
        </div>
        <div id="bitDepth">
          <FormItem label="Разрядность">
            <Input
              value={values.bitDepth}
              onChange={handleChange}
              name="bitDepth"
              type="number"
              placeholder="Введите разрядность"
            />
          </FormItem>
        </div>
      </BaseInfoWrapper>
      <CheckingDatesWrapper>
        <FormItem label="Год посл. поверки">
          <DatePicker
            value={getDatePickerValue(values.stateVerificationYear)}
            onChange={(_, dateString) =>
              setFieldValue('stateVerificationYear', dateString)
            }
            picker="year"
            placeholder="Введите год посл. поверки"
          />
        </FormItem>
        <FormItem label="Год след. поверки">
          <DatePicker
            value={getDatePickerValue(values.nextStateVerificationYear)}
            onChange={(_, dateString) =>
              setFieldValue('nextStateVerificationYear', dateString)
            }
            picker="year"
            placeholder="Введите год след. поверки"
          />
        </FormItem>
        <FormItem label="Квартал">
          <Select
            value={values.stateVerificationQuarter || void 0}
            onChange={(value) =>
              setFieldValue('stateVerificationQuarter', value)
            }
            placeholder="Выберите"
          >
            {yearQuarterDictionary.map(({ key, value }) => (
              <Select.Option key={key} value={key}>
                {value}
              </Select.Option>
            ))}
          </Select>
        </FormItem>
        <FormItem label="Интервал">
          <Input
            value={values.stateVerificationIntervalYears}
            name="stateVerificationIntervalYears"
            onChange={handleChange}
            placeholder="Введите интервал"
          />
        </FormItem>
      </CheckingDatesWrapper>
      <ChangingDeviceInfoWrapper>
        <ChangingReasonSelectWrapper>
          <FormItem label="Причина замены">
            <Select
              value={values.oldDeviceClosingReason || void 0}
              onChange={(value) =>
                setFieldValue('oldDeviceClosingReason', value)
              }
              placeholder="Выберите причину замены"
            >
              {closingReasonDictionary.map(({ key, value }) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </FormItem>
        </ChangingReasonSelectWrapper>
      </ChangingDeviceInfoWrapper>
      <ChangeODPUReadingsContainer
        device={oldDevice}
        onChangeNewReadings={handleNewReadingsChange}
        onChangeOldReadings={handleOldReadingsChange}
      />
      <SealInfoWrapper>
        <FormItem label="Номер пломбы">
          <Input
            value={values.sealNumber}
            onChange={handleChange}
            name="sealNumber"
            placeholder="Введите номер пломбы"
          />
        </FormItem>
        <FormItem label="Дата установки пломбы">
          <DatePickerNative
            value={values.sealInstallationDate}
            onChange={(value) => setFieldValue('sealInstallationDate', value)}
            placeholder="Выберите дату"
          />
        </FormItem>
      </SealInfoWrapper>
      <ButtonsWrapper>
        <ButtonTT color="blue" type="submit">
          Заменить прибор
        </ButtonTT>
      </ButtonsWrapper>
    </FormSC>
  );
};
