import React from 'react';
import { AutoComplete } from 'antd';
import '../antd.scss';
import styled from 'styled-components';
import IconTT from '../IconTT';

const styles = {
  padding: '8px 24px',
  'font-style': 'normal',
  'font-weight': 'normal',
  'font-size': '16px',
  'line-height': '32px',
};
export const AutoCompleteTT = ({ options, onSelect }) => (
  <AutoComplete
    className="autocomplete"
    options={options}
    filterOption
    onSelect={onSelect}
    placeholder="Введите данные"
    dropdownStyle={styles}
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
