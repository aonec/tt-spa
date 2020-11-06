import React, { useEffect, useState } from 'react';
import { List } from 'antd';
import ChangeOdpuEmpty from './components/ChangeOdpuEmpty/ChangeOdpuEmpty';
import SearchOrAdd from './components/SearchOrAdd/SearchOrAdd';
import ChangeOdpuAdd from './components/ChangeOdpuAdd/ChangeOdpuAdd';
import ChangeOdpuEdit from './components/ChangeOdpuEdit/ChangeOdpuEdit';
import axios from '../../../../axios';
import { getClosedDevices } from './changeDeviceApi';
import {
  items, serviceLife, housingMeteringDeviceTypes, resources, magistrals, isConnectedValue,
} from './constants';

export const ChangeOdpuContext = React.createContext();

const ChangeOpdu = (props) => {
  const { id, type, getData = () => {} } = props;
  console.log(props);

  const [serialNumber, setSerialNumber] = useState('');
  const [list, setList] = useState([]);
  const [oldDevice, setOldDevice] = useState({});
  const [newDevice, setNewDevice] = useState({});

  async function getHousingMeteringDevice(HousingMeteringDeviceId = '') {
    try {
      const res = await axios.get(`HousingMeteringDevices/${HousingMeteringDeviceId}`);
      console.log(res);
      setNewDevice(res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  console.log('serialNumber', serialNumber);

  const updateSeriaNumber = (value) => {
    setSerialNumber(value);
  };

  useEffect(() => {
    if (serialNumber.length > 2) {
      getClosedDevices(type, serialNumber).then((res) => {
        const devicesList = res.map((item) => {
          const { model, serialNumber, id } = item;
          return { value: serialNumber, label: `${model} (${serialNumber})`, id };
        });
        setList(devicesList);
        console.log('list', list);
      });
    }
  }, [serialNumber]);

  useEffect(() => {
    async function getHousingMeteringDevice(id = '') {
      try {
        const res = await axios.get(`HousingMeteringDevices/${id}`);
        console.log(res);
        setOldDevice(res);
        return res;
      } catch (error) {
        console.log(error);
        throw {
          resource: 'device',
          message: 'Произошла ошибка запроса устройства',
        };
      }
    }
    getHousingMeteringDevice(id);
  }, []);

  useEffect(() => {
    console.log('oldDevice', oldDevice);
    console.log(JSON.stringify(oldDevice));
  }, [oldDevice]);

  const DevicesList = () => {
    console.log('List');
    return (
      <div style={{ position: 'absolute', width: '460px' }}>
        {list.length > 0 && (
          <List
            size="large"
            style={{
              zIndex: '2',
              backgroundColor: 'white',
              cursor: 'pointer',
            }}
            bordered
            dataSource={list}
            renderItem={(item) => (
              <List.Item onClick={() => {
                console.log(item.value);
                getHousingMeteringDevice(item.id);
                showEdit();
                console.log("item.id", item.id)
                // setNewDevice(item.id)

                getData({
                  calculatorSwitch: { deviceId: id, newDeviceId: item.id } ?? null,
                });

                setList([]);
              }}
              >
                {item.label}
              </List.Item>
            )}
          />
        )}

      </div>
    );
  };

  function handleChangeTab(value) {
    setTab(value);
  }

  const [empty, setEmpty] = useState({
    visible: true,
  });
  const [edit, setEdit] = useState({
    visible: false,
  });
  const [add, setAdd] = useState({
    visible: false,
  });

  const showEmpty = () => {
    setNewDevice({});
    setTab('1');
    setEmpty((prevState) => ({ ...prevState, visible: true }));
    setEdit((prevState) => ({ ...prevState, visible: false }));
    setAdd((prevState) => ({ ...prevState, visible: false }));
  };

  const showEdit = () => {
    setEmpty((prevState) => ({ ...prevState, visible: false }));
    setEdit((prevState) => ({ ...prevState, visible: true }));
    setAdd((prevState) => ({ ...prevState, visible: false }));
  };

  const showAdd = () => {
    setEmpty((prevState) => ({ ...prevState, visible: false }));
    setEdit((prevState) => ({ ...prevState, visible: false }));
    setAdd((prevState) => ({ ...prevState, visible: true }));
  };

  const [currentTabKey, setTab] = useState('1');
  console.log('currentTabKey', currentTabKey);

  const context = {
    handleChangeTab,
    newDevice,
    currentTabKey,
    setTab,
    showEmpty,
    showAdd,
    showEdit,
    updateSeriaNumber,
    DevicesList,
    items,
    serviceLife,
    housingMeteringDeviceTypes,
    resources,
    magistrals,
    isConnectedValue,
    oldDevice,
  };

  return (
    <ChangeOdpuContext.Provider
      value={context}
    >
      <div>
        <h6>{`ID = ${id}`}</h6>
        <p>{`Тип прибора = ${type}`}</p>
        <SearchOrAdd />
        {/* <ButtonTT color="blue" onClick={showEmpty}>BUTTON</ButtonTT> */}
        <div>{JSON.stringify(newDevice, null, 2)}</div>
        {(empty.visible === true) ? <ChangeOdpuEmpty /> : null }
        {(edit.visible === true) ? <ChangeOdpuEdit /> : null}
        {(add.visible === true) ? <ChangeOdpuAdd /> : null}

      </div>
    </ChangeOdpuContext.Provider>
  );
};

export default ChangeOpdu;
