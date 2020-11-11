import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Modal } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Title, ButtonTT } from '../../../../../tt-components';
import { convertDateOnly } from '../../../../../_api/utils/convertDate';
import { Bottom } from './components/Bottom';
import { Top } from './components/Top';
import { CalculatorTemplate, Translate } from './components/CalculatorTemplate';

export const ReportContext = React.createContext();

// export const ModalODPU = ({ device }) => {
export const ModalODPU = () => {
  const translate = (resource) => Translate[resource];
  const device = CalculatorTemplate;
  const {
    id, model, serialNumber, address, hubs,
  } = device;
  const { housingStockNumber, street, corpus } = address;

  const [type, setType] = useState('');
  const resources = []; // Список из ресурсов: ХВС, ГВС, Отопление
  const devicesList = []; // Список всех устройств
  const selectOptions = [];

  useEffect(() => {
    setType(resources[0]);
    console.log('type', type);
  }, []);

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

  const datePickerHandler = (event) => {
    setFieldValue('begin', event[0]);
    setFieldValue('end', event[1]);
  };

  const onTabsChangeHandler = (resource) => {
    setType(resource);
    setFieldValue('entryNumberRes', undefined);
    // setFieldValue('pipeNumberRes', undefined);
  };

  if (hubs) {
    hubs.map((item) => {
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

  const onPeriodChange = (event) => {
    const res = event.target.value;
    setFieldValue('period', res);
    setFieldValue('begin', moment().subtract(1, res));
    setFieldValue('end', moment());
  };

  devicesList.map(({
    resource, entryNumber, pipeNumber, serialNumber
  }) => {
    const currentSelection = _.find(selectOptions, { resource });
    if (currentSelection && (resource !== 'ColdWaterSupply')) {
      const index = selectOptions.indexOf(currentSelection);
      selectOptions.splice(index, 1, {
        label: `${_.get(
          selectOptions[index],
          'label',
          'default',
        )} ПРЭМ(${serialNumber})`,
        value: selectOptions.length,
        resource,
        entryNumber,
        pipeNumber,
      });
    } else {
      selectOptions.push({
        label: `Узел ${entryNumber} ${model}: ПРЭМ (${serialNumber})`,
        value: selectOptions.length,
        resource,
        entryNumber,
        pipeNumber,
      });
    }
  });



  devicesList.map((item) => {
    const { resource } = item;
    if (!(resources.includes(resource))) {
      resources.push(resource);
    }
  });

  const downloadReport = () => {
    if (values.entryNumberRes) {
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
    console.log("value", value)
    const b = _.filter(selectOptions, { value});
    const { entryNumber, pipeNumber } = b[0];
    setFieldValue('entryNumberRes', entryNumber);
    setFieldValue('pipeNumberRes', pipeNumber);
    console.log("NNN", b)
    console.log("entryNumber", entryNumber)
    console.log("pipeNumber", pipeNumber)
    console.log("selectOptions", selectOptions)

  }

  function onDetailChange(e) {
    const res = e.target.value;
    setFieldValue('detail', res);
  }

  const context = {
    values,
    datePickerHandler,
    devicesList,
    translate,
    onTabsChangeHandler,
    model,
    street,
    housingStockNumber,
    type,
    selectOptions,
    handleSomeChange,
    onPeriodChange,
    onDetailChange,
    resources,
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
        <form onSubmit={handleSubmit}>

          {/* <div>{JSON.stringify(devicesList)}</div> */}

          <div className="modal__top">
            <Title color="black">
              {`Выгрузка отчета о общедомовом потреблении ${model} (${serialNumber})`}
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
        </form>
      </Modal>
    </ReportContext.Provider>
  );
};

export default ModalODPU;
