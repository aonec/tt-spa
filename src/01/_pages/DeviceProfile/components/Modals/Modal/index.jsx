import React, { useRef, useMemo } from 'react';
import _ from 'lodash';
import moment from 'moment';
import {
  Form, Modal, Radio, Tabs,
} from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Title, ButtonTT, RangePickerTT, InputTT, SelectTT,
} from '../../../../../tt-components';
import { convertDateOnly } from '../../../../../_api/utils/convertDate';
import { CalculatorTemplate, Translate } from './components/CalculatorTemplate';

const { TabPane } = Tabs;

// export const ModalODPU = ({ device }) => {
export const ModalODPU = () => {
  const translate = (resource) => Translate[resource];
  const device = CalculatorTemplate;
  const {
    id, model, serialNumber, address, hubs,
  } = device;
  const { housingStockNumber, street, corpus } = address;

  // Список всех устройств, которые являются расходомерами
  // const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
  const devicesList = useMemo((device) => hubs.reduce((result, item) => {
    const {
      resource, housingMeteringDeviceType, hub, serialNumber,
    } = item;
    const { entryNumber, pipeNumber } = hub;
    if (housingMeteringDeviceType === 'FlowMeter') {
      result.push({
        resource,
        entryNumber,
        pipeNumber,
        housingMeteringDeviceType,
        serialNumber,
      });
    }
    return result;
  }, []));

  console.log('devicesList', devicesList);

  // Список всех типов Расходомеров: ХВС, ГВС, Отопление
  const resources = useMemo((device) => devicesList.reduce((result, item) => {
    const { resource } = item;
    if (!(result.includes(resource))) {
      result.push(resource);
    }
    return result;
  }, []));

  console.log('resources', resources);

  // Список всех доступных строк для выбора Узла
  const selectOptions = devicesList.reduce((result, item) => {
    const {
      resource, entryNumber, pipeNumber, serialNumber,
    } = item;
    const currentSelection = _.find(result, { resource });
    console.log('resource = ', resource);
    if (!currentSelection || (resource === 'ColdWaterSupply')) {
      result.push({
        key: result.length,
        label: `Узел ${entryNumber} ${model}: ПРЭМ (${serialNumber})`,
        resource,
        entryNumber,
        pipeNumber,
        value: result.length,
      });
    } else {
      const ind = result.indexOf(currentSelection);
      result.splice(ind, 1, {
        label: `${_.get(
          result[ind],
          'label',
          'default',
        )} ПРЭМ(${serialNumber})`,
        resource,
        value: currentSelection.value,
        entryNumber,
        pipeNumber,
        key: currentSelection.key,
      });
    }
    return result;
  }, []);
  console.log('selectOptions', selectOptions);

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      period: 'month',
      detail: 'daily',
      entryNumberRes: undefined,
      pipeNumberRes: undefined,
      begin: moment().subtract(1, 'month').toISOString(),
      end: moment().toISOString(),
      currentTab: resources[0],
      currentSelect: null,
    },
    validationSchema: Yup.object({
      // test: Yup.string().required('Строка не должна быть пустой'),
    }),
    onSubmit: async () => {
      const form = {
        input1: values.test,
      };
      console.log(JSON.stringify(form));
      alert('Посмотрите результат в консоли');
    },
  });

  const Top = () => {
    console.log('Top');
    return (
      <>
        <Form.Item label=" Название отчета">
          <InputTT
            value={`${street}_${housingStockNumber}.exls`}
            disabled
          />
        </Form.Item>

        <Form.Item label="Выбор узла">
          <SelectTT
            options={modifiedSelectOptions}
            placeholder="Выберите узел"
            onChange={handleSomeChange}
          />
        </Form.Item>
      </>
    );
  };

  const ReportTabs = () => {
    const resList = resources.map((value) => {
      const res = translate(value);
      return <TabPane tab={res} key={value} />;
    });

    return (
      <Tabs activeKey={values.currentTab} onChange={onTabsChangeHandler}>
        {resList}
      </Tabs>
    );
  };

  const Bottom = () => {
    console.log('Bottom');

    const datePickerHandler = (event) => {
      setFieldValue('begin', event[0].toISOString());
      setFieldValue('end', event[1].toISOString());
    };

    const onPeriodChange = (event) => {
      const res = event.target.value;
      setFieldValue('period', res);
      setFieldValue('begin', (moment().subtract(1, res)).toISOString());
      setFieldValue('end', moment().toISOString());
    };

    return (
      <>
        <Form.Item label="Тип архива">
          <Radio.Group
            defaultValue={values.period}
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
            defaultValue={values.detail}
            size="large"
            onChange={(event) => onDetailChange(event)}
          >
            <Radio.Button value="daily" checked>
              Суточная
            </Radio.Button>
            <Radio.Button value="hourly">Часовая</Radio.Button>
          </Radio.Group>
        </Form.Item>

        <Form.Item label="Период выгрузки">
          <RangePickerTT
            format="DD.MM.YYYY"
            allowClear={false}
            value={[moment(values.begin), moment(values.end)]}
            placeholder={['Дата Начала', 'Дата окончания']}
            onChange={(event) => {
              datePickerHandler(event);
            }}
          />
        </Form.Item>

      </>
    );
  };

  const modifiedSelectOptions = selectOptions.filter((option) => option.resource == values.currentTab);

  const onTabsChangeHandler = (resource) => {
    setFieldValue('currentTab', resource);
    // setType(resource);
    setFieldValue('entryNumberRes', undefined);
    setFieldValue('pipeNumberRes', undefined);
  };

  console.log('sources', resources);

  const downloadReport = () => {
    if (values.entryNumberRes) {
      const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
        values.detail
      }&resourcetype=${values.currentTab}&entrynumber=${
        values.entryNumberRes
      }&pipenumber=${values.pipeNumberRes}&from=${convertDateOnly(values.begin)}T00:00:00Z&to=${convertDateOnly(
        values.end,
      )}T00:00:00Z`;

      console.log(link);
      window.open(link);
    } else {
      alert('Выберите узел!');
    }
  };

  function handleSomeChange(value) {
    console.log('value', value);
    console.log(modifiedSelectOptions[value]);
    const b = _.find(modifiedSelectOptions, { value });
    console.log("b", b)
    // // setFieldValue('currentSelect', value);
    // // const b = _.filter(selectOptions, { value });
    const { entryNumber, pipeNumber } = b;
    console.log("entryNumber, pipeNumber", entryNumber, pipeNumber)
    // setFieldValue('entryNumberRes', entryNumber);
    // setFieldValue('pipeNumberRes', pipeNumber);
  }

  function onDetailChange(e) {
    const res = e.target.value;
    setFieldValue('detail', res);
  }

  const buttonHandler = () => {
    console.log(values);
  };

  return (
    <Modal
      visible
      width="800px"
      footer={null}
    >
      <ButtonTT onClick={buttonHandler}>ButtonTT</ButtonTT>
      <form onSubmit={handleSubmit}>

        <div className="modal__top">
          <Title color="black">
            {`Выгрузка отчета о общедомовом потреблении ${model} (${serialNumber})`}
          </Title>
          <ReportTabs />
          <Top />
          <Bottom />
        </div>

        <div className="modal__bottom">
          <ButtonTT
            color="white"
          >
            Отмена
          </ButtonTT>
          <ButtonTT
            color="blue"
            onClick={downloadReport}
          >
            Выгрузить
          </ButtonTT>
        </div>
      </form>
    </Modal>
  );
};

export default ModalODPU;
