import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Form, Switch } from 'antd';
import { useFormik } from 'formik';

import { NavLink } from 'react-router-dom';
import moment from 'moment';
import {
  InputTT,
  SelectTT,
  DatePickerTT,
  ButtonTT,
  Title,
  StyledFooter,
  StyledFormPage,
  styles,
  ConnectionTakesTime,
} from '../../../tt-components';
import { putCalculator } from './apiEditCalculator';
import isDateNull from '../../../utils/isDateNull';
import { returnNullIfEmptyString } from '../../../utils/returnNullIfEmptyString';
import { handleTabsBeforeFormSubmit } from '../../../utils/handleTabsBeforeFormSubmit';
import isEmptyString from '../../../utils/isEmptyString';
import { CalculatorResponse, UpdateCalculatorRequest } from '../.../../api/types';
import {
  DEFAULT_CALCULATOR,
  ItemInterface,
  items,
} from '../../../tt-components/localBases';
import _ from 'lodash';
import { AlertInterface } from '../../../tt-components/interfaces';
import {
  calculatorNoConnectionValidationSchema,
  calculatorValidationSchema,
} from '../../../tt-components/validationSchemas';
import { useStore } from 'effector-react';
import { $calculatorTypesSelectItems, CalculatorInfosGate } from '01/features/carlculators/calculatorsInfo/models';

interface EditCalculatorFormInterface {
  calculator: CalculatorResponse;
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
  setAlert: Dispatch<SetStateAction<boolean>>;
  setExistCalculator: Dispatch<SetStateAction<number | undefined | null>>;
}

const EditCalculatorForm = ({
  calculator,
  tab,
  setTab,
  setAlert,
  setExistCalculator,
}: EditCalculatorFormInterface) => {
  const {
    lastCheckingDate,
    futureCheckingDate,
    futureCommercialAccountingDate,
    lastCommercialAccountingDate,
    id,
    model,
    serialNumber,
    connection: { ipV4, port, deviceAddress },
    address: { id: houseId },
    isConnected,
  } = (calculator as any) || DEFAULT_CALCULATOR;

  const [validationSchema, setValidationSchema] = useState<any>(
    calculatorValidationSchema
  );

  const calculatorTypesSelectItems = useStore($calculatorTypesSelectItems);

  const getCurrentInfoId = model
    ? _.find<ItemInterface>(items, { label: model })
    : undefined;

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
    setFieldError,
  } = useFormik({
    initialValues: {
      serialNumber,
      lastCheckingDate: isDateNull(lastCheckingDate),
      futureCheckingDate: isDateNull(futureCheckingDate),
      lastCommercialAccountingDate: isDateNull(lastCommercialAccountingDate),
      futureCommercialAccountingDate: isDateNull(
        futureCommercialAccountingDate
      ),
      ipV4: ipV4,
      port: port,
      deviceAddress: deviceAddress,
      housingStockId: houseId,
      infoId: getCurrentInfoId ? getCurrentInfoId.value : undefined,
      isConnected: isConnected || false,
    },
    validationSchema,
    onSubmit: async () => {
      const form: UpdateCalculatorRequest = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate?.toISOString(true),
        futureCheckingDate: values.futureCheckingDate?.toISOString(true),
        isConnected: values.isConnected,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: returnNullIfEmptyString(values.deviceAddress),
          port: returnNullIfEmptyString(values.port),
        },
        infoId: values.infoId,
      };

      interface ThenInterface {
        show: boolean | undefined;
        id: number | null | undefined;
      }

      putCalculator(id, form).then(({ show, id: existDeviceId }: any) => {
        if (show) {
          setAlert(true);
          setExistCalculator(existDeviceId);
        }
      });
    },
  });

  function isEmptyConnection() {
    return (
      isEmptyString(values.deviceAddress) &&
      isEmptyString(values.port) &&
      isEmptyString(values.ipV4)
    );
  }

  function onSwitchChange(checked: boolean) {
    setFieldValue('isConnected', checked);
    if (checked) {
      setValidationSchema(calculatorValidationSchema);
    }
    if (!checked) {
      if (isEmptyConnection() === true) {
        setFieldError('ipV4', undefined);
        setFieldError('port', undefined);
        setFieldError('deviceAddress', undefined);
        setValidationSchema(calculatorNoConnectionValidationSchema);
      }
      if (isEmptyConnection() === false) {
        setValidationSchema(calculatorValidationSchema);
      }
    }
  }

  useEffect(() => {
    if (values.isConnected === false) {
      if (isEmptyConnection() === true) {
        setFieldError('ipV4', undefined);
        setFieldError('port', undefined);
        setFieldError('deviceAddress', undefined);
        setValidationSchema(calculatorNoConnectionValidationSchema);
      }
      if (isEmptyConnection() === false) {
        setValidationSchema(calculatorValidationSchema);
      }
    }
  }, [values.deviceAddress, values.ipV4, values.port]);

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  const tabErrors: Array<{ key: string; value: string[] }> = [
    {
      key: '1',
      value: ['serialNumber', 'infoId'],
    },
    {
      key: '2',
      value: ['ipV4', 'port', 'deviceAddress'],
    },
  ];

  function handleSubmitForm(e: any) {
    e.preventDefault();
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );
    if (hasError) {
      setTab(errorTab);
    } else {
      handleSubmit();
    }
  }

  return (
    <form onSubmit={handleSubmitForm} style={{ maxWidth: 800 }}>
      <StyledFormPage hidden={Number(tab) !== 1}>
        <CalculatorInfosGate />
        <Form.Item label="Серийный номер устройства" style={styles.w100}>
          <InputTT
            name="serialNumber"
            value={values.serialNumber}
            onBlur={handleBlur}
            placeholder="Серийный номер"
            onChange={handleChange}
            autoFocus={true}
          />
          <Alert name="serialNumber" />
        </Form.Item>

        <Form.Item label="Тип вычислителя" style={styles.w100}>
          <SelectTT
            placeholder="Выберите тип устройства"
            options={calculatorTypesSelectItems}
            value={values.infoId}
            onChange={(event, target) => {
              setFieldValue('infoId', event);
            }}
          />
          <Alert name="infoId" />
        </Form.Item>

        <Form.Item label="Дата Поверки" style={styles.w100}>
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCheckingDate"
            placeholder="Укажите дату..."
            allowClear={false}
            onChange={(date) => {
              setFieldValue('lastCheckingDate', date);
              setFieldValue('futureCheckingDate', moment(date).add(4, 'years'));
            }}
            value={values.lastCheckingDate}
          />
          <Alert name="lastCheckingDate" />
        </Form.Item>

        <Form.Item label="Дата Следующей поверки" style={styles.w100}>
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            allowClear={false}
            onChange={(date) => {
              setFieldValue('futureCheckingDate', date);
            }}
            value={values.futureCheckingDate}
            name="futureCheckingDate"
          />
          <Alert name="futureCheckingDate" />
        </Form.Item>

        <Form.Item
          label="Дата начала действия акта-допуска"
          style={styles.w100}
        >
          <DatePickerTT
            format="DD.MM.YYYY"
            name="lastCommercialAccountingDate"
            allowClear={false}
            placeholder="Укажите дату..."
            onChange={(date) => {
              setFieldValue('lastCommercialAccountingDate', date);
              setFieldValue('futureCommercialAccountingDate', moment(date).add(4, 'years'));
            }}
            value={values.lastCommercialAccountingDate}
          />
          <Alert name="lastCommercialAccountingDate" />
        </Form.Item>

        <Form.Item
          label="Дата окончания действия акта-допуска"
          style={styles.w100}
        >
          <DatePickerTT
            format="DD.MM.YYYY"
            placeholder="Укажите дату..."
            allowClear={false}
            onChange={(date) => {
              setFieldValue('futureCommercialAccountingDate', date);
            }}
            value={values.futureCommercialAccountingDate}
            name="futureCommercialAccountingDate"
          />
          <Alert name="futureCommercialAccountingDate" />
        </Form.Item>
      </StyledFormPage>
      <StyledFormPage hidden={Number(tab) !== 2}>
        <Form.Item style={styles.w100}>
          <Switch
            style={{ width: '48px' }}
            onChange={onSwitchChange}
            checked={values.isConnected || false}
          />
          <span
            style={{
              fontSize: '16px',
              lineHeight: '32px',
              marginLeft: '16px',
              color: 'rgba(39, 47, 90, 0.9)',
            }}
          >
            Опрашивать вычислитель
          </span>
        </Form.Item>

        <Form.Item label="IP адрес вычислителя" style={styles.w100}>
          <InputTT
            type="text"
            value={values.ipV4}
            placeholder="Укажите IP-адрес устройства, например 192.168.0.1"
            onChange={handleChange}
            name="ipV4"
            onBlur={handleBlur}
          />
          <Alert name="ipV4" />
        </Form.Item>

        <Form.Item label="Порт" style={styles.w100}>
          <InputTT
            type="number"
            placeholder="Укажите порт устройства (например, 1234)"
            value={values.port}
            onChange={handleChange}
            onBlur={handleBlur}
            name="port"
          />
          <Alert name="port" />
        </Form.Item>

        <Form.Item label="Адрес устройства" style={styles.w100}>
          <InputTT
            type="number"
            placeholder="Укажите адреса устройства"
            value={values.deviceAddress}
            onChange={handleChange}
            onBlur={handleBlur}
            name="deviceAddress"
          />
          <Alert name="deviceAddress" />
        </Form.Item>

        <ConnectionTakesTime />
      </StyledFormPage>
      <StyledFormPage hidden={Number(tab) !== 3}>
        <Title color="black">Компонент в разработке </Title>
      </StyledFormPage>
      <StyledFormPage hidden={Number(tab) !== 4}>
        <Title color="black">Компонент в разработке </Title>
      </StyledFormPage>
      <StyledFooter form>
        <ButtonTT color="blue" style={{ marginRight: 16 }} type="submit">
          Сохранить
        </ButtonTT>

        <NavLink to={`/calculators/${id}`}>
          <ButtonTT color="white" type="button">
            Отмена
          </ButtonTT>
        </NavLink>
      </StyledFooter>
    </form>
  );
};

export default EditCalculatorForm;
