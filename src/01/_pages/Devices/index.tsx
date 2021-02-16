import React from 'react';

import { Header } from '../../tt-components';
import TabsDevices from './components/TabsDevices';
import {useSelector} from "react-redux";
import Graph from "../Graph/Graph";

export const DevicesFromSearch = () => {

    const devicePage = useSelector((state) => state.devicePage);
    return  (
        <div>
            <h1 style={{fontWeight: 300, marginBottom: 16}}>Приборы</h1>
            <Graph />
            <TabsDevices devicePage={devicePage}/>
        </div>
    )
}



export default DevicesFromSearch;
