import React, {useEffect, useState} from 'react';
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import styled from 'styled-components'
import ReadingLine from "./ReadingsLine/ReadingLine";
import DeviceIcons from "../../../../../_components/DeviceIcons";
import styles from "../../../../../_pages/Devices/components/TabsDevices.module.scss";
import {Icon} from "../../../../../tt-components/Icon";

const FullDeviceLine = styled.div`
    display: grid;
    grid-template-columns: minmax(300px, 3.5fr) 5fr 3.5fr;
    column-gap: 10px;
    margin-bottom: 24px;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    `

let ReadingLineStyled = styled.div`
display: flex;
border: 1px solid #DCDEE4;
`

const Label = styled.label`
display: flex;
min-width: 60px;
`

const DeviceReadingForm = ({device}) => {

    const [readingsState, setReadingsState] = useState([]);

    const numberOfReadings = rateTypeToNumber(device.rateType);
    // const readingsArray = [];
    // setReadingsState([45, 66, 1243]);

    useEffect(() => {
        const readingsArray = [];

        for (let i=1; i <= numberOfReadings; i++) {
            readingsArray.push(device.readings[0][`value${i}`])
            // readingsArray.push(12)
            // readingsArray.push(23)
            // readingsArray.push(43)
        }
        setReadingsState(readingsArray)

    }, [])

    const onInputChange = (e, index) => {
        e.preventDefault();
        // readingsArray[index] = e.target.value;
        let newState = [...readingsState];
        newState[index] = e.target.value;
        setReadingsState(newState);
        debugger;
    }


    // {/*<span style={{width: `${100/readingsState.length}%`}}>Тариф {index+1}: {value}</span>*/}




    const deviceReadingsLine = readingsState.map((value, index) => (
        <ReadingLine key={'value' + index} index={index} onChange={(e) => onInputChange(e, index)} readingsState={readingsState}/>
    ));

    // const deviceReadingsLine = readingsState.map((value, index) => (
    //     <div key={index}>
    //         {/*<span style={{width: `${100/readingsState.length}%`}}>Тариф {index+1}: {value}</span>*/}
    //         <Label htmlFor={'id' + index} style={{paddingLeft: 10, marginRight:10}}><span style={{color: '#DCDEE4'}}>Тариф {index+1}: </span></Label>
    //         <input
    //             // name="numberOfGuests"
    //             type="text"
    //             id={'id' + index}
    //             value={readingsState[index]}
    //             onChange={(e) => onInputChange(e, index)}
    //         />
    //     </div>
    // ));



    const { icon, color } = DeviceIcons[device.resource];


    return (
        <FullDeviceLine>
                <span
                    className={styles.device__title + ' ' + styles.subdevice__title}
                    to={`/housingMeteringDevices/${device.id}`}
                >
                    <Icon className={styles.icon} icon={icon} fill={color} />
                    {`${device.model} `}
                    <span className={styles.deviceId}>
                            {` (${device.serialNumber})`}
                    </span>
                </span>
                <div style={{display: 'flex'}}>{deviceReadingsLine}</div>
        </FullDeviceLine>
    )
            }

            export default DeviceReadingForm;