import React, { useEffect } from 'react';
import { Form, Radio, Tabs } from 'antd';
import moment from 'moment';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import _ from 'lodash';
import Checkbox from 'antd/es/checkbox/Checkbox';
import {
  StyledRadio,
  ButtonTT,
  Header,
  InputTT,
  SelectTT,
  StyledFooter,
  StyledModalBody,
  DatePickerTT,
} from '../../../../../tt-components';

import { getReport } from './apiCalculatorReport';
import { AlertInterface } from '../../../../../tt-components/interfaces';

const { TabPane } = Tabs;

const ModalSonoSafeReportForm = ({ device, handleCancel, visible }: any) => {
  const { id, model, serialNumber, address, hubs, nodes } = device;
  const nodeId = nodes[0].id;
  const { housingStockNumber, street } = address;
  const serialNumberCalculator = serialNumber;
  const modelCalculator = model;

  // Все Расходомеры
  const devicesList =
    hubs ||
    [].reduce((result: Array<any>, item: any) => {
      const {
        resource,
        housingMeteringDeviceType,
        hub,
        serialNumber,
        model,
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
  const resources = ['Heat'];

  // Создать объект с ключами из списка ресурсов, а значений - модифицириваннные массивы из getSelectionsFormatterByType
  const getDevicesSelectionByType = (group: any) =>
    _.keys(group).reduce((acc: any, item: string) => {
      acc[item] = getSelectionsFormatterByType(group[item], item);
      return acc;
    }, {});

  // Редюсер по типу ресура
  const getSelectionsFormatterByType = (list: Array<any>, type: string) => {
    switch (type) {
      case 'ColdWaterSupply':
        return list.map((item, index) => ({
          ...item,
          value: index + 1,
          label: `Узел ${index + 1} ${modelCalculator}: ${item.model} (${
            item.serialNumber
          })`,
        }));
      case 'HotWaterSupply':
        return reduceList(list);
      case 'Heat':
        return reduceList(list);
      default:
        return list;
    }
  };

  // Функция для возврата измененного массива по ресурсу, сравниваем entryNumber
  const reduceList = (list: Array<any>) => {
    const sortedByEntryNumber = _.groupBy(list, 'entryNumber');
    return _.values(sortedByEntryNumber).map((item, index) => {
      if (item.length > 1) {
        const { entryNumber, pipeNumber } = item[0];
        return {
          entryNumber,
          pipeNumber,
          value: index + 1,
          label: `Узел ${
            index + 1
          } ${modelCalculator}(${serialNumberCalculator}): ${item[0].model} (${
            item[0].serialNumber
          }), ${item[1].model} (${item[1].serialNumber})`,
        };
      }
      return {
        ...item[0],
        value: index + 1,
        label: `Узел ${
          index + 1
        } ${modelCalculator} (${serialNumberCalculator}): ${item[0].model} (${
          item[0].serialNumber
        })`,
      };
    });
  };

  const sonorSelection = {
    Heat: [
      {
        value: nodeId,
        label: 'Sono',
      },
    ],
  };
  // Итоговый объект для Select
  // const devicesSelectionByType = getDevicesSelectionByType(filteredGroup);
  const devicesSelectionByType =
    model !== 'Sonosafe'
      ? getDevicesSelectionByType(filteredGroup)
      : sonorSelection;

  const { handleSubmit, values, touched, errors, setFieldValue } = useFormik({
    initialValues: {
      period: 'month',
      detail: 'monthly',
      begin: moment().startOf('month').subtract(1, 'months'),
      end: moment().endOf('month').subtract(1, 'months'),
      nodeId,
      resource: resources[0],
      checked: true,
      customDisabled: true,
      currentValue: undefined,
    },
    validationSchema: Yup.object({
      nodeId: Yup.number().typeError('Выберите узел'),
    }),
    onSubmit: async () => {
      const { nodeId, detail, resource } = values;
      const begin = `${moment(values.begin).format('YYYY-MM-DD')}`;
      const end = `${values.end.format('YYYY-MM-DD')}`;

      const shortLink = `Reports/Report?nodeId=${nodeId}&reportType=${detail}&from=${begin}&to=${end}`;

      console.log('shortLink', shortLink);
      getReport(shortLink).then((response: any) => {
        const fileNameWithJunk = response.headers['content-disposition'].split(
          ';',
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

  const Translate: any = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource: string) => Translate[resource];

  const onPeriodChange = (event: any) => {
    const res = event.target.value;
    if (res === 'custom') {
      setFieldValue('begin', moment().subtract(1, 'months').startOf('month'));
    }
    if (res === 'month') {
      setFieldValue('begin', moment().startOf('month').subtract(1, 'months'));
    }
    setFieldValue('period', res);
    setFieldValue('customDisabled', res === 'month');
  };

  const onDetailChange = (event: any) => {
    const res = event.target.value;
    setFieldValue('detail', res);
  };

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
    setFieldValue('currentValue', undefined);
    setFieldValue('entryNumber', null);
    setFieldValue('pipeNumber', null);
  };

  const handleSelect = (value: any, object: any) => {
    setFieldValue('currentValue', value);
    setFieldValue('entryNumber', object.entryNumber);
    setFieldValue('pipeNumber', object.pipeNumber);
  };

  useEffect(() => {
    handleSelect(
      devicesSelectionByType[values.resource][0].value,
      devicesSelectionByType[values.resource][0],
    );
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <StyledModalBody>
        <Header style={{ margin: 0, padding: 0 }}>
          Выгрузка отчета о общедомовом потреблении SonoSafe
        </Header>

        <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}>
          {TabsList}
        </Tabs>
        <Form.Item label="Название отчета">
          <InputTT value={`${street}_${housingStockNumber}.exls`} readOnly />
        </Form.Item>

        <Form.Item label="Выбор узла">
          <SelectTT
            options={devicesSelectionByType[values.resource]}
            placeholder="Выберите узел"
            onChange={handleSelect}
            value={values.currentValue}
            name="entryNumber"
            disabled
          />
          <Alert name="entryNumber" />
        </Form.Item>

        <div id="period_and_type " style={{ display: 'flex' }}>
          <Form.Item label="Период" style={{ width: '50%' }}>
            <Radio.Group
              defaultValue="month"
              size="large"
              onChange={(event) => onPeriodChange(event)}
            >
              <StyledRadio key="month" value="month" checked>
                За прошлый месяц
              </StyledRadio>
              <StyledRadio key="custom" value="custom">
                Произвольный период
              </StyledRadio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="Детализация отчета" style={{ width: '50%' }}>
            <Radio.Group
              defaultValue="monthly"
              size="large"
              onChange={(event) => onDetailChange(event)}
            >
              <StyledRadio key="monthly" value="monthly">
                Месячная
              </StyledRadio>
            </Radio.Group>
          </Form.Item>
        </div>

        <div style={{ display: 'flex' }}>
          <Form.Item label="Начало" style={{ width: 144 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              allowClear={false}
              picker="month"
              value={values.begin}
              name="begin"
              placeholder="Выберите месяц"
              onChange={(date: any) => {
                setFieldValue('begin', date.startOf('month'));
              }}
              disabled={values.customDisabled}
            />
          </Form.Item>

          <Form.Item label="Окончание" style={{ width: 144, marginLeft: 32 }}>
            <DatePickerTT
              format="DD.MM.YYYY"
              allowClear={false}
              picker="month"
              name="end"
              value={values.end}
              placeholder="Выберите месяц"
              onChange={(date) => {
                setFieldValue('end', date?.endOf('month'));
              }}
              disabled={values.checked || values.customDisabled}
            />
          </Form.Item>
        </div>

        <Checkbox
          checked={values.checked}
          // disabled={this.state.disabled}
          onChange={(e) => {
            const { checked } = e.target;
            setFieldValue('checked', checked);
            if (checked) {
              setFieldValue('end', '');
            }
          }}
          disabled={values.customDisabled}
        >
          Отчет за 1 месяц
        </Checkbox>
      </StyledModalBody>

      <StyledFooter modal>
        <ButtonTT color="white" onClick={handleCancel}>
          Отмена
        </ButtonTT>
        <ButtonTT color="blue" type="submit" big style={{ marginLeft: 16 }}>
          Выгрузить
        </ButtonTT>
      </StyledFooter>
    </form>
  );
};

export default ModalSonoSafeReportForm;
