export type SelectGraphTypeItemProps = {
  disabled: boolean;
  checked: boolean;
  setChecked: (checked: boolean) => void;
  color: string;
  text: string;
  isLoading?: boolean;
  isConsumptionDataEmpty?: boolean;
};
