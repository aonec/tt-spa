import React from 'react';

import { Header } from '../../tt-components';
import TabsDevices from './components/TabsDevices';
import {useSelector} from "react-redux";

export const DevicesFromSearch = () => {

    const devicePage = useSelector((state) => state.devicePage);
  return  (
        <div>
            <Header>Приборы</Header>
            <TabsDevices devicePage={devicePage}/>
        </div>
    )
}



export default DevicesFromSearch;
