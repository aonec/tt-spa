import React from 'react';
import TabsDevices from './components/TabsDevices';
import {useSelector} from "react-redux";

export const DevicesFromSearch = () => {

    const devicePage = useSelector<any>((state) => state.devicePage);
    return  (
        <div>
            <h1 style={{fontWeight: 300, marginBottom: 16}}>Приборы</h1>
            <TabsDevices devicePage={devicePage}/>
        </div>
    )
}



export default DevicesFromSearch;
