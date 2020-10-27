import React, { useEffect, useState } from 'react';
import { AutoComplete } from 'antd';
import axios from '../../../../../axios';

const mockVal = (str, repeat = 1) => ({
  value: str.repeat(repeat),
});

const Complete = () => {
  const [value, setValue] = useState('');
  const [options, setOptions] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log('items', items);

  }, [items]);

  async function getCalculators(input = '') {
    try {
      const res = await axios.get(`Calculators?Question=${input}&PageNumber=1&PageSize=5`);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      throw {
        resource: 'device',
        message: 'Произошла ошибка запроса устройства',
      };
    }
  }

  const onSearch = (searchText) => {
    // setOptions(
    //   !searchText ? [] : [mockVal(searchText), mockVal(searchText, 2), mockVal(searchText, 3)],
    // );
    console.log('onSearch');
    getCalculators(searchText).then((res) => {
      setItems(res.items);
    });
  };

  const onSelect = (data) => {
    console.log('onSelect', data);
  };

  const onChange = (data) => {
    setValue(data);
  };

  return (
    <AutoComplete
      value={value}
      options={options}
      style={{
        width: 200,
      }}
      onSelect={onSelect}
      onSearch={onSearch}
      onChange={onChange}
      placeholder="control mode"
    />
  );
};

export default Complete;
