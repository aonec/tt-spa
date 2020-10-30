import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import $ from 'jquery';
import { convertDateOnly } from '../../../../../_api/utils/convertDate';

import { Icon } from '../../../../../_components/Icon';
import { DeviceContext } from '../../../DeviceProfile';

import { SelectReport } from './components/SelectReport';
import { Bottom } from './components/Bottom';
import { Top } from './components/Top';
import './modal.scss';
import { ButtonTT } from '../../../../../tt-components';
import { CalculatorTemplate } from './components/CalculatorTemplate.js';

const Translate = {
  Heat: 'Отопление',
  ColdWaterSupply: 'Холодная вода',
  HotWaterSupply: 'Горячая вода',
};

const hideMe = () => {
  $('.overlay').css('display', 'none');
};

const translate = (resource) => Translate[resource];

export const ReportContext = React.createContext();

export const ModalODPU = () => {
  // const { device, building, hubs } = useContext(DeviceContext);
  //const { device, building } = useContext(DeviceContext);
  const device = CalculatorTemplate;
  const building = CalculatorTemplate.address;
  const {hubs} = CalculatorTemplate
  const { id, model, serialNumber } = device;
  const serialNumberODPU = serialNumber;
  const { housingStockNumber, street } = building;

  const list = [];
  const devicesList = [];

  const period = useRef('month');
  const detail = useRef('daily');
  const entryNumberRes = useRef();
  const [type, setType] = useState(list[0]);

  const [begin, setBegin] = useState(moment().subtract(1, 'month'));
  const [end, setEnd] = useState(moment());

  const [hubsarr, setHubsarr] = useState();

  const datePickerHandler = (event) => {
    setBegin(event[0] || begin);
    setEnd(event[1] || end);
  };

  useEffect(() => {
    setHubsarr(hubs);
  }, [hubs]);

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
    entryNumberRes.current = undefined;
    // console.log(type);
  };

  // Получаем массив всех ПРЭМ, которые подходят

  // closingDate: null
  // diameter: "80"
  // futureCheckingDate: "2019-08-05T03:00:00"
  // futureCommercialAccountingDate: "2019-08-05T03:00:00"
  // housingMeteringDeviceType: "FlowMeter"
  // hub: {entryNumber: 1, hubNumber: null, pipeNumber: 0, magistral: "FeedFlow"}
  // id: 1546256
  // lastCheckingDate: "2015-08-05T03:00:00"
  // lastCommercialAccountingDate: "2018-10-22T03:00:00"
  // managementFirm: {id: 4, name: "ООО УК"ПЖКХ-17"", phoneNumber: null, information: null, timeZoneOffset: "03:00:00"}
  // model: "РС (90-А)"
  // resource: "Heat"
  // serialNumber: "057904"
  // transactionType: null

  // if (hubsarr) {
  //   hubsarr.map((value) => {
  //     let { resource, entryNumber, pipes } = value;
  //     pipes = pipes || [];
  //     const pipesList = pipes.map((values) => {
  //       const { devices } = values;
  //       const devicesRes = devices.map((value) => {
  //         const { serialNumber, type } = { ...value };
  //         if (type === 'FlowMeter') {
  //           devicesList.push({
  //             resource,
  //             entryNumber,
  //             type,
  //             serialNumber,
  //           });
  //         }
  //       });
  //     });
  //   });
  // }

  const onPeriodChange = (e) => {
    const res = e.target.value;
    period.current = res;
    setBegin(moment().subtract(1, res));
    setEnd(moment());
  };

  // const selectOptions = [];
  const selectOptions = [
    {
      value: 1,
      label: 'Номер трубы 1: ПРЭМ (1234567890), ПРЭМ (9876543210)',
    },
    {
      value: 2,
      label: 'Номер трубы 2: ПРЭМ (1234567890), ПРЭМ (9876543210)',
    },
  ];

  devicesList.map(({ resource, serialNumber, entryNumber }) => {
    if (_.find(selectOptions, (o) => o.value === resource)) {
      const res = _.find(selectOptions, (o) => o.value === resource);

      const ind = selectOptions.indexOf(res);
      selectOptions.splice(ind, 1, {
        label: `${_.get(
          selectOptions[ind],
          'label',
          'default',
        )} ПРЭМ (${serialNumber})`,
        value: resource,
        number: entryNumber,
      });
    } else {
      selectOptions.push({
        label: `Узел ${entryNumber} ${model}: (${serialNumberODPU}), ПРЭМ (${serialNumber})`,
        value: resource,
        number: entryNumber,
      });
    }
  });

  const downloadReport = () => {
    console.log("entryNumberRes.current = ", entryNumberRes.current)
    if (entryNumberRes.current) {
      console.log('entryNumberRes', entryNumberRes.current);
      const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
        detail.current
      }&resourcetype=${type}&entrynumber=${
        entryNumberRes.current
      }&from=${convertDateOnly(begin)}T00:00:00Z&to=${convertDateOnly(
        end,
      )}T00:00:00Z`;

      const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z';
      const template2 = 'http://84.201.132.164:8080/api/reports/getByResource?deviceId=1510&reporttype=daily&resourcetype=Heat&entrynumber=1&from=2020-09-01T00:00:00Z&to=2020-09-15T00:00:00Z';
      // window.location.assign(link);
      console.log(link)
      // window.open(link);
    } else {
      alert('Выберите узел!');
    }
  };

  function handleChange(value) {
    console.log(value)
    const b = _.filter(selectOptions, { value: `${value}` });
    const { number } = { ...b[0] };
    console.log('number', number);
    entryNumberRes.current = number;
  }

  function onDetailChange(e) {
    const res = e.target.value;
    detail.current = res;

  }

  const someFunc = () => {
  };

  return (
    <ReportContext.Provider
      value={{
        begin,
        end,
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
        handleChange,
        onPeriodChange,
        onDetailChange,
      }}
    >
      <div className="overlay" id="modal-report-device">
        <div className="modal-odpu">
          <ButtonTT>TEST</ButtonTT>
          <Icon
            className="modal__close"
            icon="close"
            color="#272F5A"
            onClick={hideMe}
          />
          <div className="modal__top">
            <h3 className="modal__title">
              Выгрузка отчета о общедомовом потреблении
            </h3>
            <Top />
            <Bottom />
          </div>

          <div className="modal__bottom">
            <button
              className="modal__button modal__button_cancel"
              onClick={hideMe}
            >
              Отмена
            </button>
            <button
              className="modal__button modal__button_ok"
              onClick={downloadReport}
            >
              Выгрузить
            </button>
          </div>
        </div>
      </div>
    </ReportContext.Provider>
  );
};

export default ModalODPU;

// const selectOptions = [
//   'Узел 1: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
//   'Узел 2: ВКТ-7 (9876543210), ПРЭМ (23549579374023), ПРЭМ(29387592701)',
// ];
