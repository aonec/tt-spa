import React, {
  useState,
  useContext,
  useRef,
  useEffect,
} from 'react';
import _ from 'lodash';
import moment from 'moment';
import $ from 'jquery';
import { Modal } from 'antd';
import { convertDateOnly } from '../../../../../_api/utils/convertDate';

import { device } from './components/CalculatorTemplate';
import ModalCalculatorReportForm from './ModalCalculatorReportForm';

const Translate = {
  Heat: 'Отопление',
  ColdWaterSupply: 'Холодная вода',
  HotWaterSupply: 'Горячая вода',
};

const translate = (resource) => Translate[resource];

export const ModalCalculatorReport = () => {
  console.log('props', device);

  const building = device.address;
  const { housingStockNumber, street } = building;
  const { hubs } = device;
  const { id, model, serialNumber } = device;
  const serialNumberODPU = serialNumber;

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

  useEffect(() => {
    setHubsarr(hubs);
  }, [hubs]);

  useEffect(() => {
    function foo() {
      $('.ant-tabs-tab-active').click();
    }
    setTimeout(foo, 1000);
  }, []);

  if (hubsarr) {
    hubsarr.map((item, index) => {
      const {
        resource, housingMeteringDeviceType, hub, serialNumber,
      } = item;

      const { entryNumber, pipeNumber } = hub;
      console.log('pipeNumber = ', pipeNumber);
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



  return (
    <Modal
      visible
      width={800}
      footer={null}
    >
      <ModalCalculatorReportForm device={device} />
    </Modal>
  );
};

export default ModalCalculatorReport;
