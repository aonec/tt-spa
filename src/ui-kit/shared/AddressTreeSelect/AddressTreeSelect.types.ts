export type AddressTreeSelectProps = {
  treeData: TreeSelectElement[];
  small?: boolean;
  onChange: (ids: number[]) => void;
  selectedHousingStockIds: number[];
  disabled?: boolean;
  placeholder?: string;
};

export type TreeSelectElement = {
  title: string;
  key: string | number;
  value: string | number;
  children?: TreeSelectElement[];
};
