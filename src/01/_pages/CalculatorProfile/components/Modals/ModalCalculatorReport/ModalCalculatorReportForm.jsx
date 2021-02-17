import React from 'react';
import { Form, Radio, Tabs } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import {
  ButtonTT, Header, InputTT, SelectTT, RangePickerTT, StyledRadio, StyledFooter, StyledModalBody,
} from '../../../../../tt-components';

const { TabPane } = Tabs;

const ModalCalculatorReportForm = (props) => {
   const { device, handleCancel } = props;
  console.log('DEVICE = ', device);
  const {
    id, model, serialNumber, address, hubs, nodes,
  } = device;
  const { housingStockNumber, street } = address;
  const serialNumberCalculator = serialNumber;
  const modelCalculator = model;
  console.log('nodes', nodes);

  const nodesList = nodes.map((node, index) => {
    const {
      id, number, resource, communicationPipes,
    } = node;

    const devices = _.flatten(communicationPipes.map((communicationPipe) => {
      const { devices } = communicationPipe;

      return devices.reduce((result, item) => {
        const {
          housingMeteringDeviceType, serialNumber, model,
        } = item;

        if (housingMeteringDeviceType === 'FlowMeter') {
          result.push({
            serialNumber,
            model,
          });
        }
        return result;
      }, []);
    }));

    return {
      id, number, resource, devices,
    };
  });

  console.log('nodesList', nodesList);

  // Группировка по типу ресурса - на выходе - {Heat: [item1, item2], ...}
  const filteredGroup = _.groupBy(nodesList, 'resource');
  console.log('filteredGroup', filteredGroup);

  // Получаем весь список ресурсов для табов
  const resources = (model !== 'Sonosafe') ? _.keys(filteredGroup) : ['Heat'];
  console.log('resources', resources);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      period: 'lastSevenDays',
      detail: 'daily',
      begin: moment().subtract(1, 'month'),
      end: moment(),
      resource: resources[0],
      nodeId: null,
      customPeriodDisabled: true,
    },
    validationSchema: Yup.object({
      nodeId: Yup.number().typeError('Выберите Узел').required('Выберите Узел'),
    }),
    onSubmit: async () => {
      console.log('nodeId', values.nodeId);
      const link = `http://84.201.132.164:8080/api/reports/getReport?nodeId=${values.nodeId}&reportType=${values.detail}&from=${moment(values.begin).format('YYYY-MM-DD')}T00:00:00Z&to=${moment(values.end).format('YYYY-MM-DD')}T00:00:00Z`;
      console.log(link);
      const linkToDownload = document.createElement('a');
      linkToDownload.setAttribute('href', link);
      linkToDownload.setAttribute('download', 'download');
      linkToDownload.click();
    },
  });

  const prevOptions = Object.values(filteredGroup[values.resource]);
  const options = prevOptions.map((option, index) => {
    const { id, number, devices } = option;

    // console.log('devices', devices);
    let label = `Узел ${number}: ${modelCalculator} (${serialNumberCalculator})`;
    _.forEach(devices, (value) => {
      label = `${label}, ${value.model} (${value.serialNumber})`;
    });
    return (
      { value: id, label }
    );
  });

  console.log('options', options);

  const Translate = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource) => Translate[resource];

  const onPeriodChange = (event) => {
    const res = event.target.value;
    switch (res) {
      case 'lastSevenDays':
        setFieldValue('begin', moment().subtract(7, 'days'));
        setFieldValue('end', moment());
        setFieldValue('customPeriodDisabled', true);
        break;
      case 'currentMonth':
        setFieldValue('begin', moment().startOf('month'));
        setFieldValue('end', moment());
        setFieldValue('customPeriodDisabled', true);
        break;
      case 'previousMonth':
        setFieldValue('begin', moment().subtract(1, 'month').startOf('month'));
        setFieldValue('end', moment().subtract(1, 'month').endOf('month'));
        setFieldValue('customPeriodDisabled', true);
        break;
      case 'customPeriod':
        setFieldValue('customPeriodDisabled', false);
        break;
      default:
        alert('Возможно, что-то пошло не так');
    }
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
    setFieldValue('nodeId', undefined);
  };

  return (
    <Form id="formReport">
      <StyledModalBody>
        <Header>
          Выгрузка отчета о общедомовом потреблении
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
            options={options}
                        // options={devicesSelectionByType[values.resource]}
            placeholder="Выберите узел"
            onChange={(value) => {
              setFieldValue('nodeId', value);
            }}
            value={values.nodeId}
            name="nodeId"
          />
          <Alert name="nodeId" />
        </Form.Item>

        {/* <Form.Item label="Выбор узла"> */}
        {/*  <SelectTT */}
        {/*    options={options} */}
        {/*                // options={devicesSelectionByType[values.resource]} */}
        {/*    placeholder="Выберите узел" */}
        {/*    onChange={handleSelect} */}
        {/*    value={values.currentValue} */}
        {/*    name="entryNumber" */}
        {/*  /> */}
        {/*  <Alert name="entryNumber" /> */}
        {/* </Form.Item> */}
        <div id="period_and_type " style={{ display: 'flex' }}>

          <Form.Item label="Тип архива" style={{ width: '50%' }}>
            <Radio.Group
              defaultValue="currentMonth"
              size="large"
              onChange={(event) => onPeriodChange(event)}
            >
              <StyledRadio value="lastSevenDays">
                Последние 7 дней
              </StyledRadio>
              <StyledRadio value="currentMonth" checked>С начала месяца</StyledRadio>
              <StyledRadio value="previousMonth">За прошлый месяц</StyledRadio>
              <StyledRadio value="customPeriod">Произвольный период</StyledRadio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Детализация отчета" style={{ width: '50%' }}>
            <Radio.Group
              defaultValue="daily"
              size="large"
              onChange={(event) => onDetailChange(event)}
            >
              <StyledRadio value="daily" checked>
                Суточная
              </StyledRadio>
              <StyledRadio value="hourly">Часовая</StyledRadio>
            </Radio.Group>
          </Form.Item>
        </div>
        <Form.Item label="Период выгрузки" style={{ width: '300px' }}>
          <RangePickerTT
            format="DD.MM.YYYY"
            allowClear={false}
            size="48px"
            value={[values.begin, values.end]}
            placeholder={['Дата Начала', 'Дата окончания']}
            onChange={(event) => {
              datePickerHandler(event);
            }}
            disabled={values.customPeriodDisabled}
          />
        </Form.Item>
      </StyledModalBody>
      <StyledFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
      </StyledFooter>
    </Form>
  );
};

export default ModalCalculatorReportForm;
