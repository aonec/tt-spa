export type AddressTreeSelectProps = {
  treeData: TreeSelectElement[];
  onChange: (ids: number[]) => void;
  selectedHousingStockIds: number[];
  disabled?: boolean;
};

export type TreeSelectElement = {
  title: string;
  key: string | number;
  value: string | number;
  children?: TreeSelectElement[];
};
