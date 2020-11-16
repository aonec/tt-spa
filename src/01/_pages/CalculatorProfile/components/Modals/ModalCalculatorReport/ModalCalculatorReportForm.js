import React from 'react';
import { Form, Modal, Radio } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  ButtonTT, Header, InputTT, SelectTT, RangePickerTT,
} from '../../../../../tt-components';
import { convertDateOnly } from '../../../../../_api/utils/convertDate';
import { device } from './components/CalculatorTemplate';

const ModalCalculatorReportForm = (props) => {
  const selectOptions = [];
  const { device } = props;
  console.log("DEVICE = ", device)
  const building = device.address;
  const { id, model, serialNumber } = device;
  const serialNumberODPU = serialNumber;

  const list = [];
  const devicesList = [];

  const { housingStockNumber, street } = building;
  const { hubs } = device;

  hubs.map((item, index) => {
    const {
      resource, housingMeteringDeviceType, hub, serialNumber,
    } = item;

    const { entryNumber, pipeNumber } = hub;
    console.log('pipeNumber = ', pipeNumber);
    if (housingMeteringDeviceType === 'FlowMeter' && resource !== 'HotWaterSupply') {
      devicesList.push({
        resource,
        entryNumber,
        pipeNumber,
        housingMeteringDeviceType,
        serialNumber,
      });
    }
  });

  devicesList.map(({
    resource, serialNumber, entryNumber, pipeNumber,
  }) => {
    if (_.find(selectOptions, (o) => o.value === resource)) {
      const res = _.find(selectOptions, (o) => o.value === resource);
      console.log('res', res);
      const ind = selectOptions.indexOf(res);
      selectOptions.splice(ind, 1, {
        label: `${_.get(
          selectOptions[ind],
          'label',
          'default',
        )} ПРЭМ (${serialNumber})`,
        value: resource,
        entryNumber,
        pipeNumber,
      });
    } else {
      selectOptions.push({
        label: `Узел ${entryNumber} ${model}: (${serialNumberODPU}), ПРЭМ (${serialNumber})`,
        value: resource,
        entryNumber,
        pipeNumber,
      });
    }
  });

  const Translate = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource) => Translate[resource];

  console.log('ModalCalculatorReportForm');

  // const downloadReport = () => {
  //   console.log('entryNumberRes.current = ', values.entryNumberRes);
  //   if (values.entryNumberRes) {
  //     console.log('entryNumberRes', values.entryNumberRes);
  //     const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
  //       values.detail
  //     }&resourcetype=${type}&entrynumber=${
  //       values.entryNumberRes
  //     }&pipenumber=${values.pipeNumberRes}&from=${convertDateOnly(values.begin)}T00:00:00Z&to=${convertDateOnly(
  //       values.end,
  //     )}T00:00:00Z`;
  //     const lastTemplate = 'http://84.201.132.164:8080/api/reports/getByResource?deviceId=1542041&reporttype=hourly&resourcetype=coldwatersupply&entrynumber=2&from=2020-10-25T00:00:00Z&to=2020-10-27T00:00:00Z';
  //
  //     const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z';
  //     const template2 = 'http://84.201.132.164:8080/api/reports/getByResource?deviceId=1510&reporttype=daily&resourcetype=Heat&entrynumber=1&from=2020-09-01T00:00:00Z&to=2020-09-15T00:00:00Z';
  //     // window.location.assign(link);
  //     console.log(link);
  //     // console.log(lastTemplate);
  //     window.open(link);
  //   } else {
  //     alert('Выберите узел!');
  //   }
  // };

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

  const modifiedSelectOptions = selectOptions.filter((option) => option.value == 'type');
  console.log('modifiedSelectOptions', modifiedSelectOptions);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      period: 'month',
      detail: 'daily',
      begin: moment().subtract(1, 'month'),
      end: moment(),
      type: list[0],
    },
    validationSchema: Yup.object({}),
    onSubmit: async () => {
      const form = {
        period: values.period,
        detail: values.detail,
        begin: values.begin,
      };
      // deregisterDevice(form);
    },
  });

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

  const Buttons = () => {
    console.log('Buttons');
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <ButtonTT
          color="white"
        >
          Отмена
        </ButtonTT>
        <ButtonTT
          color="blue"
          style={{ width: '224px', marginLeft: '16px' }}
          // onClick={downloadReport}
        >
          Выгрузить
        </ButtonTT>
      </div>
    );
  };

  return (
    <Form>
      <Header>
        Выгрузка отчета о общедомовом потреблении
      </Header>

      <Form.Item label="Название отчета">
        <InputTT
          value={`${street}_${housingStockNumber}.exls`}
          readOnly
        />
      </Form.Item>

      <Form.Item label="Выбор узла">
        <SelectTT
      // options={modifiedSelectOptions}
          placeholder="Выберите узел"
        />
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

      <Buttons />
    </Form>
  );
};

export default ModalCalculatorReportForm;
