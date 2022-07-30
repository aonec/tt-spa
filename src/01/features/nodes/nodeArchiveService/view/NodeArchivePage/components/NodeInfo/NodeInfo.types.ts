import { PipeNodeResponse } from "../../../../../../../../api/types";

export type NodeInfoProps = {
  node: PipeNodeResponse | null;
  loading: boolean;
};
