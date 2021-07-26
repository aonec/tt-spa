import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, Select } from 'antd';
import moment from 'moment';
import { resources } from '../../../tt-components/localBases';
import {
  ButtonTT,
  DatePickerTT,
  Header,
  InputNumberTT,
  InputTT,
  SelectTT,
  StyledFooter,
  StyledFormPage,
  styles,
} from '../../../tt-components';
import {
  EIndividualDeviceRateType,
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from '../../../../myApi';
import { AlertInterface } from '../../../tt-components/interfaces';
import _ from 'lodash';
import { putIndividualDevice } from '../../../_api/apiRequests';
import { Flex } from '01/shared/ui/Layout/Flex';
import {
  $individualDeviceMountPlaces,
  fetchIndividualDeviceMountPlacesFx,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { useStore } from 'effector-react';
import styled from 'styled-components';

interface FormEditODPUInterface {
  currentTabKey: string;
  device: IndividualDeviceResponse;
  setTab: Dispatch<SetStateAction<string>>;
  setAlert: Dispatch<SetStateAction<boolean>>;
  setExistDevice: Dispatch<SetStateAction<any>>;
}

function toMoment(value: string | null): moment.Moment | null {
  return value ? moment(value) : null;
}

const IndividualDeviceEditForm = ({
  currentTabKey,
  device,
  setTab,
  setAlert,
  setExistDevice,
}: FormEditODPUInterface) => {
  const { deviceId } = useParams<{ deviceId: string }>();
  const [validationSchema, setValidationSchema] = useState<any>();

  const {
    address,
    id,
    model,
    serialNumber,
    lastCommercialAccountingDate,
    futureCommercialAccountingDate,
    lastCheckingDate,
    futureCheckingDate,
    resource,
    rateType,
    mountPlace,
    bitDepth,
    scaleFactor,
  } = device;

  const initialValues = {
    resource,
    model,
    serialNumber,
    lastCheckingDate: toMoment(lastCheckingDate),
    futureCheckingDate: futureCheckingDate ? moment(futureCheckingDate) : null,
    lastCommercialAccountingDate: lastCommercialAccountingDate
      ? moment(lastCommercialAccountingDate)
      : null,
    futureCommercialAccountingDate: futureCommercialAccountingDate
      ? moment(futureCommercialAccountingDate)
      : null,
    rateType,
    apartmentId: address?.apartmentId,
    mountPlaceId: null,
    bitDepth: bitDepth,
    scaleFactor: scaleFactor,
  };

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema,
    onSubmit: () => {
      const rateTypeEnum: EIndividualDeviceRateType = values.rateType as EIndividualDeviceRateType;

      const form: UpdateIndividualDeviceRequest = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate?.toISOString(),
        futureCheckingDate: values.futureCheckingDate?.toISOString(),
        lastCommercialAccountingDate: values.lastCommercialAccountingDate?.toISOString(),
        resource: values.resource,
        model: values.model,
        rateType: values.rateType,
        bitDepth: values.bitDepth,
        mountPlaceId: values.mountPlaceId as any,
        scaleFactor: values.scaleFactor,
      };

      putIndividualDevice(id, form).then(({ show, id: existDeviceId }: any) => {
        if (show) {
          setAlert(true);
          setExistDevice(existDeviceId);
        }
      });
    },
  });

  const mountPlaces = useStore($individualDeviceMountPlaces);

  const mountPlaceInit = mountPlaces?.find((elem) => elem.name === mountPlace);

  useEffect(() => {
    if (mountPlaceInit) {
      setFieldValue('mountPlaceId', mountPlaceInit?.id);
    }
  }, [mountPlaceInit]);

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  return (
    <>
      <IndividualDeviceMountPlacesGate />
      <form
        onSubmit={handleSubmit}
        style={{ paddingBottom: 40, maxWidth: 480 }}
      >
        <StyledFormPage hidden={Number(currentTabKey) !== 1}>
          <Form.Item label="Тип ресурса" style={styles.w100}>
            <SelectTT
              name="resource"
              onChange={(value) => {
                setFieldValue('resource', value);
              }}
              options={resources}
              value={values.resource}
              disabled
            />
            <Alert name="resource" />
          </Form.Item>

          <Form.Item label="Модель прибора" style={styles.w100}>
            <InputTT
              name="model"
              placeholder="Укажите модель..."
              type="text"
              onChange={handleChange}
              value={values.model}
              onBlur={handleBlur}
            />
            <Alert name="model" />
          </Form.Item>

          <Form.Item label="Серийный номер" style={styles.w100}>
            <InputTT
              name="serialNumber"
              placeholder="Укажите серийный номер..."
              type="text"
              onChange={handleChange}
              value={values.serialNumber}
              onBlur={handleBlur}
            />
            <Alert name="serialNumber" />
          </Form.Item>

          <Form.Item label="Место установки" style={styles.w100}>
            <StyledSelect
              value={values.mountPlaceId || undefined}
              onChange={(value) => setFieldValue('mountPlaceId', value)}
            >
              {mountPlaces?.map((elem) => (
                <Select.Option value={elem.id}>
                  {elem.description}
                </Select.Option>
              ))}
            </StyledSelect>
          </Form.Item>

          <Flex style={styles.w100}>
            <Form.Item
              label="Разрядность"
              style={{ ...styles.w100, marginRight: 20 }}
            >
              <InputNumberTT
                name="bitDepth"
                placeholder="Укажите разрядность..."
                type="number"
                onChange={(value) => setFieldValue('bitDepth', value)}
                value={values.bitDepth || void 0}
                step="1"
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item label="Множитель" style={styles.w100}>
              <InputNumberTT
                name="scaleFactor"
                placeholder="Укажите множитель..."
                type="number"
                onChange={(value) => setFieldValue('scaleFactor', value)}
                value={values.scaleFactor || void 0}
                step="1"
                onBlur={handleBlur}
              />
            </Form.Item>
          </Flex>

          <Form.Item label="Дата ввода в эксплуатацию" style={styles.w100}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCommercialAccountingDate"
              placeholder="Укажите дату"
              onChange={(date) => {
                setFieldValue('lastCommercialAccountingDate', date);
              }}
              value={values.lastCommercialAccountingDate}
            />
          </Form.Item>

          <Form.Item label="Дата Поверки" style={styles.w100}>
            <DatePickerTT
              format="DD.MM.YYYY"
              name="lastCheckingDate"
              placeholder="Укажите дату..."
              onChange={(date) => {
                console.log(date);
                setFieldValue('lastCheckingDate', date);
                setFieldValue(
                  'futureCheckingDate',
                  moment(date).add(4, 'years')
                );
              }}
              value={values.lastCheckingDate}
            />
            <Alert name="lastCheckingDate" />
          </Form.Item>

          <Form.Item label="Дата Следующей поверки" style={styles.w100}>
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              onChange={(date) => {
                setFieldValue('futureCheckingDate', date);
              }}
              value={values.futureCheckingDate}
              name="futureCheckingDate"
            />
            <Alert name="futureCheckingDate" />
          </Form.Item>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          <Header>Компонент в разработке</Header>
        </StyledFormPage>

        <StyledFooter form>
          <ButtonTT color="blue" type={'submit'}>
            Сохранить
          </ButtonTT>

          <NavLink to={`/housingMeteringDevices/${deviceId}/`}>
            <ButtonTT style={{ marginLeft: 16 }} color="white">
              Отмена
            </ButtonTT>
          </NavLink>
        </StyledFooter>
      </form>
    </>
  );
};

export default IndividualDeviceEditForm;

const StyledSelect = styled(Select)`
  height: 48px;
  .ant-select-selector {
    height: 100% !important;
    padding: 8px 24px !important;
    border-radius: 4px;

    span {
      font-size: 16px;
      line-height: 32px;
    }
  }
  .ant-select-arrow {
    padding: 0 28px !important;
  }
  .ant-select-item {
    margin: 0 !important;
    //border: 1px solid black;
    padding: 0 !important;

    &:hover {
      background: #189ee9 !important;
      color: $white;
    }

    .ant-select-item-option-content {
      background: white;
      padding: 8px 24px !important;
      margin: 0 !important;

      &:hover {
        background: #189ee9 !important;
        color: $white;
      }
    }
  }
`;
