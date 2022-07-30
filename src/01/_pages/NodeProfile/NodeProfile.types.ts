import { PipeNodeResponse } from "../../../api/types";
import { TabsItemInterface } from "../../tt-components/interfaces";

export type ContentProps = {
    tabItems: TabsItemInterface[];
    node: PipeNodeResponse | null;
    nodeId: string;
    path: string;
    loading: boolean;
  };