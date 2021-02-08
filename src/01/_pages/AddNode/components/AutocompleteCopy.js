import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';

const dataSource = [
  { key: 1, value: 'Apple' },
  { key: 2, value: 'Apricot' },
  { key: 3, value: 'Blueberry' },
  { key: 4, value: 'Banana' },
  { key: 5, value: 'Cantaloupe' },
  { key: 6, value: 'Grape' },
  { key: 7, value: 'Guava' },
  { key: 8, value: 'Kiwi' },
  { key: 9, value: 'Lemon' },
  { key: 10, value: 'Lime' },
  { key: 11, value: 'Lychee' },
  { key: 12, value: 'Mango' },
  { key: 13, value: 'Melon' },
  { key: 14, value: 'Pear' },
  { key: 15, value: 'Pineapple' },
  { key: 16, value: 'Plum' },
  { key: 17, value: 'Orange' },
];

export const Autocomplete = () => {
  const [name, setName] = useState('');
  const [options, setOptions] = useState([]);

  const onSearch = (val) => {
    const filtered = dataSource.filter(
      (obj) => obj.key !== 0
                && obj.value
                  .toString()
                  .toLowerCase()
                  .includes(val),
    );
    setOptions(filtered);
  };
  const onSelect = (val, option) => {
    setName(option.value);
  };

  return (
    <div className="App">
      <h1>Your Simple Fruit Mart</h1>
      <h4>Choose fruit you want!</h4>
      <AutoComplete
        options={options}
        onSelect={(val, option) => onSelect(val, option)}
        onSearch={onSearch}
      >
        {/* <Input.Search size="large" placeholder="search fruit" /> */}
      </AutoComplete>
    </div>
  );
};

export default Autocomplete;
