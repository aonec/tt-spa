import React, { useContext, useState } from 'react';
import { AutoComplete } from 'antd';
import { ChangeDeviceContext } from '../index';
import { getCalculator, getOdpu } from '../apiChangeDevice';
import { ButtonTT } from '../../../../../tt-components';

const SearchInputAndAdd = () => {
  const {
    device, devices, selected, setSelected, state, setState, deviceType,
  } = useContext(ChangeDeviceContext);

  const availableDevices = devices.reduce((result, item) => {
    const {
      id, type, serialNumber, model,
    } = item;

    if (deviceType === 'Calculator' && type === 'Calculator') {
      result.push({
        value: id,
        label: `${model}: ${serialNumber}`,
      });
    }
    if (deviceType === 'FlowMeter' && type === 'Housing') {
      result.push({
        value: id,
        label: `${model}: ${serialNumber}`,
      });
    }
    return result;
  }, []);

  const [value, setValue] = useState('');
  const [id, setId] = useState();
  const [options, setOptions] = useState([]);

  const onSelect = (data, item) => {
    if (deviceType === 'Calculator') {
      getCalculator(data).then((res) => {
        setSelected(res);
      });
    }
    if (deviceType !== 'Calculator') {
      getOdpu(data).then((res) => {
        setSelected(res);
      });
    }
    setState('edit');
  };

  const onChange = (data) => {
    setValue(data);
    const devicesList = availableDevices.reduce((result, item) => {
      const { value, label } = item;
      if (label.includes(data)) {
        result.push(item);
      }
      return result;
    }, []);
    setOptions(devicesList);
  };

  const AddDeviceButton = () => {
    function handleAddDevice() {
      setState('add');
    }
    return (
      <ButtonTT
        color="white"
        onClick={handleAddDevice}
        style={{ marginLeft: 16 }}
      >
        + Добавить новый прибор
      </ButtonTT>
    );
  };

  return (
    <div>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 672
        }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="Введите номер прибора или выберите из списка"
      />
      <AddDeviceButton />
    </div>
  );
};

export default SearchInputAndAdd;
