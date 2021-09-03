import React, {
  BaseSyntheticEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Form, message, Select } from 'antd';
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
  IndividualDeviceResponse,
  UpdateIndividualDeviceRequest,
} from '../../../../myApi';
import { AlertInterface } from '../../../tt-components/interfaces';
import _ from 'lodash';
import { putIndividualDevice } from '../../../_api/apiRequests';
import { Flex } from '01/shared/ui/Layout/Flex';
import {
  $individualDeviceMountPlaces,
  IndividualDeviceMountPlacesGate,
} from '01/features/individualDeviceMountPlaces/displayIndividualDeviceMountPlaces/models';
import { useStore } from 'effector-react';
import styled from 'styled-components';
import { Loader } from '01/components';

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
  setAlert,
  setExistDevice,
}: FormEditODPUInterface) => {
  const [loading, setLoading] = useState(false);

  const history = useHistory();

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
    sealInstallationDate,
    deviceMountPlace,
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
    mountPlaceId: deviceMountPlace?.id,
    bitDepth: bitDepth,
    scaleFactor: scaleFactor,
    sealNumber: device.sealNumber,
    sealInstallationDate: moment(sealInstallationDate).format('DD.MM.YYYY'),
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
    onSubmit: async () => {
      const form: UpdateIndividualDeviceRequest = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate?.toISOString(),
        futureCheckingDate: values.futureCheckingDate?.toISOString(),
        resource: values.resource,
        model: values.model,
        rateType: values.rateType,
        bitDepth: values.bitDepth,
        scaleFactor: values.scaleFactor,
        sealNumber: values.sealNumber,
        sealInstallationDate: moment(
          values.sealInstallationDate,
          'DD.MM.YYYY'
        ).toISOString(),
      };

      setLoading(true);

      try {
        await putIndividualDevice(id, form).then(
          ({ show, id: existDeviceId }: any) => {
            if (show) {
              setAlert(true);
              setExistDevice(existDeviceId);
            }
          }
        );

        history.goBack();
      } catch (e) {
        message.error('В выбранном месте уже есть прибор');
      }
      setLoading(false);
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
      {address?.apartmentId && (
        <IndividualDeviceMountPlacesGate apartmentId={address?.apartmentId} />
      )}
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
              disabled
              value={values.mountPlaceId || undefined}
              onChange={(value) => setFieldValue('mountPlaceId', value)}
              placeholder="Укажите место"
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

          <Form.Item label="Пломба" style={styles.w100}>
            <Flex>
              <InputTT
                placeholder="Номер пломбы"
                value={values.sealNumber}
                onChange={(value: any) =>
                  setFieldValue('sealNumber', value.target.value)
                }
              />
            </Flex>
          </Form.Item>

          <Form.Item label="Дата установки пломбы" style={styles.w100}>
            <DatePickerTT
              format="DD.MM.YYYY"
              placeholder="Укажите дату..."
              onChange={(value) => {
                value &&
                  setFieldValue(
                    'sealInstallationDate',
                    value.format('DD.MM.YYYY')
                  );
              }}
              value={
                values.sealInstallationDate
                  ? moment(values.sealInstallationDate, 'DD.MM.YYYY')
                  : undefined
              }
              name="futureCheckingDate"
            />
            <Alert name="futureCheckingDate" />
          </Form.Item>
        </StyledFormPage>

        <StyledFormPage hidden={Number(currentTabKey) !== 2}>
          <Header>Компонент в разработке</Header>
        </StyledFormPage>

        <StyledFooter form>
          <ButtonTT color="blue" type={'submit'} disabled={loading}>
            {loading ? <Loader show /> : 'Сохранить'}
          </ButtonTT>

          <ButtonTT
            style={{ marginLeft: 16 }}
            color="white"
            onClick={(e: BaseSyntheticEvent) => {
              e.stopPropagation();
              e.preventDefault();

              history.goBack();
            }}
          >
            Отмена
          </ButtonTT>
        </StyledFooter>
      </form>
    </>
  );
};

export default IndividualDeviceEditForm;

export const StyledSelect = styled(Select)`
  height: 48px;
  .ant-select-selector {
    height: 100% !important;
    padding: 8px 24px !important;
    border-radius: 4px !important;

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
