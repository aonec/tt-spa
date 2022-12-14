import { ErrorMessage } from '01/shared/ui/ErrorMessage';
import { MagistralsDisctionary } from 'dictionaries';
import { useFormik } from 'formik';
import moment from 'moment';
import {
  EHousingMeteringDeviceType,
  EMagistralType,
  UpdatePipeHousingMeteringDeviceRequest,
} from 'myApi';
import React, { FC } from 'react';
import { HousingMeteringDeviceDictionary } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm/CommonDataStep/CommonDataStep.constants';
import { Button } from 'ui-kit/Button';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import {
  Footer,
  GridContainer,
  Wrapper,
} from './EditHousingMeteringDeviceCommonInfo.styled';
import {
  EditHousingMeteringDeviceCommonInfoFormTypes,
  EditHousingMeteringDeviceCommonInfoProps,
} from './EditHousingMeteringDeviceCommonInfo.types';

export const EditHousingMeteringDeviceCommonInfo: FC<EditHousingMeteringDeviceCommonInfoProps> = ({
  housingMeteringDevice,
  handleSubmitForm,
  deviceId,
  onCancel,
}) => {
  const initialValues = {
    resource: housingMeteringDevice?.resource || null,
    housingMeteringDeviceType:
      housingMeteringDevice?.housingMeteringDeviceType || null,
    model: housingMeteringDevice?.model || null,
    serialNumber: housingMeteringDevice?.serialNumber || null,
    lastCheckingDate: housingMeteringDevice?.lastCheckingDate
      ? moment(housingMeteringDevice?.lastCheckingDate)
      : null,
    futureCheckingDate: housingMeteringDevice?.futureCheckingDate
      ? moment(housingMeteringDevice?.futureCheckingDate)
      : null,
    diameter: housingMeteringDevice?.diameter || null,
    pipeNumber: housingMeteringDevice?.hubConnection?.hub?.pipeNumber || null,
    magistral: housingMeteringDevice?.hubConnection?.hub?.magistral || null,
    city: housingMeteringDevice?.address?.address?.mainAddress?.city || null,
    street:
      housingMeteringDevice?.address?.address?.mainAddress?.street || null,
    housingStockNumber:
      housingMeteringDevice?.address?.address?.mainAddress?.number || null,
    corpus:
      housingMeteringDevice?.address?.address?.mainAddress?.corpus || null,
  };

  const {
    values,
    handleSubmit,
    setFieldValue,
    errors,
  } = useFormik<EditHousingMeteringDeviceCommonInfoFormTypes>({
    initialValues,
    enableReinitialize: true,
    onSubmit: () => {
      {
        const form: UpdatePipeHousingMeteringDeviceRequest = {
          serialNumber: values.serialNumber,
          lastCheckingDate: values.lastCheckingDate?.toISOString(true),
          futureCheckingDate: values.futureCheckingDate?.toISOString(true),
          housingMeteringDeviceType: values.housingMeteringDeviceType as EHousingMeteringDeviceType,
          resource: values.resource,
          model: values.model,
          pipe: {
            diameter: Number(values.diameter),
            pipeNumber: Number(values.pipeNumber),
            magistral: values.magistral as EMagistralType,
          },
        };
        console.log(form);
        handleSubmitForm({
          deviceId: Number(deviceId),
          request: form,
        });
      }
    },
    validateOnChange: false,
  });

  return (
    <Wrapper>
      <FormItem label="Тип ресурса">
        <ResourceSelect resource={values.resource} disabled />
      </FormItem>

      <FormItem label="Тип прибора">
        <Select
          placeholder="Выберите из списка"
          onChange={(value) =>
            setFieldValue('housingMeteringDeviceType', value)
          }
          value={values.housingMeteringDeviceType || undefined}
        >
          {[
            EHousingMeteringDeviceType.FlowMeter,
            EHousingMeteringDeviceType.TemperatureSensor,
          ].map((deviceType) => (
            <Select.Option value={deviceType} key={deviceType}>
              {
                HousingMeteringDeviceDictionary[
                  deviceType as EHousingMeteringDeviceType
                ]
              }
            </Select.Option>
          ))}
        </Select>
        <ErrorMessage>{errors.housingMeteringDeviceType}</ErrorMessage>
      </FormItem>

      <FormItem label="Модель прибора">
        <Input
          placeholder="Введите"
          value={values.model || undefined}
          onChange={(value) => setFieldValue('model', value.target.value)}
        />
        <ErrorMessage> {errors.model} </ErrorMessage>
      </FormItem>

      <FormItem label="Серийный номер">
        <Input
          placeholder="Введите"
          value={values.serialNumber || undefined}
          onChange={(value) =>
            setFieldValue('serialNumber', value.target.value)
          }
        />
        <ErrorMessage> {errors.serialNumber} </ErrorMessage>
      </FormItem>

      <GridContainer>
        <FormItem label="Диаметр прибора, мм">
          <Input
            placeholder="Введите"
            value={values.diameter || undefined}
            onChange={(value) => setFieldValue('diameter', value.target.value)}
          />
          <ErrorMessage> {errors.diameter} </ErrorMessage>
        </FormItem>

        <FormItem label="Номер трубы">
          <Input
            placeholder="Введите"
            value={values.pipeNumber || undefined}
            onChange={(value) =>
              setFieldValue('pipeNumber', value.target.value)
            }
          />
          <ErrorMessage> {errors.pipeNumber} </ErrorMessage>
        </FormItem>
      </GridContainer>

      <FormItem label="Магистраль">
        <Select
          placeholder="Выберите из списка"
          onChange={(value) => setFieldValue('magistral', value)}
          value={values.magistral || undefined}
        >
          {Object.values(EMagistralType).map((magistralType) => (
            <Select.Option value={magistralType} key={magistralType}>
              {MagistralsDisctionary[magistralType as EMagistralType]}
            </Select.Option>
          ))}
        </Select>
        <ErrorMessage>{errors.magistral}</ErrorMessage>
      </FormItem>

      <GridContainer>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue('futureCheckingDate', moment(date).add('year', 4));
            }}
            placeholder="Выберите"
            format="DD.MM.YYYY"
          />
        </FormItem>

        <FormItem label="Дата следующей поверки прибора">
          <DatePicker
            value={values.futureCheckingDate}
            onChange={(date) => setFieldValue('futureCheckingDate', date)}
            placeholder="Выберите"
            format="DD.MM.YYYY"
          />
        </FormItem>
      </GridContainer>

      <FormItem label="Город">
        <Input value={values.city || undefined} disabled />
      </FormItem>

      <GridContainer>
        <FormItem label="Улица">
          <Input value={values.street || undefined} disabled />
        </FormItem>

        <GridContainer>
          <FormItem label="Номер дома">
            <Input value={values.housingStockNumber || undefined} disabled />
          </FormItem>

          <FormItem label="Корпус">
            <Input value={values.corpus || undefined} disabled />
          </FormItem>
        </GridContainer>
      </GridContainer>

      <Footer>
        <Button type="ghost" onClick={() => onCancel()}>
          Отмена
        </Button>
        <Button type="default" sidePadding={10} onClick={() => handleSubmit()}>
          Создать
        </Button>
      </Footer>
    </Wrapper>
  );
};
