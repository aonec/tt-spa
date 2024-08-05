import { NodeServiceZoneResponse } from 'api/types';

export type Props = {
  deletingServiceZone: NodeServiceZoneResponse | null;
  deletingServiceZoneCount: number | null;
  isDeleteServiceZoneDialogOpen: boolean;
  handleSubmit: () => void;
  handleCancel: () => void;
};
