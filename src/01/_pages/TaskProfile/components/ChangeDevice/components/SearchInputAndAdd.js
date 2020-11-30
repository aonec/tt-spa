import React, { useContext, useState } from 'react';
import { AutoComplete } from 'antd';
import { ChangeDeviceContext } from '../index';
import { getOdpu } from '../apiChangeDevice';
import ButtonTT from "../../../../../tt-components/ButtonTT";

const SearchInputAndAdd = () => {

  const {
    device, devices, selected, setSelected, state, setState
  } = useContext(ChangeDeviceContext);

  const availableDevices = devices.reduce((result, item) => {
    const {
      id, type, serialNumber, model,
    } = item;

    // if (device.calculator === null && type === 'Calculator') {
    //   result.push({
    //     value: id,
    //     label: `${model}: ${serialNumber}`,
    //   });
    // }
    //
    // if (device.calculator !== null && type === 'Housing') {
      result.push({
        value: id,
        label: `${model}: ${serialNumber}`,
      });
    // }
    return result;
  }, []);

  const [value, setValue] = useState('');
  const [id, setId] = useState();
  const [options, setOptions] = useState([]);

  const onSelect = (data, item) => {
    // setValue(item.label);
    // setId(item.value);
    // console.log(data);
    getOdpu(data).then((res) => {
      setSelected(res);
    });
    setState('edit')
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

  const AddDeviceButton = () =>{
    console.log("AddDevice");

    function handleAddDevice(){
      setState('add');
    }
    return (
      <ButtonTT
        color={'blue'}
        onClick={handleAddDevice}
      >Добавить</ButtonTT>
    )
  }

  function handleOnSearchFocus() {

  }

  return (
    <div>
      <AutoComplete
        value={value}
        options={options}
        style={{
          width: 200,
        }}
        onSelect={onSelect}
        onChange={onChange}
        onFocus={handleOnSearchFocus}
        placeholder="Введите серийный номер"
      />
      <span>или</span>
      <AddDeviceButton />
    </div>
  );
};

export default SearchInputAndAdd;
