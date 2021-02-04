import React, { useState } from 'react';
import { AutoComplete } from 'antd';


const SearchInputAndAdd = ({ calculators }) => {

  const [value, setValue] = useState('');

  const [options, setOptions] = useState([
    { value: 1, label: '123' },
    { value: 2, label: '2234' },
    { value: 3, label: '3333' },
  ]);
  const onChange = (searchText) => {
    console.log("searchText", searchText)
    setValue(searchText)
    const resultList = options.reduce((result, item) => {
      const { label } = item;
      if (label.includes(searchText)) {
        result.push(item);
      }
      return result;
    }, [])

    setOptions(resultList);
  };
  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  return (
    <AutoComplete
      options={options}
      onSelect={onSelect}
      onChange={onChange}
      placeholder="Серийный номер или IP адрес"
    />
  );
};

export default SearchInputAndAdd;
