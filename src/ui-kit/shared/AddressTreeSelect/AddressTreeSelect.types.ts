export type AddressTreeSelectProps = {
  treeData: TreeSelectElement[];
  small?: boolean;
  onChange: (idsHashs: string[]) => void;
  selectedHousingStockIdsHashs: string[];
  disabled?: boolean;
  placeholder?: string;
};

export type TreeSelectElement = {
  title: string;
  key: string | number;
  value: string | number;
  children?: TreeSelectElement[];
};
