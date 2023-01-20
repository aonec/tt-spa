import { EResourceType } from 'myApi';

export type NodesInfoProps = {
  nodesTinyData: {
    number: number;
    id: number;
    resource: EResourceType;
    entryNumber: number | null;
  }[];
};