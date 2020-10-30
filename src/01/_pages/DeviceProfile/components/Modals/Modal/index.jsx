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

export const ModalODPU = ({ device }) => {
  console.log('props', device);
  // const { device, building, hubs } = useContext(DeviceContext);
  // const { device, building } = useContext(DeviceContext);

  const building = device.address;
  const { hubs } = device;

  // const device = CalculatorTemplate;
  // const building = CalculatorTemplate.address;
  // const { hubs } = CalculatorTemplate;

  const { id, model, serialNumber } = device;
  const serialNumberODPU = serialNumber;
  const { housingStockNumber, street } = building;

  const list = [];
  const devicesList = [];

  const period = useRef('month');
  const detail = useRef('hourly');
  const entryNumberRes = useRef();
  const pipeNumberRes = useRef();
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
  };

  if (hubsarr) {
    hubsarr.map((item, index) => {
      const {
        resource, housingMeteringDeviceType, hub, serialNumber,
      } = item;
      console.log("pipeNumber = ", pipeNumber)
      const { entryNumber, pipeNumber } = hub;
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
    console.log('devicesList', devicesList);
  }

  const onPeriodChange = (e) => {
    const res = e.target.value;
    period.current = res;
    setBegin(moment().subtract(1, res));
    setEnd(moment());
  };

  const selectOptions = [];

  console.log('devicesList', devicesList);

  devicesList.map(({ resource, serialNumber, entryNumber,pipeNumber }) => {
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
        pipeNumber
      });
    } else {
      selectOptions.push({
        label: `Узел ${entryNumber} ${model}: (${serialNumberODPU}), ПРЭМ (${serialNumber})`,
        value: resource,
        entryNumber,
        pipeNumber
      });
    }
  });

  const downloadReport = () => {
    console.log('entryNumberRes.current = ', entryNumberRes.current);
    if (entryNumberRes.current) {
      console.log('entryNumberRes', entryNumberRes.current);
      const link = `http://84.201.132.164:8080/api/reports/getByResource?deviceId=${id}&reporttype=${
        detail.current
      }&resourcetype=${type}&entrynumber=${
        entryNumberRes.current
      }&pipenumber=${pipeNumberRes.current}&from=${convertDateOnly(begin)}T00:00:00Z&to=${convertDateOnly(
        end,
      )}T00:00:00Z`;
      const lastTemplate = 'http://84.201.132.164:8080/api/reports/getByResource?deviceId=1542041&reporttype=hourly&resourcetype=coldwatersupply&entrynumber=2&from=2020-10-25T00:00:00Z&to=2020-10-27T00:00:00Z';

      const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z';
      const template2 = 'http://84.201.132.164:8080/api/reports/getByResource?deviceId=1510&reporttype=daily&resourcetype=Heat&entrynumber=1&from=2020-09-01T00:00:00Z&to=2020-09-15T00:00:00Z';
      // window.location.assign(link);
      console.log(link);
      // console.log(lastTemplate);
      window.open(link);
    } else {
      alert('Выберите узел!');
    }
  };

  function handleChange(value) {
    console.log(value);
    const b = _.filter(selectOptions, { value: `${value}` });
    const { entryNumber, pipeNumber } = { ...b[0] };
    console.log('number', entryNumber);
    entryNumberRes.current = entryNumber;
    pipeNumberRes.current = pipeNumber;
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
          {/* <ButtonTT>TEST</ButtonTT> */}
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
