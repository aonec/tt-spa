import React, { useContext, useState } from 'react';
import { AutoComplete } from 'antd';
import { ChangeDeviceContext } from './index';

const Complete = () => {
  const { device, devices } = useContext(ChangeDeviceContext);

  const availableDevices = devices.reduce((result, item) => {
    const {
      id, type, serialNumber, model,
    } = item;

    if (device.calculator === null && type === 'Calculator') {
      result.push({
        value: id,
        label: `${model}: ${serialNumber}`,
      });
    }

    if (device.calculator !== null && type === 'Housing') {
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
    setValue(item.label);
    setId(item.value);
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

  return (
    <>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onChange={onChange}
        placeholder="Введите серийный номер"
      />
    </>
  );
};

export default Complete;
