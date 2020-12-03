import React, { useContext, useState } from 'react';
import { AutoComplete } from 'antd';
import { ChangeDeviceContext } from '../index';
import { getCalculator, getOdpu } from '../apiChangeDevice';
import { ButtonTT } from '../../../../../tt-components';
import {selectedTemplate} from './localBase'

const SearchInputAndAdd = () => {
  const {
     devices, setSelected,  setState, deviceType,
  } = useContext(ChangeDeviceContext);

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

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
    if (deviceType === ('FlowMeter' || 'ThermoSensor') && type === 'Housing') {
      result.push({
        value: id,
        label: `${model}: ${serialNumber}`,
      });
    }
    return result;
  }, []);

  const onSelect = (data) => {
    if (deviceType === 'Calculator') {
      getCalculator(data).then((res) => {
        setSelected(res);
      });
    }
    else {
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
      setSelected(selectedTemplate)
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
          width: '49%'
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
