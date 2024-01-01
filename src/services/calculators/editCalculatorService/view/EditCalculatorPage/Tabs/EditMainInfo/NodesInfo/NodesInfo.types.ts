import { EResourceType } from 'api/types';

export type NodesInfoProps = {
  nodesTinyData: {
    title: string | null;
    id: number;
    resource: EResourceType;
    entryNumber: number | null;
  }[];
};
