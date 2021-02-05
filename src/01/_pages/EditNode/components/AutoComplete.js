import React, { useState } from 'react';
import { AutoComplete } from 'antd';

const mockVal = (str, repeat) => {
  return {
    value: str.repeat(repeat),
  };
};

const Complete = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const onSearch = (searchText) => {
    setOptions(
      !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    );
  };
  const onSelect = (data) => {
    console.log('onSelect', data);
  };
  const onChange = (data) => {
    setValue(data);
  };
  return (
    <AutoComplete
      options={options}
      style={{ width: 200 }}
      onSelect={onSelect}
      onSearch={onSearch}
      placeholder="input here"
    />
  );
};

export default Complete;
