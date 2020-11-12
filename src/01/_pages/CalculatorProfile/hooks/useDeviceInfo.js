import React from "react"
import { useParams } from "react-router-dom"

import { usePageFetch, useCancel, useStorageData } from "01/hooks"
import {getInfo, getObjectOfDevice, getODPUTasks, getRelatedDevices} from "../../../_api/device_page";

const useDeviceInfo = (typeODPU) => {


    getInfo(deviceId),
        getObjectOfDevice(objid),
        getODPUTasks(deviceId),
        getRelatedDevices(deviceId),
    // getTypeODPU(deviceId),
    // getCalculatorResources(deviceId),
])
.then((responses) => {
    const [{value: device}, {value: building}, {value: tasks}, {value: related}] = responses;

    setDevice(device);
    setBuilding(building);
    setTasks(tasks.items);
    setRelated(related);


    React.useEffect(() => {
        if (typeODPU === 'Calculator') {

    } else {

        }
        }, [typeODPU]
        )

    return {
        loading,
        tabs: [
            { name: "К исполнению" + (ex ? ` (${ex})` : ""), to: "executing" },
            { name: "Наблюдаемые" + (ob ? ` (${ob})` : ""), to: "observing" },
            { name: "Архивные", to: "archived" },
        ],
        taskList: data?.items ?? [],
    }
}

export default useDeviceInfo;