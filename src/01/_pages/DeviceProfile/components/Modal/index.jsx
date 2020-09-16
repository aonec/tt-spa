import React, {
  useState,
  useContext,
  useRef,
  useEffect,
  Children,
} from 'react';
import './modal.scss';
import {
  Radio, ConfigProvider, DatePicker, Tabs, Select,
} from 'antd';
import 'antd/dist/antd.css';
import ruRu from 'antd/es/locale/ru_RU';
import { convertDateOnly } from '01/_api/utils/convertDate';
import moment from 'moment';
import $ from 'jquery';
import DeviceIcons from '01/_components/DeviceIcons';
import _ from 'lodash';
import { label } from '01/r_comp';
import { DEFAULT_ICON } from '../Templates';
import { Icon } from '../../../../_components/Icon';
import { DeviceContext } from '../../DeviceProfile';
import { DevicesListDiv } from './components/Tabs';

const { TabPane } = Tabs;
const { Option } = Select;
const { RangePicker } = DatePicker;

export const ModalODPU = () => {
  const { device, building, hubs } = useContext(DeviceContext);
  const { id, model, serialNumber } = { ...device };
  const serialNumberODPU = serialNumber;
  const { number, street } = { ...building };

  const period = useRef('month');
  const detail = useRef('daily');
  // const type = useRef('ColdWaterSupply');
  const entryNumberRes = useRef('1');
  const [type, setType] = useState();

  const [begin, setBegin] = useState(moment().subtract(1, 'month'));
  const [end, setEnd] = useState(moment());
  const [hubsarr, setHubsarr] = useState();

  useEffect(() => {
    setHubsarr(hubs);
  }, [hubs]);

  const datePickerHandler = (event) => {
    setBegin(event[0] || begin);
    setEnd(event[1] || end);
  };

  const list = [];
  const devicesList = [];

  const Translate = {
    Heat: 'Отопление',
    ColdWaterSupply: 'Холодная вода',
    HotWaterSupply: 'Горячая вода',
  };

  const translate = (resource) => Translate[resource];

  const onTabsChangeHandler = (key) => {
    console.log('onTabsChangeHandler', key);
    // type.current = key;
    setType(key);
    console.log(type);
  };

  // function DevicesListDiv() {
  //   devicesList.map(({
  //     resource, entryNumber, type, serialNumber,
  //   }, index) => {
  //     if (!list.includes(resource)) {
  //       list.push(resource);
  //     }
  //   });

  //   const someList = list.map((value, index) => {
  //     const res = translate(value);
  //     return (
  //       <TabPane tab={res} key={value}>
  //         {res}
  //       </TabPane>
  //     );
  //   });

  //   const defaultRes = translate(someList[0]);

  //   return (
  //     <Tabs defaultActiveKey={defaultRes} onChange={onTabsChangeHandler}>
  //       {someList}
  //     </Tabs>
  //   );
  // }

  // Получаем массив всех ПРЭМ, которые походят
  if (hubsarr) {
    hubsarr.map((value) => {
      const { resource, entryNumber, pipes } = { ...value };
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

  const onDetailChange = (e) => {
    const result = e.target.value;
    detail.current = result;
  };

  const onTypeChange = (e) => {
    const typeResult = e.target.value;
    type.current = typeResult;
  };

  function callback(key) {
    console.log(key);
    console.log('test');
  }

  // const onSelectChange = (event) => {
  //   console.log('onSelectChange', event);
  // };

  const onTabsChange = (event) => {
    console.log('onTabsChange', event);
  };

  // const selectOptions = [
  //   'Узел 1: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
  //   'Узел 2: ВКТ-7 (9876543210), ПРЭМ (23549579374023), ПРЭМ(29387592701)',
  // ];

  const selectOptions = [];
  devicesList.map(({ resource, serialNumber, entryNumber }) => {
    const users = [
      { user: 'barney', age: 36, active: true },
      { user: 'fred', age: 40, active: false },
      { user: 'pebbles', age: 1, active: true },
    ];

    if (_.find(selectOptions, (o) => o.value === resource)) {
      const res = _.find(selectOptions, (o) => o.value === resource);

      // res = { label: 'ssssssssss', value: 'ssss' };
      console.log(res);
      console.log(selectOptions.indexOf(res));
      const ind = selectOptions.indexOf(res);
      console.log('ind', ind);
      selectOptions.splice(ind, 1, {
        label: `${_.get(
          selectOptions[ind],
          'label',
          'default',
        )} ПРЭМ (${serialNumber}) ${resource}`,
        value: resource,
        number: entryNumber,
      });
    } else {
      selectOptions.push({
        label: `Узел ${entryNumber} ${model} ${serialNumberODPU} ПРЭМ (${serialNumber}) ${resource}`,
        value: resource,
        number: entryNumber,
      });
    }
  });

  const aa = selectOptions.map((value, index) => {
    console.log(index);
  });

  const showExactOptions = () => {};

  const downloadReport = () => {
    const link = `http://84.201.132.164:8080/api/reports/xlsx?deviceId=${id}&ereporttype=${
      detail.current
    }&resourcetype=${type}&entrynumber=${
      entryNumberRes.current
    }&from=${convertDateOnly(begin)}T00:00:00Z&to=${convertDateOnly(
      end,
    )}T00:00:00Z`;

    const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z';
    window.location.assign(link);
  };

  const hideMe = () => {
    $('.overlay').css('display', 'none');
  };

  function handleChange(value) {
    console.log(`selected ${value}`);

    const b = _.filter(selectOptions, { value: `${value}` });

    console.log('b', b);
    const { number } = { ...b[0] };
    console.log(number);
    entryNumberRes.current = number;
  }

  let b;
  const SelectReport = () => {
    console.log(type);

    console.log('b', _.filter(selectOptions, { value: `${type}` }));
    const b = _.filter(selectOptions, { value: `${type}` });
    return (
      <Select
        defaultValue="Выберите узел"
        style={{ width: '100%' }}
        onChange={handleChange}
        className="inner"
        options={b}
      />
    );
  };

  const someFunc = () => {
    console.log(type.current);
    console.log(selectOptions);

    console.log('b', _.filter(selectOptions, ['value', 'Heat']));
  };

  return (
    <div className="overlay">
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
          {/* <Demo /> */}
          <button onClick={someFunc}>someFunc</button>
          <DevicesListDiv
            list={list}
            devicesList={devicesList}
            translate={translate}
            onTabsChangeHandler={onTabsChangeHandler}
          />
          <div>
            <label className="modal__label" htmlFor="#input">
              Название отчета
            </label>
            <input
              className="modal__input"
              id="input"
              value={`${model}_${street}_${number}.exls`}
              disabled
            />

            <SelectReport />
          </div>
          <div className="period_and_type ">
            <div className="period">
              <label className="modal__label" htmlFor="#period">
                Период выгрузки
              </label>
              <ConfigProvider locale={ruRu}>
                <RangePicker
                  allowClear={false}
                  size="48px"
                  value={[begin, end]}
                  placeholder={['Дата Начала', 'Дата окончания']}
                  onChange={(event) => {
                    datePickerHandler(event);
                  }}
                />
              </ConfigProvider>
            </div>
            <div className="type">
              <label className="modal__label" htmlFor="#type">
                Тип архива
              </label>

              <Radio.Group
                defaultValue="month"
                size="large"
                onChange={(event) => onPeriodChange(event)}
              >
                <Radio.Button value="month" checked>
                  Месячный
                </Radio.Button>
                <Radio.Button value="day">Суточный</Radio.Button>
                <Radio.Button value="year">Годовой</Radio.Button>
              </Radio.Group>
            </div>
          </div>
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
  );
};

export default ModalODPU;
