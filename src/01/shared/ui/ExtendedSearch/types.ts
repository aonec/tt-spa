import { ReactElement, ReactNode } from "react";

export type ExtendedSearchProps = {
  isOpen: boolean;
  handleClose: () => void;
  handleOpen: () => void;
  handleApply: () => void;
  handleClear: () => void;
  extendedSearchContent: ReactElement;
  disabled?: boolean;
  children?: ReactNode;
};
