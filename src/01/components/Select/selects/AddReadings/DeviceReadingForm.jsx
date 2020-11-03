import React from 'react';
import rateTypeToNumber from "../../../../_api/utils/rateTypeToNumber";


const DeviceReadingForm = ({device}) => {

    const numberOfReadings = rateTypeToNumber(device.rateType);

    const readingsArray = [];
    for (let i=1; i <= numberOfReadings; i++) {
        readingsArray.push(device.readings[0][`value${i}`])
    }
    debugger;


    const DeviceReadingsLine = () => readingsArray.map((value, index) => (
        <span style={{width: `${100/readingsArray.length}%`}}>Тариф {index+1}: {value}</span>
    ));

    // switch (numberOfReadings) {
    //     case 1:
    //         DeviceReadingLine = () => <div>
    //             <span>Тариф 1: {device.readings[0].value1}</span>
    //         </div>;
    //     break;
    //
    //     case 2:
    //         DeviceReadingLine = () => <div>
    //             <span>Тариф 1: {device.readings[0].value1}</span>
    //             <span>Тариф 2: {device.readings[0].value2}</span>
    //         </div>;
    //         break;
    //
    //     case 3:
    //         DeviceReadingLine = () => <div>
    //             <span>Тариф 1: {device.readings[0].value1}</span>
    //             <span>Тариф 2: {device.readings[0].value2}</span>
    //             <span>Тариф 3: {device.readings[0].value3}</span>
    //         </div>;
    //         break;
    //
    //     case 4:
    //         DeviceReadingLine = () => <div>
    //             <span>Тариф 1: {device.readings[0].value1}</span>
    //             <span>Тариф 2: {device.readings[0].value2}</span>
    //             <span>Тариф 3: {device.readings[0].value3}</span>
    //             <span>Тариф 4: {device.readings[0].value4}</span>
    //         </div>;
    //         break;
    // }
    debugger;

    return <div>
        <DeviceReadingsLine />
    </div>
    // const DeviceReadingLine = (device) => {
    //     device.readings.map((reading, readingNumber) => (
    //         <div>
    //             Тариф {readingNumber}:
    //         </div>))
    // }
}

export default DeviceReadingForm;