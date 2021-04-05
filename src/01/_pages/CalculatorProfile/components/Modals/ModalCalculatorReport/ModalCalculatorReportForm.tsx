import React, { Dispatch, SetStateAction } from 'react';
import { Form, Radio, Tabs } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';

import {
  ButtonTT,
  Header,
  InputTT,
  SelectTT,
  RangePickerTT,
  StyledRadio,
  StyledFooter,
  StyledModalBody,
} from '../../../../../tt-components';
import { getArchive } from './apiCalculatorReport';
import { CalculatorResponse, TaskListResponse } from '../../../../../../myApi';
import { Loader } from '../../../../../components';
import { DEFAULT_CALCULATOR } from '../../../../../tt-components/localBases';

export interface ModalCalculatorReportFormInterface {
  device: CalculatorResponse | null;
  handleCancel: any;
}

const ModalCalculatorReportForm = (
  props: ModalCalculatorReportFormInterface
) => {
  const { device, handleCancel } = props;

  const { TabPane } = Tabs;

  const { id, model, serialNumber, address, nodes } =
    device || DEFAULT_CALCULATOR;

  const { housingStockNumber, street } = address;
  const serialNumberCalculator = serialNumber;
  const modelCalculator = model;

  const nodesList =
    nodes ||
    [].map((node, index) => {
      const { id, number, resource, communicationPipes } = node;

      const devices = _.flatten(
        communicationPipes ||
          [].map((communicationPipe) => {
            const { devices } = communicationPipe;

            return (
              devices ||
              [].reduce((result: any, item: any) => {
                const { housingMeteringDeviceType, serialNumber, model } = item;

                if (housingMeteringDeviceType === 'FlowMeter') {
                  result.push({
                    serialNumber,
                    model,
                  });
                }
                return result;
              }, [])
            );
          })
      );

      return {
        id,
        number,
        resource,
        devices,
      };
    });

  // Группировка по типу ресурса - на выходе - {Heat: [item1, item2], ...}
  const filteredGroup = _.groupBy(nodesList, 'resource');

  // Получаем весь список ресурсов для табов
  const resources = model !== 'Sonosafe' ? _.keys(filteredGroup) : ['Heat'];

  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    handleBlur,
    setFieldValue,
  } = useFormik({
    initialValues: {
      period: 'lastSevenDays',
      detail: 'daily',
      begin: moment().startOf('month'),
      end: moment(),
      resource: resources[0],
      nodeId: null,
      customPeriodDisabled: true,
    },
    validationSchema: Yup.object({
      nodeId: Yup.number().typeError('Выберите Узел').required('Выберите Узел'),
    }),
    onSubmit: async () => {
      const { nodeId, detail, resource } = values;
      const begin = `${moment(values.begin).format('YYYY-MM-DD')}T00:00:00Z`;
      const end = `${values.end.format('YYYY-MM-DD')}T00:00:00Z`;

      const beginName = moment(values.begin).format('YYYY-MM-DD');
      const endName = moment(values.end).format('YYYY-MM-DD');
      const shortLink = `Reports/GetReport?nodeId=${nodeId}&reportType=${detail}&from=${begin}&to=${end}`;

      // xlsx
      getArchive(shortLink).then((response: any) => {
        const url = window.URL.createObjectURL(new Blob([response]));
        const link = document.createElement('a');
        link.href = url;
        const fileName = `${street}, ${housingStockNumber} - ${translate(
          resource
        )} с ${beginName} по ${endName}, ${translate(resource)}.xlsx`;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
  });

  const prevOptions = Object.values(filteredGroup[values.resource]);
  const options =
    prevOptions ||
    [].map((option, index) => {
      const { id, number, devices } = option;

      // console.log('devices', devices);
      let label = `Узел ${number}: ${modelCalculator} (${serialNumberCalculator})`;
      _.forEach(devices, (value: any) => {
        label = `${label}, ${value.model} (${value.serialNumber})`;
      });
      return { value: id, label };
    });

  const Translate: any = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource: string) => Translate[resource];

  const onPeriodChange = (event: any) => {
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

  const onDetailChange = (event: any) => {
    const res = event.target.value;
    setFieldValue('detail', res);
  };

  const datePickerHandler = (event: any) => {
    console.log(event);
    setFieldValue('begin', event[0]);
    setFieldValue('end', event[1]);
  };

  interface AlertInterface {
    name: string;
  }

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  // Список Вкладок/Ресурсов
  const TabsList =
    resources ||
    [].map((value, index) => {
      const res = translate(value);
      return <TabPane tab={res} key={value} />;
    });

  const defaultRes = translate(TabsList[0]);

  const onTabsChangeHandler = (value: string) => {
    setFieldValue('resource', value);
    setFieldValue('nodeId', null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <Header>Выгрузка отчета о общедомовом потреблении</Header>
        <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}>
          {TabsList}
        </Tabs>
        <Form.Item label="Название отчета">
          <InputTT value={`${street}_${housingStockNumber}.exls`} readOnly />
        </Form.Item>

        <Form.Item label="Выбор узла">
          <SelectTT
            options={options}
            onChange={(value) => {
              setFieldValue('nodeId', value);
            }}
            value={values.nodeId}
            name="nodeId"
          />
          <Alert name="nodeId" />
        </Form.Item>

        <div id="period_and_type " style={{ display: 'flex' }}>
          <Form.Item label="Тип архива" style={{ width: '50%' }}>
            <Radio.Group
              defaultValue="currentMonth"
              size="large"
              onChange={(event) => onPeriodChange(event)}
            >
              <StyledRadio value="lastSevenDays">Последние 7 дней</StyledRadio>
              <StyledRadio value="currentMonth" checked>
                С начала месяца
              </StyledRadio>
              <StyledRadio value="previousMonth">За прошлый месяц</StyledRadio>
              <StyledRadio value="customPeriod">
                Произвольный период
              </StyledRadio>
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
        <ButtonTT color="white" onClick={handleCancel}>
          Отмена
        </ButtonTT>
        <ButtonTT color="blue" type="submit" big style={{ marginLeft: '16px' }}>
          Выгрузить
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default ModalCalculatorReportForm;
