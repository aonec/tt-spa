import React, {
  useState, useEffect,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import $ from 'jquery';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Title, ButtonTT } from '../../../../../tt-components';
import { convertDateOnly } from '../../../../../_api/utils/convertDate';
import { SelectReport } from './components/SelectReport';
import { Bottom } from './components/Bottom';
import { Top } from './components/Top';
import { CalculatorTemplate } from './components/CalculatorTemplate';

const Translate = {
  Heat: 'Отопление',
  ColdWaterSupply: 'Холодная вода',
  HotWaterSupply: 'Горячая вода',
};

const translate = (resource) => Translate[resource];

export const ReportContext = React.createContext();

// export const ModalODPU = ({ device }) => {
export const ModalODPU = () => {
  const device = CalculatorTemplate;
  console.log('CalculatorTemplate', device);
  const {
    id, model, serialNumber, address, hubs,
  } = device;
  const serialNumberODPU = serialNumber;
  const { housingStockNumber, street, corpus } = address;

  const list = [];
  const devicesList = [];

  const {
    handleSubmit, handleChange, values, touched, errors,
    handleBlur, setFieldValue,
  } = useFormik({
    initialValues: {
      period: 'month',
      detail: 'hourly',
      entryNumberRes: null,
      pipeNumberRes: null,
      begin: moment().subtract(1, 'month'),
      end: moment(),


    },
    validationSchema: Yup.object({
      test: Yup.string().required('Строка не должна быть пустой'),
    }),
    onSubmit: async () => {
      const form = {
        input1: values.test,
      };
      console.log(JSON.stringify(form));
      alert('Посмотрите результат в консоли');
    },
  });

  const [type, setType] = useState(list[0]);

  const datePickerHandler = (event) => {
    setFieldValue('begin', event[0]);
    setFieldValue('end',event[1]);
  };

  useEffect(() => {
    function foo() {
      $('.ant-tabs-tab-active').click();
    }

    console.log('device = ', device);
    setTimeout(foo, 1000);
  }, []);

  const onTabsChangeHandler = (resource) => {
    console.log('onTabsChangeHandler', resource);
    $('.ant-select-selection-item').html('Выберите узел');
    setType(resource);
    setFieldValue('entryNumberRes', undefined);
  };

  if (hubs) {
    hubs.map((item, index) => {
      const {
        resource, housingMeteringDeviceType, hub, serialNumber,
      } = item;
      const { entryNumber, pipeNumber } = hub;
      if (housingMeteringDeviceType === 'FlowMeter') {
        devicesList.push({
          resource,
          entryNumber,
          pipeNumber,
          housingMeteringDeviceType,
          serialNumber,
        });
      }
    });
    console.log('devicesList', devicesList);
  }

  const onPeriodChange = (e) => {
    const res = e.target.value;
    setFieldValue('period', res);
    setFieldValue('begin',moment().subtract(1, res));
    setFieldValue('end',moment());
  };

  const selectOptions = [];

  console.log('devicesList', devicesList);

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

  const downloadReport = () => {
    console.log('entryNumberRes.current = ', values.entryNumberRes);
    if (values.entryNumberRes) {
      console.log('entryNumberRes', values.entryNumberRes);
      const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
        values.detail
      }&resourcetype=${type}&entrynumber=${
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
    console.log(value);
    const b = _.filter(selectOptions, { value: `${value}` });
    const { entryNumber, pipeNumber } = { ...b[0] };
    console.log('number', entryNumber);
    setFieldValue('entryNumberRes', entryNumber);
    setFieldValue('pipeNumberRes', pipeNumber);
  }

  function onDetailChange(e) {
    const res = e.target.value;
    setFieldValue('detail', res);
  }

  const context = {
values,
    datePickerHandler,
    list,
    devicesList,
    translate,
    onTabsChangeHandler,
    model,
    street,
    housingStockNumber,
    SelectReport,
    type,
    selectOptions,
    handleSomeChange,
    onPeriodChange,
    onDetailChange,
  };

  return (
    <ReportContext.Provider
      value={context}
    >
      <Modal
        visible
        width="800px"
        footer={null}
      >
        <div className="modal__top">
          <Title color="black">
            Выгрузка отчета о общедомовом потреблении
          </Title>
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

      </Modal>
    </ReportContext.Provider>
  );
};

export default ModalODPU;
