import { ResourceDisconnectingResponsePagedList } from "myApi";

export type DisablingListProps = {
    resources: ResourceDisconnectingResponsePagedList | null;
    loading: boolean;
    setPage: (payload: number) => void;
    openModal: () => void;
  }