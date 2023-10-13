import React, { FC } from 'react';
import { useFormik } from 'formik';
import { Switch } from 'antd';
import {
  ButtonSC,
  Footer,
  GridContainer,
  SwitchWrapper,
  TextWrapper,
  Wrapper,
} from './MainInfo.styled';
import { MainInfoProps } from './MainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { UpdateIndividualDeviceRequest } from 'api/types';
import dayjs from 'api/dayjs';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { Button } from 'ui-kit/Button';
import { useSwitchInputOnEnter } from 'hooks/useSwitchInputOnEnter';
import { fromEnter } from 'ui-kit/shared/DatePickerNative';
import { SpaceLine } from 'ui-kit/SpaceLine';

const dataKey = 'edit-individual-device-main-info';

export const MainInfo: FC<MainInfoProps> = ({
  individualDevice,
  handleUpdateDevice,
  mountPlaces,
  onCancel,
  isDeviceUpdating,
  isOperator,
}) => {
  const {
    model,
    serialNumber,
    lastCheckingDate,
    futureCheckingDate,
    resource,
    bitDepth,
    scaleFactor,
    sealInstallationDate,
    deviceMountPlace,
    isPolling,
    sealNumber,
  } = individualDevice;

  const { values, setFieldValue, handleSubmit } = useFormik({
    initialValues: {
      resource: resource,
      model: model,
      serialNumber: serialNumber,
      mountPlaceId: deviceMountPlace?.id,
      bitDepth: bitDepth,
      scaleFactor: scaleFactor,
      isPolling: isPolling,
      lastCheckingDate: lastCheckingDate ? dayjs(lastCheckingDate) : null,
      futureCheckingDate: futureCheckingDate ? dayjs(futureCheckingDate) : null,
      sealNumber: sealNumber,
      sealInstallationDate: sealInstallationDate
        ? dayjs(sealInstallationDate)
        : null,
    },
    enableReinitialize: true,
    onSubmit: (data) => {
      const payload: UpdateIndividualDeviceRequest = {
        serialNumber: data.serialNumber,
        resource: data.resource,
        model: data.model,
        bitDepth: Number(data.bitDepth),
        scaleFactor: Number(data.scaleFactor),
        sealNumber: data.sealNumber,
        sealInstallationDate: !values.sealInstallationDate
          ? null
          : dayjs(values.sealInstallationDate, 'DD.MM.YYYY').format(),
        mountPlaceId: data.mountPlaceId,
        isPolling: data.isPolling,
      };
      const deviceId = individualDevice.id;

      handleUpdateDevice({ deviceId, payload });
    },
  });

  const next = useSwitchInputOnEnter(dataKey, false);

  return (
    <Wrapper>
      <FormItem label="Модель прибора">
        <Input
          disabled={!isOperator}
          value={values.model || undefined}
          placeholder="Укажите модель"
          type="text"
          onChange={(value) => setFieldValue('model', value.target.value)}
          data-reading-input={dataKey}
          onKeyDown={fromEnter(() => next(0))}
        />
      </FormItem>

      <FormItem label="Серийный номер">
        <Input
          disabled={!isOperator}
          value={values.serialNumber || undefined}
          placeholder="Укажите серийный номер"
          type="text"
          onChange={(value) =>
            setFieldValue('serialNumber', value.target.value)
          }
          data-reading-input={dataKey}
          onKeyDown={fromEnter(() => next(1))}
        />
      </FormItem>

      <FormItem label="Место установки">
        <Select
          value={mountPlaces ? values.mountPlaceId || undefined : ''}
          onChange={(value) => setFieldValue('mountPlaceId', value)}
          placeholder="Укажите место"
          disabled={!mountPlaces || !isOperator}
          data-reading-input={dataKey}
          onKeyDown={fromEnter(() => next(2))}
          showAction={['focus']}
        >
          {mountPlaces?.map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.description}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <FormItem label="Разрядность">
        <Input
          disabled={!isOperator}
          placeholder="Укажите разрядность"
          type="number"
          onChange={(value) => setFieldValue('bitDepth', value.target.value)}
          value={values.bitDepth || undefined}
          data-reading-input={dataKey}
          onKeyDown={fromEnter(() => next(3))}
        />
      </FormItem>

      {isOperator && (
        <SwitchWrapper>
          <Switch
            checked={values.isPolling}
            onChange={(value) => setFieldValue('isPolling', value)}
          />
          <TextWrapper>Дистанционное снятие показаний</TextWrapper>
        </SwitchWrapper>
      )}

      <FormItem label="Дата поверки">
        <DatePicker
          disabled
          value={dayjs(values.lastCheckingDate)}
          format="DD.MM.YYYY"
        />
      </FormItem>
      <FormItem label="Дата Следующей поверки">
        <DatePicker
          disabled
          value={dayjs(values.futureCheckingDate)}
          format="DD.MM.YYYY"
        />
      </FormItem>
      <SpaceLine />

      <GridContainer>
        <FormItem label="Дата поверки">
          <DatePicker
            disabled
            value={dayjs(values.lastCheckingDate)}
            format="DD.MM.YYYY"
          />
        </FormItem>
        <FormItem label="Дата Следующей поверки">
          <DatePicker
            disabled
            value={dayjs(values.futureCheckingDate)}
            format="DD.MM.YYYY"
          />
        </FormItem>
      </GridContainer>

      <SpaceLine />

      <GridContainer>
        <FormItem label="Пломба">
          <Input
            placeholder="Укажите номер пломбы"
            type="number"
            onChange={(value) =>
              setFieldValue('sealNumber', value.target.value)
            }
            value={values.sealNumber || undefined}
            data-reading-input={dataKey}
            onKeyDown={fromEnter(() => next(5))}
          />
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePicker
            value={values.sealInstallationDate}
            format="DD.MM.YYYY"
            onChange={(date) => {
              setFieldValue('sealInstallationDate', date);
            }}
            data-reading-input={dataKey}
          />
        </FormItem>
      </GridContainer>

      <Footer>
        <Button type="ghost" onClick={() => onCancel()}>
          Отмена
        </Button>
        <ButtonSC isLoading={isDeviceUpdating} onClick={() => handleSubmit()}>
          Сохранить
        </ButtonSC>
      </Footer>
    </Wrapper>
  );
};
