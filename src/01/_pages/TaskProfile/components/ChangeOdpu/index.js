import React, { useEffect, useState } from 'react';
import { Form, List } from 'antd';
import { ButtonTT, InputTT } from '../../../../tt-components';
import ChangeOdpuEmpty from './components/ChangeOdpuEmpty';
import SearchOrAdd from './components/SearchOrAdd';
import ChangeOdpuAdd from './components/ChangeOdpuAdd';
import ChangeOdpuEdit from './components/ChangeOdpuEdit';
import axios from '../../../../axios';

async function getClosedDevices(type = '', serialNumber = '') {
  const typeRes = type === 'Calculator' ? 'Calculator' : 'Housing';
  try {
    const res = await axios.get(`MeteringDevices/search?DeviceType=${typeRes}&Status=Closed&Question=${serialNumber}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    throw {
      resource: 'device',
      message: 'Произошла ошибка запроса устройств',
    };
  }
}

const ChangeOpdu = (props) => {
  const { id, type } = props;
  const [state, setState] = useState();
  const [serialNumber, setSerialNumber] = useState('');
  const [list, setList] = useState([]);

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

  const DevicesList = () => {
    console.log('List');
    return (
      <div style={{ position: 'absolute' , width: '460px'}}>
        {list.length > 0 && (
          <List
            size="large"
            style={{
              zIndex: '2',
              backgroundColor: 'white',
            }}
            bordered
            dataSource={list}
            renderItem={(item) => (
              <List.Item onClick={() => {
                console.log(item.value);
                // setFieldValue('serialNumber', item.value);

                // getHousingMeteringDevice(item.id);
                console.log(item.id);

                // showModalChangeOdpu();
                // setList([]);
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

  return (
    <div>
      <h6>{`ID = ${id}`}</h6>
      <p>{`Тип прибора = ${type}`}</p>
      <div>{state}</div>
      <SearchOrAdd DevicesList={DevicesList} updateSeriaNumber={updateSeriaNumber} serialNumber={state} showEmpty={showEmpty} showAdd={showAdd} showEdit={showEdit} />
      <ButtonTT color="blue" onClick={showEmpty}>BUTTON</ButtonTT>

      {(empty.visible === true) ? <ChangeOdpuEmpty /> : null }
      {(edit.visible === true) ? <ChangeOdpuEdit serialNumber={serialNumber} /> : null}
      {(add.visible === true) ? <ChangeOdpuAdd /> : null}

    </div>
  );
};

export default ChangeOpdu;

const Empty = () => {
  console.log('Empty');
  return (
    <Form>
      <InputTT
        placeholder="Empty"
      />
    </Form>
  );
};

const Edit = () => {
  console.log('Edit');
  return (
    <Form>
      <InputTT
        placeholder="Edit"
      />
    </Form>
  );
};

const Add = () => {
  console.log('Add');
  return (
    <Form>
      <InputTT
        placeholder="Add"
      />
    </Form>
  );
};
