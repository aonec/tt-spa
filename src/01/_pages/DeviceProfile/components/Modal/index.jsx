import React, {
  useState, useContext, useRef, useEffect,
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
import { DeviceContext } from '../../DeviceProfile';
import { Icon } from '../../../../_components/Icon';
import { DEFAULT_ICON } from '../Templates';

const { TabPane } = Tabs;
const { Option } = Select;

export const ModalODPU = () => {
  const { device, building, hubs } = useContext(DeviceContext);
  const { id, model } = { ...device };
  const { number, street } = { ...building };

  const period = useRef('month');
  const detail = useRef('daily');
  const type = useRef('coldwatersupply');

  const [begin, setBegin] = useState(moment().subtract(1, 'month'));
  const [end, setEnd] = useState(moment());
  const [hubsarr, setHubsarr] = useState();

  const selectOptions = [
    'Узел 1: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
    'Узел 2: ВКТ-7 (9876543210), ПРЭМ (23549579374023), ПРЭМ(29387592701)',
  ];

  useEffect(() => {
    setHubsarr(hubs);
    console.log('hubs = ', hubs);
  }, [hubs]);

  const datePickerHandler = (event) => {
    setBegin(event[0] || begin);
    setEnd(event[1] || end);
  };

  const someFunc = () => {
    console.log(hubsarr);
    console.log(devicesList);
  };

  const devicesList = [];

  let TabsList;

  // Получаем массив всех ПРЭМ, которые походят
  if (hubsarr) {
    // console.log('hubsarr', hubsarr);
    hubsarr.map((value) => {
      const { resource, entryNumber, pipes } = { ...value };
      // console.log(resource);
      const pipesList = pipes.map((values) => {
        const { devices } = { ...values };
        // console.log(devices);
        const devicesRes = devices.map((value) => {
          const { serialNumber, type } = { ...value };
          if (type === 'FlowMeter') {
            // console.log(serialNumber);
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

    TabsList = () => (
      // <>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
    );
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
  }

  const onSelectChange = () => {
    console.log('onSelectChange');
  };

  const onTabsChange = (event) => {
    console.log('onTabsChange', event);
  };

  const { RangePicker } = DatePicker;

  const downloadReport = () => {
    const link = `http://84.201.132.164:8080/api/reports/xlsx?deviceId=${id}&ereporttype=${
      detail.current
    }&resourcetype=${type.current}&entrynumber=2&from=${convertDateOnly(
      begin,
    )}T00:00:00Z&to=${convertDateOnly(end)}T00:00:00Z`;

    const template = 'http://84.201.132.164:8080/api/reports/xlsx?deviceId=1510&ereporttype=daily&resourcetype=heat&entrynumber=1&from=2020-08-15T00:00:00Z&to=2020-08-25T00:00:00Z';
    window.location.assign(link);
  };

  const hideMe = () => {
    $('.overlay').css('display', 'none');
  };

  const Demo = () => (
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="Tab 1" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="Tab 2" key="2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane tab="Tab 3" key="3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  );

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
          <Demo />
          <button onClick={someFunc}>someFunc</button>
          <div>
            <Select
              placeholder="Выберите узел"
              style={{ width: 300 }}
              onChange={onSelectChange}
            >
              <Option value="jack">{selectOptions[0]}</Option>
              <Option value="lucy">{selectOptions[1]}</Option>
            </Select>

            <label className="modal__label" htmlFor="#input">
              Название отчета
            </label>
            <input
              className="modal__input"
              id="input"
              value={`${model}_${street}_${number}.exls`}
              disabled
            />
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
              <label className="modal__label" htmlFor="#resource">
                Тип ресурса
              </label>

              <Radio.Group
                id="resource"
                defaultValue="coldwatersupply"
                size="large"
                onChange={(event) => onTypeChange(event)}
              >
                <Radio.Button value="coldwatersupply" checked>
                  Холодная вода
                </Radio.Button>
                <Radio.Button value="heat">Горячая вода</Radio.Button>
              </Radio.Group>
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
              <label className="modal__label" htmlFor="#type">
                Детализация
              </label>
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

// Создаем Табы
// const tabsArr = () => hubsarr.map((value, id) => {
//   const { resource, entryNumber } = { ...value };
//   switch (resource) {
//     case 'Heat':
//       Arr.Heat.push(value);
//       break;
//     case 'ColdWaterSupply':
//       Arr.Cold.push(value);
//       break;
//     case 'HotWaterSupply':
//       Arr.Hot.push(value);
//       break;
//     default:
//   }
// });

// let a;
// if (hubsarr) {
//   a = hubsarr.map((value, id) => {
//     const { resource, entryNumber } = { ...value };
//     switch (resource) {
//       case 'Heat':
//         Arr.Heat.push(value);
//         break;
//       case 'ColdWaterSupply':
//         Arr.Cold.push(value);
//         break;
//       case 'HotWaterSupply':
//         Arr.Hot.push(value);
//         break;
//       default:
//     }

//     const { icon, color, translate } = DeviceIcons[resource] || DEFAULT_ICON;

//     return (
//       <TabPane tab={translate} key={id + 1}>
//         <div>{`${translate} ${entryNumber}`}</div>
//         <Icon icon={icon} color={color} />
//       </TabPane>
//     );
//   });
// }
