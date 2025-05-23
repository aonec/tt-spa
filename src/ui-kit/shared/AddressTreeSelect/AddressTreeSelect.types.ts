import { TreeSelectProps } from 'antd';

export type TreeKey = string | number;

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
  key: TreeKey;
  value: TreeKey;
  buildingId?: number;
  children?: TreeSelectElement[];
};

export type TreeSelectElementWithParents = TreeSelectElement & {
  parents: TreeKey[];
};
