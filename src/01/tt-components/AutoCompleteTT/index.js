import React from 'react';
import { AutoComplete } from 'antd';
import '../antd.scss';

export const AutoCompleteTT = ({ options, onSelect }) => (
  <AutoComplete
    options={options}
    filterOption
    onSelect={onSelect}
    placeholder="Введите данные"
  />
);

export default AutoCompleteTT;

// const someArray = [
//     { key: 2538492, value: 'ТЭМ-106 140141' },
//     { key: 2538494, value: 'ВКТ-7 153961' },
//     { key: 2538493, value: 'ВКТ-7 72372' },
//     { key: 2538495, value: 'ВКТ-7 142743' },
//     { key: 25384954, value: 'ВКТ-7 1427434' },
// ];
