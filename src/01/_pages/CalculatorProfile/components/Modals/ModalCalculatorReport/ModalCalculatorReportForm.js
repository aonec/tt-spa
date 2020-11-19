import React, { useEffect } from 'react';
import { Form, Radio, Tabs } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  ButtonTT, Header, InputTT, SelectTT, RangePickerTT,
} from '../../../../../tt-components';

import { convertDateOnly } from '../../../../../_api/utils/convertDate';

// import { device } from './CalculatorTemplate';
import { device } from './CalculatorTemplate';

const { TabPane } = Tabs;

const ModalCalculatorReportForm = (props) => {
  // const { device, handleCancel } = props;
  const { handleCancel } = props;
  // console.log('DEVICE = ', device);
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
    // console.log('pipeNumber = ', pipeNumber);
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

  // Список всех ресурсов
  const resources = devicesList.reduce((result, item) => {
    const { resource } = item;
    if (!result.includes(resource)) {
      result.push(resource);
    }
    return result;
  }, []);

  const filteredGroup = _.groupBy(devicesList, 'resource');

  const getSelectionsFormatterByType = (list, type) => {
    const sortedByEntryNumber = _.groupBy(list, 'entryNumber');
    let count = 0;
    const res = _.values(sortedByEntryNumber).map((item, index) => {
      count += 1;
      if (item.length === 2) {
        const { entryNumber, pipeNumber } = item[0];
        return {
          entryNumber, pipeNumber, value: count, label: `Узел ${count} ${modelCalculator}: ${item[0].model} (${item[0].serialNumber}), ${item[1].model} (${item[1].serialNumber})`,
        };
      }
      return { ...item[0], value: count, label: `Узел ${count} ${modelCalculator} : ${item[0].model} (${item[0].serialNumber})`};
    });

    switch (type) {
      case 'ColdWaterSupply':
        return list.map((item, index) => ({ ...item, value: index + 1, label: `Узел ${index + 1} ${modelCalculator}: ${item.model} (${item.serialNumber})`}));
      case 'HotWaterSupply':
        return res;
      case 'Heat':
        return res;
      default:
        return list;
    }
  };

  const getDevicesSelectionByType = (group) => _.keys(group).reduce((acc, item) => {
    acc[item] = getSelectionsFormatterByType(group[item], item);
    return acc;
  }, {});

  const final = getDevicesSelectionByType(filteredGroup);

  // console.log('getDevicesSelectionByType', getDevicesSelectionByType(filteredGroup));
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
      window.open(link);
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
    // console.log('resource = ', value);
    setFieldValue('resource', value);
    setFieldValue('currentValue', undefined);
    setFieldValue('entryNumber', null);
    setFieldValue('pipeNumber', null);
  };

  const handleSelect = (value, object) => {
    console.log('value1 = ', value, object);
    setFieldValue('currentValue', value);
    setFieldValue('entryNumber', object.entryNumber);
    setFieldValue('pipeNumber', object.pipeNumber);
  };

  return (
    <Form id="formReport">
      <Header>
        Выгрузка отчета о общедомовом потреблении
      </Header>
      {/* <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}> */}
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
          options={final[values.resource]}
          placeholder="Выберите узел"
          onChange={handleSelect}
          value={values.currentValue}
          name="entryNumber"
        />
        <Alert name="entryNumber" />
      </Form.Item>

      <div id="period_and_type " style={{ display: 'flex' }}>

        <Form.Item label="Тип архива" style={{ marginRight: '24px' }}>
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
            defaultValue="daily"
            size="large"
            onChange={(event) => onDetailChange(event)}
          >
            <Radio.Button value="daily" checked>
              Суточная
            </Radio.Button>
            <Radio.Button value="hourly">Часовая</Radio.Button>
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

      {/* <Buttons /> */}

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
    </Form>
  );
};

export default ModalCalculatorReportForm;

// Все строки, разделенные по типам Ресурсов
// const selectOptions = devicesList.reduce((result, item) => {
//   const {
//     resource, serialNumber, entryNumber, pipeNumber, model,
//   } = item;
//   // console.log(item);
//   if (_.find(result, (o) => o.resource === resource && o.entryNumber === entryNumber) && (resource !== 'ColdWaterSupply')) {
//     const res = _.find(result, (o) => o.resource === resource && o.entryNumber === entryNumber);
//     // console.log('res', res);
//     const ind = result.indexOf(res);
//     result.splice(ind, 1, {
//       label: `${_.get(
//           result[ind],
//           'label',
//           'default',
//       )} ${model} (${serialNumber})`,
//       value: ind,
//       resource,
//       entryNumber,
//       pipeNumber,
//     });
//   } else {
//     result.push({
//       label: `Узел ${modelCalculator}: (${serialNumberCalculator}), ${model} (${serialNumber})`,
//       value: result.length,
//       entryNumber,
//       pipeNumber,
//       resource,
//     });
//   }
//   return result;
// }, []);
