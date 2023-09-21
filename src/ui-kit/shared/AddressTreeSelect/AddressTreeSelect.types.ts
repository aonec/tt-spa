import { TreeSelectProps } from 'antd';

export type AddressTreeSelectProps = {
  treeData: TreeSelectElement[];
  small?: boolean;
  onChange: (ids: number[]) => void;
  selectedHousingStockIds: number[];
  disabled?: boolean;
  placeholder?: string;
  placement?: TreeSelectProps['placement'];
};

export type TreeSelectElement = {
  title: string;
  key: string | number;
  value: string | number;
  children?: TreeSelectElement[];
};

export type TreeSelectElementWithParents = TreeSelectElement & {
  parents: (string | number)[];
};
