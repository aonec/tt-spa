import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  Children,
} from 'react';
import '01/tt-components/antd.scss';
import {
  Radio, ConfigProvider, DatePicker, Tabs, Select,
} from 'antd';

import { Header, SelectTT, InputTT, ButtonTT, DatePickerTT } from '../../../../../tt-components'

import ruRu from 'antd/es/locale/ru_RU';
import { convertDateOnly } from '01/_api/utils/convertDate';
import moment from 'moment';
import $ from 'jquery';
import DeviceIcons from '01/_components/DeviceIcons';
import _ from 'lodash';
import { label } from '01/r_comp';
import { DEFAULT_ICON } from '../../Templates';
import { Icon } from '../../../../../_components/Icon';
import { DeviceContext } from '../../../DeviceProfile';
import { DevicesListDiv } from './components/Tabs';
import { SelectReport } from './components/SelectReport';
import { Bottom } from './components/Bottom';
import { Top } from './components/Top';
import './modal.scss';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

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
  const { device, building, hubs } = useContext(DeviceContext);
  const { id, model, serialNumber } = { ...device };
  const serialNumberODPU = serialNumber;
  const { number, street } = { ...building };

  const list = [];
  const devicesList = [];
  let b;

  const period = useRef('month');
  const detail = useRef('daily');
  const entryNumberRes = useRef();
  const [type, setType] = useState(list[0]);

  // const [type, setType] = useState();
  // const [begin, setBegin] = useState(moment().subtract(1, 'month'));
  // const [end, setEnd] = useState(moment());

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
  // function foo() {
  //   $('.ant-tabs-tab-active').click();
  // }

  // setTimeout(foo, 1000);

  const onTabsChangeHandler = (resource) => {
    console.log('onTabsChangeHandler', resource);
    $('.ant-select-selection-item').html('Выберите узел');
    setType(resource);
    entryNumberRes.current = undefined;
    // console.log(type);
  };

  // Получаем массив всех ПРЭМ, которые походят
  if (hubsarr) {
    hubsarr.map((value) => {
      let { resource, entryNumber, pipes } = { ...value };
      pipes = pipes || [];
      const pipesList = pipes.map((values) => {
        const { devices } = { ...values };
        const devicesRes = devices.map((value) => {
          const { serialNumber, type } = { ...value };
          if (type === 'FlowMeter') {
            devicesList.push({
              resource,
              entryNumber,
              type,
              serialNumber,
            });
          }
        });
      });
    });
  }

  const onPeriodChange = (e) => {
    const res = e.target.value;
    period.current = res;
    setBegin(moment().subtract(1, res));
    setEnd(moment());
  };

  const selectOptions = [];
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
      window.location.assign(link);
      // window.open(link);
      console.log(link);
    } else {
      alert('Выберите узел!');
    }
  };

  function handleChange(value) {
    const b = _.filter(selectOptions, { value: `${value}` });
    const { number } = { ...b[0] };
    console.log('number', number);
    entryNumberRes.current = number;
  }

  function onDetailChange(e) {
    const res = e.target.value;
    detail.current = res;
    // setBegin(moment().subtract(1, res));
    // setEnd(moment());
  }
  const someFunc = () => {
    console.log('type = ', type);
    console.log('entryNumberRes.current', entryNumberRes.current);
    console.log('begin', begin);
    console.log('end', end);
    console.log('period', period);
    console.log('detail', detail);
  };
  const a = 55;
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
        number,
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
