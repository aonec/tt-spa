import React from 'react';
import { AutoComplete } from 'antd';
import styled from 'styled-components';
import img from './search.svg';

export const StyledAutoComplete = styled(AutoComplete)`
  padding: 0;
  margin: 0;
  position: relative;

  .ant-select-selector {
    padding: 0;
    margin: 0;
    height: 48px !important;
    border: 1px solid $grey;
    border-radius: 4px !important;

    span {
      padding: 8px 24px 8px 40px !important;
      font-size: 16px;
      line-height: 32px;
      font-style: normal;
      font-weight: $normal;

      .ant-select-selection-placeholder {
        color: $placeholder;
      }

      .ant-select-selection-search {
        left: 0;
      }
    }

    &:before {
      position: absolute !important;
      content: '';
      display: block;
      background-image: url(${img});
      width: 16px;
      height: 16px;
      left: 16px;
      top: calc(50% - 8px);
    }
  }
`;

export interface AutoCompleteInterface {
  key: number;
  value: string;
  label?: string;
}

interface AutoCompleteTTInterface {
  options: Array<AutoCompleteInterface>;
  onSelect: any;
  filterOption?: any;
  value: any;
}

export const AutoCompleteTT = ({
  options,
  onSelect,
  filterOption,
  value,
}: AutoCompleteTTInterface) => (
  <StyledAutoComplete
    options={options}
    filterOption={filterOption}
    onSelect={onSelect}
    value={value}
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
