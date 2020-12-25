import React, { useEffect } from 'react';
import { Form, Radio, Tabs } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import Modal from 'antd/es/modal/Modal';
import {
  ButtonTT, Header, InputTT, SelectTT, RangePickerTT,
} from '../../../../../tt-components';

import styled from 'styled-components'

import { convertDateOnly } from '../../../../../_api/utils/convertDate';

// import { device } from './CalculatorTemplate';

const { TabPane } = Tabs;

const ModalSonoSafeReportForm = (props) => {
  const { device, handleCancel } = props;
  const {
    id, model, serialNumber, address, hubs,
  } = device;
  const { housingStockNumber, street } = address;
  const serialNumberCalculator = serialNumber;
  const modelCalculator = model;

  // Все Расходомеры
  const devicesList = hubs.reduce((result, item) => {
    const {
      resource, housingMeteringDeviceType, hub, serialNumber, model,
    } = item;
    const { entryNumber, pipeNumber } = hub;
    if (housingMeteringDeviceType === 'FlowMeter') {
      result.push({
        resource,
        entryNumber,
        pipeNumber,
        housingMeteringDeviceType,
        serialNumber,
        model,
      });
    }
    return result;
  }, []);

  // Группировка по типу ресурса - на выходе - {Heat: [item1, item2], ...}
  const filteredGroup = _.groupBy(devicesList, 'resource');

  // Получаем весь список ресурсов для табов
  const resources = (model !== 'Sonosafe') ? _.keys(filteredGroup) : ['Heat'];

  // Создать объект с ключами из списка ресурсов, а значений - модифицириваннные массивы из getSelectionsFormatterByType
  const getDevicesSelectionByType = (group) => _.keys(group).reduce((acc, item) => {
    acc[item] = getSelectionsFormatterByType(group[item], item);
    return acc;
  }, {});

  // Редюсер по типу ресура
  const getSelectionsFormatterByType = (list, type) => {
    switch (type) {
      case 'ColdWaterSupply':
        return list.map((item, index) => ({ ...item, value: index + 1, label: `Узел ${index + 1} ${modelCalculator}: ${item.model} (${item.serialNumber})` }));
      case 'HotWaterSupply':
        return reduceList(list);
      case 'Heat':
        return reduceList(list);
      default:
        return list;
    }
  };

  // Функция для возврата измененного массива по ресурсу, сравниваем entryNumber
  const reduceList = (list) => {
    const sortedByEntryNumber = _.groupBy(list, 'entryNumber');
    return _.values(sortedByEntryNumber).map((item, index) => {
      if (item.length > 1) {
        const { entryNumber, pipeNumber } = item[0];
        return {
          entryNumber,
          pipeNumber,
          value: index + 1,
          label: `Узел ${index + 1} ${modelCalculator}(${serialNumberCalculator}): ${item[0].model} (${item[0].serialNumber}), ${item[1].model} (${item[1].serialNumber})`,
        };
      }
      return {
        ...item[0],
        value: index + 1,
        label: `Узел ${index + 1} ${modelCalculator} (${serialNumberCalculator}): ${item[0].model} (${item[0].serialNumber})`,
      };
    });
  };

  const sonorSelection = {
    Heat: [
      {
        entryNumber: 1,
        pipeNumber: 5,
        value: 1,
        label: 'Без узла',
      },
    ],
  };
  // Итоговый объект для Select
  // const devicesSelectionByType = getDevicesSelectionByType(filteredGroup);
  const devicesSelectionByType = (model !== 'Sonosafe') ? getDevicesSelectionByType(filteredGroup) : sonorSelection;

  console.log(JSON.stringify(getDevicesSelectionByType(filteredGroup)));
  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      period: 'month',
      detail: 'daily',
      begin: moment().subtract(1, 'month'),
      end: moment(),
      resource: resources[0],
      currentValue: undefined,
      entryNumber: null,
      pipeNumber: undefined,
      test: undefined,
    },
    validationSchema: Yup.object({
      entryNumber: Yup.number().typeError('Выберите узел').min(0, 'Скорее всего, выбран некорректный номер узла')
        .max(10, 'Скорее всего, выбран некорректный номер узла'),
    }),
    onSubmit: async () => {
      downloadReport();
    },
  });

  const Translate = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource) => Translate[resource];

  const downloadReport = () => {
    console.log('entryNumberRes.current = ', values.entryNumber);
    if (values.entryNumber) {
      console.log('entryNumberRes', values.entryNumber);
      const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
        values.detail
      }&resourcetype=${values.resource}&entrynumber=${
        values.entryNumber
      }&pipenumber=${values.pipeNumber}&from=${convertDateOnly(values.begin)}T00:00:00Z&to=${convertDateOnly(
        values.end,
      )}T00:00:00Z`;

      console.log(link);

      const linkToDownload = document.createElement('a');
      linkToDownload.setAttribute('href', link);
      linkToDownload.setAttribute('download', 'download');
      linkToDownload.click();

      // window.open(link);
    } else {
      alert('Выберите узел!');
    }
  };

  const onPeriodChange = (event) => {
    const res = event.target.value;
    setFieldValue('period', res);
    setFieldValue('begin', moment().subtract(1, res));
    setFieldValue('end', moment());
  };

  const onDetailChange = (event) => {
    const res = event.target.value;
    setFieldValue('detail', res);
  };

  const datePickerHandler = (event) => {
    setFieldValue('begin', event[0]);
    setFieldValue('end', event[1]);
  };

  const Alert = ({ name }) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return (
        <div>{error}</div>
      );
    }
    return null;
  };

  // Список Вкладок/Ресурсов
  const TabsList = resources.map((value, index) => {
    const res = translate(value);
    return <TabPane tab={res} key={value} />;
  });

  const defaultRes = translate(TabsList[0]);

  const onTabsChangeHandler = (value) => {
    setFieldValue('resource', value);
    setFieldValue('currentValue', undefined);
    setFieldValue('entryNumber', null);
    setFieldValue('pipeNumber', null);
  };

  const handleSelect = (value, object) => {
    setFieldValue('currentValue', value);
    setFieldValue('entryNumber', object.entryNumber);
    setFieldValue('pipeNumber', object.pipeNumber);
  };

  const Footer = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <ButtonTT
        color="white"
        onClick={handleCancel}
      >
        Отмена
      </ButtonTT>
      <ButtonTT
        color="blue"
        type="submit"
        form="formReport"
        style={{ width: '224px', marginLeft: '16px' }}
        onClick={handleSubmit}
      >
        Выгрузить
      </ButtonTT>
    </div>
  );

  const radioStyle = {

  };

  const RadioStyled = styled(Radio)`
    display: block;
    span {
      font-size: 16px;
      line-height: 32px;
      font-weight: 400;
      color: rgba(39, 47, 90, 0.9);
    }
    .ant-radio-checked::after {
      
    }
  `

  return (
    <Modal
      width={800}
      visible
      footer={Footer()}
    >

      <Form id="formReport">
        <Header style={{margin: 0, padding: 0}}>
          Выгрузка отчета о общедомовом потреблении SonoSafe
        </Header>

        <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}>
          {TabsList}
        </Tabs>
        <Form.Item label="Название отчета">
          <InputTT
            value={`${street}_${housingStockNumber}.exls`}
            readOnly
          />
        </Form.Item>

        <Form.Item label="Выбор узла">
          <SelectTT
            options={devicesSelectionByType[values.resource]}
            placeholder="Выберите узел"
            onChange={handleSelect}
            value={values.currentValue}
            name="entryNumber"
          />
          <Alert name="entryNumber" />
        </Form.Item>

        <div id="period_and_type " style={{ display: 'flex' }}>

          <Form.Item label="Период" style={{ marginRight: '24px' }}>
            <Radio.Group
              defaultValue="month"
              size="large"
              onChange={(event) => onPeriodChange(event)}
            >
              <Radio.Button value="month" checked>
                Месячный
              </Radio.Button>
              <Radio.Button value="day">Суточный</Radio.Button>
              <Radio.Button value="year">Годовой</Radio.Button>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Детализация отчета">
            <Radio.Group
              defaultValue="monthly"
              size="large"
              onChange={(event) => onDetailChange(event)}
            >
              <RadioStyled style={radioStyle} value={"monthly"}>
                Месячная
              </RadioStyled>
              <Radio style={radioStyle} value={"ddd"}>
                ffff
              </Radio>
            </Radio.Group>
          </Form.Item>
        </div>

        <Form.Item label="Период выгрузки">
          <RangePickerTT
            format="DD.MM.YYYY"
            allowClear={false}
            size="48px"
            value={[values.begin, values.end]}
            placeholder={['Дата Начала', 'Дата окончания']}
            onChange={(event) => {
              datePickerHandler(event);
            }}
          />
        </Form.Item>

      </Form>

    </Modal>
  );
};

export default ModalSonoSafeReportForm;
