import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { Flex } from '01/shared/ui/Layout/Flex';
import { DatePickerTT, InputTT, SwitchTT } from '01/tt-components';
import { allResources } from '01/tt-components/localBases';
import { StyledSelect } from '01/_pages/IndividualDeviceEdit/components/IndividualDeviceEditForm';
import { Form, Select } from 'antd';
import { useForm } from 'effector-forms/dist';
import { useStore } from 'effector-react';
import moment from 'moment';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { addIndividualDeviceForm } from '../../models';
import { FormHeader } from '../Header';
import DeviceIcons from '../../../../../_components/DeviceIcons';
import { DeviceIcon } from '01/_pages/Devices/components/DeviceBlock/DeviceBlock';

export const BaseInfoStage = () => {
  const { id } = useParams<{ id: string }>();

  const mountPlaces = useStore($individualDeviceMountPlaces);

  const { fields } = useForm(addIndividualDeviceForm);

  const onChange = (e: any) => {
    const field = (fields as any)[e.target.name];

    if (!field) return;

    field.onChange(e.target.value);
  };

  const onChangeDateField = (name: string) => (value: moment.Moment | null) => {
    if (!value || !(fields as any)[name]) return;

    (fields as any)[name].onChange(value.toISOString());
  };

  return (
    <>
      <IndividualDeviceMountPlacesGate apartmentId={Number(id)} />

      <FormHeader>Общие данные о приборе</FormHeader>

      <FormWrap>
        <FormItem label="Тип ресурса">
          <StyledSelect
            placeholder="Выберите тип ресурса"
            onChange={(value: any) => fields.resource.onChange(value)}
            value={fields.resource.value || undefined}
          >
            {allResources.map((elem) => (
              <Select.Option value={elem.value}>
                <Flex>
                  <DeviceIcon
                    icon={DeviceIcons[elem.value]?.icon}
                    fill={DeviceIcons[elem.value]?.color}
                  />
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
          <InputTT
            placeholder="Введите модель прибора"
            name="model"
            onChange={onChange}
            value={fields.model.value}
          />
          <ErrorMessage>
            {fields.model.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Серийный номер">
          <InputTT
            type="number"
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

        <FormItem label="Первичные показания прибора">
          <InputTT
            type="number"
            placeholder="Введите первичные показания"
            disabled
          />
        </FormItem>

        <FormItem label="Дата ввода в эксплуатацию">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={onChangeDateField('lastCommercialAccountingDate')}
            value={getDatePickerValue(
              fields.lastCommercialAccountingDate.value
            )}
          />
          <ErrorMessage>
            {fields.lastCommercialAccountingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Дата последней проверки прибора">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={onChangeDateField('lastCheckingDate')}
            value={getDatePickerValue(fields.lastCheckingDate.value)}
          />
          <ErrorMessage>
            {fields.lastCheckingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Дата следующей проверки прибора">
          <DatePicker
            format="DD.MM.YYYY"
            onChange={onChangeDateField('futureCheckingDate')}
            value={getDatePickerValue(fields.futureCheckingDate.value)}
          />
          <ErrorMessage>
            {fields.futureCheckingDate.errorText({
              required: 'Это поле обязательное',
            })}
          </ErrorMessage>
        </FormItem>

        <FormItem label="Магнитная пломба">
          <Flex>
            <SwitchTT
              onChange={fields.isInstalled.onChange}
              checked={fields.isInstalled.value}
            />
            <InputTT
              placeholder="Тип пломбы"
              disabled={!fields.isInstalled.value}
              value={fields.magneticSealTypeName.value}
              onChange={onChange}
              name="magneticSealTypeName"
            />
          </Flex>
        </FormItem>

        <FormItem label="Дата установки пломбы">
          <DatePicker
            format="DD.MM.YYYY"
            disabled={!fields.isInstalled.value}
            onChange={onChangeDateField('magneticSealInstallationDate')}
            value={getDatePickerValue(
              fields.magneticSealInstallationDate.value
            )}
          />
        </FormItem>
      </FormWrap>
    </>
  );
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

const FormWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 4px 20px;
  margin-bottom: -10px;
`;
