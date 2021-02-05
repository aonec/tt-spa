import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const SearchInputAndAdd = () => {

  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);

  const onSelect = (data) => {
    console.log("onSelect", data)
  };

  const optionsList = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
  ]
  const onChange = (data) => {
    setValue(data);
    const resultOptionsList = options.reduce((result, item) => {
      const { value, label } = item;
      if (label.includes(data)) {
        result.push(item);
      }
      return result;
    }, []);
    setOptions(resultOptionsList);
  };


  return (
    <AutoComplete
      value={value}
      options={optionsList}
      onSelect={onSelect}
      onChange={onChange}
      placeholder="Введите серийный номер или IP адрес"
    />
  );
};

export default SearchInputAndAdd;
