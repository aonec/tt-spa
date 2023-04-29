import { ErrorMessage } from 'ui-kit/ErrorMessage';
import { MagistralsDisctionary } from 'dictionaries';
import { useFormik } from 'formik';
import moment from 'moment';
import { EHousingMeteringDeviceType, EMagistralType } from 'myApi';
import React, { FC } from 'react';
import { HousingMeteringDeviceDictionary } from 'services/nodes/addPipeNodeCommonDeviceService/view/AddCommonDeviceForm/CommonDataStep/CommonDataStep.constants';
import { Button } from 'ui-kit/Button';
import { DatePicker } from 'ui-kit/DatePicker';
import { FormItem } from 'ui-kit/FormItem';
import { Input } from 'ui-kit/Input';
import { Select } from 'ui-kit/Select';
import { ResourceSelect } from 'ui-kit/shared_components/ResourceSelect';
import {
  ButtonSC,
  Footer,
  GridContainer,
  PipeInfoWrapper,
  PipeMagistralWrapper,
  Wrapper,
} from './EditHousingMeteringDeviceCommonInfo.styled';
import {
  EditHousingMeteringDeviceCommonInfoFormTypes,
  EditHousingMeteringDeviceCommonInfoProps,
} from './EditHousingMeteringDeviceCommonInfo.types';
import { getUpdateNodeDataFromFormik } from './EditHousingMeteringDeviceCommonInfo.utils';

export const EditHousingMeteringDeviceCommonInfo: FC<
  EditHousingMeteringDeviceCommonInfoProps
> = ({
  housingMeteringDevice,
  handleSubmitForm,
  onCancel,
  communicationPipes,
}) => {
  const initialValues: EditHousingMeteringDeviceCommonInfoFormTypes = {
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
    communicationPipeId: housingMeteringDevice?.communicationPipe?.id || null,
  };

  const { values, handleSubmit, setFieldValue, errors } =
    useFormik<EditHousingMeteringDeviceCommonInfoFormTypes>({
      initialValues,
      enableReinitialize: true,
      onSubmit: (values) => {
        handleSubmitForm(getUpdateNodeDataFromFormik(values));
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
          disabled
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

      <GridContainer>
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
            type="number"
            placeholder="Введите"
            value={values.serialNumber || undefined}
            onChange={(value) =>
              setFieldValue('serialNumber', value.target.value)
            }
          />
          <ErrorMessage> {errors.serialNumber} </ErrorMessage>
        </FormItem>
      </GridContainer>

      <GridContainer>
        <FormItem label="Труба">
          <Select
            onChange={(id) => setFieldValue('communicationPipeId', id)}
            value={values.communicationPipeId || undefined}
          >
            {communicationPipes.map((pipe) => (
              <Select.Option value={pipe.id} key={pipe.id}>
                <PipeInfoWrapper>
                  №{pipe.number}
                  <PipeMagistralWrapper>
                    ({pipe.diameter} мм),
                    {pipe.magistral &&
                      `${
                        MagistralsDisctionary[pipe.magistral as EMagistralType]
                      } маг.`}
                  </PipeMagistralWrapper>
                </PipeInfoWrapper>
              </Select.Option>
            ))}
          </Select>
        </FormItem>
      </GridContainer>

      <GridContainer>
        <FormItem label="Дата поверки прибора">
          <DatePicker
            value={values.lastCheckingDate}
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue(
                'futureCheckingDate',
                date ? moment(date).add(4, 'year') : '',
              );
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

      <Footer>
        <Button type="ghost" onClick={() => onCancel()}>
          Отмена
        </Button>
        <ButtonSC onClick={() => handleSubmit()}>Сохранить</ButtonSC>
      </Footer>
    </Wrapper>
  );
};
