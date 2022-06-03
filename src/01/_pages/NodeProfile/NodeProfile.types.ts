import { TabsItemInterface } from "01/tt-components/interfaces";
import { PipeNodeResponse } from "myApi";

export type ContentProps = {
    tabItems: TabsItemInterface[];
    node: PipeNodeResponse | null;
    nodeId: string;
    path: string;
    loading: boolean;
  };