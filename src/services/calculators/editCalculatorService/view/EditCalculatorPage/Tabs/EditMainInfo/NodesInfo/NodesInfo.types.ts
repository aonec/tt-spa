import { EResourceType } from 'api/types';

export type NodesInfoProps = {
  nodesTinyData: {
    number: number;
    id: number;
    resource: EResourceType;
    entryNumber: number | null;
  }[];
};
