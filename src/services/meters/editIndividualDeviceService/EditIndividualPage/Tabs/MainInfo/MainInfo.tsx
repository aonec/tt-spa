import React, { FC } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Switch } from 'antd';
import {
  ButtonSC,
  Footer,
  GridContainer,
  ResourceTypeWrapper,
  SwitchWrapper,
  TextWrapper,
  Wrapper,
} from './MainInfo.styled';
import { MainInfoProps } from './MainInfo.types';
import { FormItem } from 'ui-kit/FormItem';
import { Select } from 'ui-kit/Select';
import { UpdateIndividualDeviceRequest } from 'myApi';
import moment from 'moment';
import { ResourceNamesDictionary } from 'dictionaries';
import { ResourceIconLookup } from 'ui-kit/shared_components/ResourceIconLookup';
import { Input } from 'ui-kit/Input';
import { DatePicker } from 'ui-kit/DatePicker';
import { Button } from 'ui-kit/Button';

export const MainInfo: FC<MainInfoProps> = ({
  individualDevice,
  handleUpdateDevice,
  mountPlaces,
  onCancel,
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

  const { values, setFieldValue, errors, handleSubmit } = useFormik({
    initialValues: {
      resource: resource,
      model: model,
      serialNumber: serialNumber,
      mountPlaceId: deviceMountPlace?.id,
      bitDepth: bitDepth,
      scaleFactor: scaleFactor,
      isPolling: isPolling,
      lastCheckingDate: lastCheckingDate ? moment(lastCheckingDate) : null,
      futureCheckingDate: futureCheckingDate
        ? moment(futureCheckingDate)
        : null,
      sealNumber: sealNumber,
      sealInstallationDate: sealInstallationDate
        ? moment(sealInstallationDate)
        : null,
    },
    validationSchema: yup.object().shape({
      serialNumber: yup.string().required('Это поле обязательно'),
      lastCheckingDate: yup.string().required('Это поле обязательно'),
      futureCheckingDate: yup.string().required('Это поле обязательно'),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: (data) => {
      const payload: UpdateIndividualDeviceRequest = {
        serialNumber: data.serialNumber,
        resource: data.resource,
        model: data.model,
        bitDepth: data.bitDepth,
        scaleFactor: data.scaleFactor,
        sealNumber: data.sealNumber,
        sealInstallationDate: moment(
          values.sealInstallationDate,
          'DD.MM.YYYY',
        ).toISOString(true),
        mountPlaceId: data.mountPlaceId,
        isPolling: data.isPolling,
      };

      const deviceId = individualDevice.id;

      handleUpdateDevice({ deviceId, payload });
    },
  });
  return (
    <Wrapper>
      <FormItem label="Тип ресурса">
        <Select value={values.resource} disabled>
          <Select.Option key={values.resource} value={values.resource}>
            <ResourceTypeWrapper>
              <ResourceIconLookup resource={values.resource} />
              {ResourceNamesDictionary[values.resource]}
            </ResourceTypeWrapper>
          </Select.Option>
        </Select>
      </FormItem>

      <FormItem label="Модель прибора">
        <Input
          value={values.model || undefined}
          placeholder="Укажите модель"
          type="text"
          onChange={(value) => setFieldValue('model', value.target.value)}
        />
      </FormItem>

      <FormItem label="Серийный номер">
        <Input
          value={values.serialNumber || undefined}
          placeholder="Укажите серийный номер"
          type="text"
          onChange={(value) =>
            setFieldValue('serialNumber', value.target.value)
          }
        />
      </FormItem>

      <FormItem label="Место установки">
        <Select
          value={mountPlaces ? values.mountPlaceId || undefined : ''}
          onChange={(value) => setFieldValue('mountPlaceId', value)}
          placeholder="Укажите место"
          disabled={!mountPlaces}
        >
          {mountPlaces?.map((elem) => (
            <Select.Option value={elem.id} key={elem.id}>
              {elem.description}
            </Select.Option>
          ))}
        </Select>
      </FormItem>

      <GridContainer>
        <FormItem label="Разрядность">
          <Input
            placeholder="Укажите разрядность"
            type="number"
            onChange={(value) => setFieldValue('bitDepth', value.target.value)}
            value={values.bitDepth || undefined}
          />
        </FormItem>
        <FormItem label="Множитель">
          <Input
            placeholder="Укажите множитель"
            type="number"
            onChange={(value) =>
              setFieldValue('scaleFactor', value.target.value)
            }
            value={values.scaleFactor || undefined}
          />
        </FormItem>
      </GridContainer>

      <SwitchWrapper>
        <Switch
          checked={values.isPolling}
          onChange={(value) => setFieldValue('isPolling', value)}
        />
        <TextWrapper>Дистанционное снятие показаний</TextWrapper>
      </SwitchWrapper>

      <FormItem label="Дата поверки">
        <DatePicker
          disabled
          value={moment(values.lastCheckingDate)}
          format="DD.MM.YYYY"
        />
      </FormItem>
      <FormItem label="Дата Следующей поверки">
        <DatePicker
          disabled
          value={moment(values.futureCheckingDate)}
          format="DD.MM.YYYY"
        />
      </FormItem>

      <FormItem label="Пломба">
        <Input
          placeholder="Укажите номер пломбы"
          type="number"
          onChange={(value) => setFieldValue('sealNumber', value.target.value)}
          value={values.sealNumber || undefined}
        />
      </FormItem>

      <FormItem label="Дата установки пломбы">
        <DatePicker
          value={values.sealInstallationDate}
          format="DD.MM.YYYY"
          onChange={(date) => {
            setFieldValue('sealInstallationDate', date);
          }}
        />
      </FormItem>

      <Footer>
        <Button type="ghost" onClick={() => onCancel()}>
          Отмена
        </Button>
        <ButtonSC onClick={() => handleSubmit()}>Сохранить</ButtonSC>
      </Footer>
    </Wrapper>
  );
};
