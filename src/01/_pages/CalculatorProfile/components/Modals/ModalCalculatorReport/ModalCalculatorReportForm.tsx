import React, { useState } from 'react';
import { Checkbox, Form, Radio, Tabs } from 'antd';
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
import { getReport } from './apiCalculatorReport';
import { CalculatorResponse, EReportType } from '../../../../../../myApi';
import { AlertInterface } from '../../../../../tt-components/interfaces';
import { Space, SpaceLine } from '01/shared/ui/Layout/Space/Space';
import { ModalCalculatorReportFormT } from './ModalCalculatorReport.types';

interface ModalCalculatorReportFormInterface {
  device: CalculatorResponse;
  handleCancel: any;
}

const { TabPane } = Tabs;

const ModalCalculatorReportForm = ({
  device,
  handleCancel,
}: ModalCalculatorReportFormInterface) => {
  const { model, serialNumber, address, nodes } = device;
  const { number, street } = address?.address?.mainAddress || {};
  const serialNumberCalculator = serialNumber;
  const modelCalculator = model;

  const [withNs, setWIthNs] = useState(false);

  const nodesList =
    nodes ||
    [].map((node) => {
      const { id, number, resource, communicationPipes } = node;

      const devices = _.flatten(
        communicationPipes ||
          [].map((communicationPipe) => {
            const { devices } = communicationPipe;
            return (
              devices ||
              [].reduce((result: any, item: any) => {
                const { housingMeteringDeviceType } = item;
                if (housingMeteringDeviceType === 'FlowMeter') {
                  result.push(item);
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

  const filteredGroup = _.groupBy(nodesList, 'resource');

  const resources = _.keys(filteredGroup);

  const {
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik<ModalCalculatorReportFormT>({
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

      const begin = values.begin.toISOString(true);
      const end = values.end.endOf('day').toISOString(true);

      const shortLink = `Reports/${withNs ? `ReportWithNs` : 'Report'}`;
      if (!nodeId) {
        return null;
      }
      const params = {
        NodeId: nodeId,
        ReportType: detail as EReportType,
        From: begin,
        To: end,
      };

      getReport(shortLink, params).then((response: any) => {
        const fileNameWithJunk = response.headers['content-disposition'].split(
          ';'
        );
        const encodedFileName = fileNameWithJunk[2].split("'")[2];
        const decodedFileName = decodeURI(encodedFileName).replace(/%2C/g, ',');
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', decodedFileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    },
  });

  const prevOptions = Object.values(filteredGroup[values.resource] || {});

  const options = prevOptions.map((node: any, index) => {
    const { id, number, communicationPipes } = node;

    const devicesList = _.flatten(
      communicationPipes.map((communicationPipe: any) => {
        const { devices } = communicationPipe;
        return devices.filter(
          (device: any) => device.housingMeteringDeviceType === 'FlowMeter'
        );
      })
    );

    let label = `Узел ${number}: ${modelCalculator} (${serialNumberCalculator})`;

    _.forEach(devicesList, (value: any) => {
      label = label + `, ${value.model} (${value.serialNumber})`;
    });
    return { value: id, label };
  });

  const Translate: any = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource: any) => Translate[resource];

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

  // Список Вкладок/Ресурсов
  const TabsList = resources.map((value, index) => {
    const res = translate(value);
    return <TabPane tab={res} key={value} />;
  });

  const defaultRes = translate(TabsList[0]);

  const Alert = ({ name }: AlertInterface) => {
    const touch = _.get(touched, `${name}`);
    const error = _.get(errors, `${name}`);
    if (touch && error) {
      return <div>{error}</div>;
    }
    return null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <Header>Выгрузка отчета об общедомовом потреблении</Header>
        <Tabs
          defaultActiveKey={defaultRes}
          onChange={(event) => {
            setFieldValue('resource', event);
            setFieldValue('nodeId', null);
          }}
        >
          {TabsList}
        </Tabs>
        <Form.Item label="Название отчета">
          <InputTT value={`${street}_${number}.exls`} readOnly />
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
              onChange={(event) => {
                setFieldValue('detail', event.target.value);
              }}
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
              setFieldValue('begin', event?.[0]);
              setFieldValue('end', event?.[1]);
            }}
            disabled={values.customPeriodDisabled}
          />
        </Form.Item>
        <SpaceLine />
        <Checkbox checked={withNs} onClick={() => setWIthNs((prev) => !prev)}>
          Выгрузка отчета с кодами НС
        </Checkbox>
        <Space />
      </StyledModalBody>
      <StyledFooter modal>
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
