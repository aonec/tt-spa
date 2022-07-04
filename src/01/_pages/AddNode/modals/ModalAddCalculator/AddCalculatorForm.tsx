import React, { useContext, useEffect, useState } from 'react';
import moment from 'time';
import { useFormik } from 'formik';
import _ from 'lodash';
import { Form, message } from 'antd';
import {
  // Title,
  ButtonTT,
  DatePickerTT,
  InputTT,
  SelectTT,
  StyledModalBody,
  StyledFooter,
  StyledFormPage,
  styles,
  SwitchTT,
  ConnectionTakesTime,
  // Title,
} from '../../../../tt-components';
import { items } from '../../../../tt-components/localBases';
import Tabs from '../../../../tt-components/Tabs';
import { returnNullIfEmptyString } from '../../../../utils/returnNullIfEmptyString';
import { handleTabsBeforeFormSubmit } from '../../../../utils/handleTabsBeforeFormSubmit';
import { isEmptyString } from '../../../../utils/isEmptyString';
import { AddNodeContext } from '../../AddNodeContext';
import {
  AlertInterface,
  TabsItemInterface,
} from '../../../../tt-components/interfaces';
import { CreateCalculatorRequest } from '../../../../../myApi';
import {
  calculatorNoConnectionValidationSchema,
  calculatorValidationSchema,
} from '../../../../tt-components/validationSchemas';
import { addCalculator } from '../../../../_api/apiRequests';
import Title from '../../../../tt-components/Title';
import { $calculatorTypesSelectItems, CalculatorInfosGate } from '01/features/carlculators/calculatorsInfo/models';
import { useStore } from 'effector-react';

const AddCalculatorForm = ({ handleCancel, onCreateCalculator }: any) => {
  const { housingStockId, setAddCalculator } = useContext(AddNodeContext);

  const calculatorTypesSelectItems = useStore($calculatorTypesSelectItems);

  const [currentTabKey, setTab] = useState('1');
  const [validationSchema, setValidationSchema] = useState<any>(
    calculatorValidationSchema
  );
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
      serialNumber: '',
      lastCheckingDate: moment(),
      futureCheckingDate: moment().add(4, 'years'),
      lastCommercialAccountingDate: moment(),
      futureCommercialAccountingDate: moment(),
      documentsIds: [],
      ipV4: '',
      deviceAddress: null,
      port: null,
      housingStockId,
      infoId: 1,
      isConnected: true,
    },
    validationSchema,
    onSubmit: async () => {
      const form: CreateCalculatorRequest = {
        serialNumber: values.serialNumber,
        lastCheckingDate: values.lastCheckingDate.toISOString(true),
        futureCheckingDate: values.futureCheckingDate.toISOString(true),
        documentsIds: values.documentsIds,
        isConnected: values.isConnected,
        connection: {
          ipV4: values.ipV4,
          deviceAddress: returnNullIfEmptyString(values.deviceAddress),
          port: returnNullIfEmptyString(values.port),
        },
        housingStockId: Number(values.housingStockId),
        infoId: Number(values.infoId),
      };

      try {
        const res: any = await addCalculator(form);

        onCreateCalculator && onCreateCalculator(res.id);

        setAddCalculator(false);
      } catch (error) {
        message.error('Ошибка добавления вичислителя');
      }
    },
  });

  function isEmptyConnection() {
    return (
      isEmptyString(values.deviceAddress) &&
      isEmptyString(values.port) &&
      isEmptyString(values.ipV4)
    );
  }

  useEffect(() => {
    if (!values.isConnected) {
      if (isEmptyConnection()) {
        setFieldError('ipV4', undefined);
        setFieldError('port', undefined);
        setFieldError('deviceAddress', undefined);
        setValidationSchema(calculatorNoConnectionValidationSchema);
      }
      if (!isEmptyConnection()) {
        setValidationSchema(calculatorValidationSchema);
      }
    }
  }, [values.deviceAddress, values.ipV4, values.port]);

  function onSwitchChange(checked: boolean) {
    setFieldValue('isConnected', checked);
    if (checked) {
      setValidationSchema(calculatorNoConnectionValidationSchema);
    }
    if (!checked) {
      if (isEmptyConnection() === true) {
        setValidationSchema(calculatorNoConnectionValidationSchema);
        setFieldError('ipV4', undefined);
        setFieldError('port', undefined);
        setFieldError('deviceAddress', undefined);
      }
      if (!isEmptyConnection()) {
        setValidationSchema(calculatorNoConnectionValidationSchema);
      }
    }
  }

  const tabErrors = [
    {
      key: '1',
      value: ['serialNumber', 'infoId'],
    },
    {
      key: '2',
      value: ['ipV4', 'port', 'deviceAddress'],
    },
  ];

  function handleNext() {
    setTab(String(Number(currentTabKey) + 1));
  }

  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    const { hasError, errorTab } = handleTabsBeforeFormSubmit(
      tabErrors,
      errors
    );

    if (hasError) {
      setTab(errorTab);
    } else {
      handleSubmit();
    }
  };

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div style={{ color: 'red' }}>{error}</div>;
    }
    return null;
  };

  const tabItems: Array<TabsItemInterface> = [
    {
      title: 'Общие данные',
      key: '1',
      cb: () => setTab('1'),
    },
    {
      title: 'Настройки соединения',
      key: '2',
      cb: () => setTab('2'),
    },
    {
      title: 'Документы',
      key: '3',
      cb: () => setTab('3'),
    },
  ];

  return (
    <>
      <CalculatorInfosGate />
      <form onSubmit={handleSubmitForm}>
        <StyledModalBody>
          <Title size="middle" color="black">
            Добавление нового вычислителя
          </Title>

          <Tabs
            tabItems={tabItems}
            tabsType={'tabs'}
            activeKey={currentTabKey}
          />

          <StyledFormPage hidden={Number(currentTabKey) !== 1}>
            <Form.Item label="Серийный номер устройства" style={styles.w100}>
              <InputTT
                name="serialNumber"
                value={values.serialNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Alert name="serialNumber" />
            </Form.Item>

            <Form.Item label="Тип вычислителя" style={styles.w100}>
              <SelectTT
                name="infoId"
                placeholder="Выберите тип устройства"
                options={calculatorTypesSelectItems}
                value={values.infoId}
                onChange={(event) => {
                  setFieldValue('infoId', event);
                }}
              />
            </Form.Item>

            <Form.Item label="Дата поверки" style={styles.w49}>
              <DatePickerTT
                format="DD.MM.YYYY"
                name="lastCheckingDate"
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('lastCheckingDate', date);
                  setFieldValue(
                    'futureCheckingDate',
                    moment(date).add(4, 'years')
                  );
                }}
                value={values.lastCheckingDate}
              />
            </Form.Item>

            <Form.Item label="Дата следующей поверки" style={styles.w49}>
              <DatePickerTT
                format="DD.MM.YYYY"
                name="futureCheckingDate"
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('futureCheckingDate', date);
                }}
                value={values.futureCheckingDate}
              />
            </Form.Item>

            <Form.Item
              label="Дата начала Акта действия допуска"
              style={styles.w49}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                name="lastCommercialAccountingDate"
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('lastCommercialAccountingDate', date);
                }}
                value={values.lastCommercialAccountingDate}
              />
            </Form.Item>

            <Form.Item
              label="Дата окончания Акта действия допуска"
              style={styles.w49}
            >
              <DatePickerTT
                format="DD.MM.YYYY"
                name="futureCommercialAccountingDate"
                allowClear={false}
                onChange={(date) => {
                  setFieldValue('futureCommercialAccountingDate', date);
                }}
                value={values.futureCommercialAccountingDate}
              />
            </Form.Item>
          </StyledFormPage>

          <StyledFormPage hidden={Number(currentTabKey) !== 2}>
            <div style={styles.w100}>
              <SwitchTT
                onChange={onSwitchChange}
                checked={values.isConnected}
                title={'Опрашивать вычислитель'}
              />
            </div>

            <Form.Item label="IP адрес вычислителя" style={styles.w49}>
              <InputTT
                name="ipV4"
                type="text"
                value={values.ipV4}
                onBlur={handleBlur}
                placeholder="Введите IP адрес вычислителя"
                onChange={handleChange}
              />
              <Alert name="ipV4" />
            </Form.Item>

            <Form.Item label="Порт вычислителя" style={styles.w49}>
              <InputTT
                name="port"
                type="number"
                placeholder="Введите номер порта"
                value={values.port}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Alert name="port" />
            </Form.Item>

            <Form.Item label="Адрес вычислителя" style={styles.w100}>
              <InputTT
                name="deviceAddress"
                type="number"
                placeholder="Введите сетевой адрес вычислителя"
                value={values.deviceAddress}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <Alert name="deviceAddress" />
            </Form.Item>

            <ConnectionTakesTime />
          </StyledFormPage>

          <StyledFormPage hidden={Number(currentTabKey) !== 3}>
            <Title color="black">Компонент Документы в разработке</Title>
          </StyledFormPage>
        </StyledModalBody>
        <StyledFooter>
          <ButtonTT
            color="blue"
            onClick={handleNext}
            type="button"
            hidden={currentTabKey === '3'}
            big
          >
            Далее
          </ButtonTT>

          <ButtonTT
            color="blue"
            type="submit"
            hidden={currentTabKey !== '3'}
            big
          >
            Добавить
          </ButtonTT>
          <ButtonTT
            color="white"
            type="button"
            onClick={
              currentTabKey === '1'
                ? handleCancel
                : () => setTab((prev) => String(Number(prev) - 1))
            }
            style={{ marginLeft: 16 }}
          >
            {currentTabKey === '1' ? 'Отмена' : 'Назад'}
          </ButtonTT>
        </StyledFooter>
      </form>
    </>
  );
};

export default AddCalculatorForm;
