import React, {useEffect, useState} from 'react';
import rateTypeToNumber from "../../../../_api/utils/rateTypeToNumber";


const DeviceReadingForm = ({device}) => {

    const [readingsState, setReadingsState] = useState([]);

    const numberOfReadings = rateTypeToNumber(device.rateType);
    // const readingsArray = [];
    // setReadingsArray([45, 66, 1243]);

    useEffect(() => {
        const readingsArray = [];

        for (let i=1; i <= numberOfReadings; i++) {
            readingsArray.push(device.readings[0][`value${i}`])
        }
        setReadingsState(readingsArray)

    }, [])




    const onInputChange = (e, index) => {
        e.preventDefault();
        // readingsArray[index] = e.target.value;
        let newState = [...readingsState];
        newState[index] = e.target.value;
        setReadingsState(newState)
    }

    // setReadingsArray(readingsArray)



    const DeviceReadingsLine = () => readingsState.map((value, index) => (
        <>
        <span style={{width: `${100/readingsState.length}%`}}>Тариф {index+1}: {value}</span>
        <input
        // name="numberOfGuests"
        key={index}
        type="text"
        value={readingsState[index]}
        onChange={(e) => onInputChange(e, index)}
        />
        </>
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