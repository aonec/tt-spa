import { TabsItemInterface } from "01/tt-components/interfaces";
import { PipeNodeResponse } from "myApi";

export type ContentProps = {
    tabItems: TabsItemInterface[];
    node: PipeNodeResponse | null;
    setAddDevice: React.Dispatch<React.SetStateAction<boolean>>;
    nodeId: string;
    unitRecord: boolean;
    setUnitRecord: React.Dispatch<React.SetStateAction<boolean>>;
    path: string;
    loading: boolean;
  };