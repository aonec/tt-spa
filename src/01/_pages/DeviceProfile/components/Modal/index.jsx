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
import { DEFAULT_ICON } from '../Templates';
import { Icon } from '../../../../_components/Icon';
import { DeviceContext } from '../../DeviceProfile';

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
    const type = useRef('coldwatersupply');

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

    const someFunc = () => {
      console.log(hubs);
      console.log(devicesList);
    };

    const list = [];
    const devicesList = [];

    const Translate = {
      "Heat": 'Отопление',
      "ColdWaterSupply": 'Холодная вода',
      "HotWaterSupply": 'Горячая вода',
    };

    const translate = (resource) => Translate[resource];

    const onTabsChangeHandler = (key) => {
      console.log('onTabsChangeHandler', key);
    };

    function DevicesListDiv(){
      devicesList.map(({
                         resource, entryNumber, type, serialNumber,
                       }, index) => {
        if (!list.includes(resource)) {
          list.push(resource);
        }
      });

      const someList = list.map((value, index) => {
        const res = translate(value);
        return (
          <TabPane tab={res} key={index + 1}>
            {res}
          </TabPane>
        );
      });

      return (
        <Tabs defaultActiveKey="1" onChange={onTabsChangeHandler}>
          {someList}
          <TabPane tab='Все' key="4">
            Все
          </TabPane>
        </Tabs>
      );
    }

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

    function callback(key){
      console.log(key);
      console.log('test');
    }

    const onSelectChange = () => {
      console.log('onSelectChange');
    };

    const onTabsChange = (event) => {
      console.log('onTabsChange', event);
    };

    // const selectOptions = [
    //   'Узел 1: ВКТ-7 (1234567890), ПРЭМ (1234567890), ПРЭМ (9876543210)',
    //   'Узел 2: ВКТ-7 (9876543210), ПРЭМ (23549579374023), ПРЭМ(29387592701)',
    // ];

    const selectOptions = [];
    devicesList.map(({ resource, serialNumber, entryNumber }) => {

        var users = [
          { 'user': 'barney', 'age': 36, 'active': true },
          { 'user': 'fred', 'age': 40, 'active': false },
          { 'user': 'pebbles', 'age': 1, 'active': true }
        ];

        if (_.find(selectOptions, function (o){
          return o.value === resource
        })) {


          // selectOptions.push({
          //   label: label + ` ПРЭМ ${serialNumber}) ${resource}`,
          //   value: resource,
          // });
        }
          // selectOptions.push({
          //   label: label + ` ПРЭМ ${serialNumber}) ${resource}`,
          //   value: resource,
        // });


        else {
          selectOptions.push({
            "label": `Узел ${entryNumber} ${model} ${serialNumberODPU} ПРЭМ (${serialNumber}) ${resource}`,
            "value": resource,
          });
        }


      }
    )
    ;

    const showExactOptions = () => {
    };

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

    const handleChange = () => {
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
            <DevicesListDiv/>
            <div>
              <Select
                defaultValue="Выберите узел"
                style={{ "width": '100%' }}
                onChange={handleChange}
                className="inner"
                options={selectOptions}
              />

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
  }
;

export default ModalODPU;
