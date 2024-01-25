import { ReactNode } from 'react';

export type SelectedEntityPanelProps = {
  onEdit?: () => void;
  onRemove?: () => void;
  children?: ReactNode;
};
