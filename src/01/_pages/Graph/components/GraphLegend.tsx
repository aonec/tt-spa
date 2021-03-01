import React from 'react';
import {ResourceType} from "./GraphView";
import {getResourceColor} from "../../../utils/getResourceColor";

interface Props {
    resource: ResourceType
}

const GraphLegend:React.FC<Props> = ({resource}) => {
    debugger;
    console.log(getResourceColor(resource))
 return (
  <div style={{color: getResourceColor(resource)}}>
   12311
  </div>
 );
};

export default GraphLegend;