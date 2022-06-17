import { ReactElement } from 'react';

export type ExtendedSearchProps = {
  open?: boolean;
  handleClose?: () => void;
  handleOpen?: () => void;
  handleApply?: () => void;
  handleClear?: () => void;
  extendedSearchContent?: ReactElement;
};
