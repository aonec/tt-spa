import React, {useEffect, useState} from 'react';
import {updateReadings} from "../../../../../Redux/reducers/readingsReducer";
import DeviceRates
    from "../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ReadingsLine/DeviceRates";
import ActiveLine from "../../../../../components/Select/selects/AddReadings/DeviceReadingForm/ActiveLine/ActiveLine";
import {DateLine} from "../../../../../_components/DateLine/DateLine";
import {Icon} from "../../../../../_components/Icon";
import rateTypeToNumber from "../../../../../_api/utils/rateTypeToNumber";
import styled from 'styled-components'
import DeviceIcons from "../../../../../_components/DeviceIcons";
import styles from "../../../../../_pages/Devices/components/TabsDevices.module.scss";
import {translateMountPlace} from "../../../../../utils/translateMountPlace";
import Arrow from "../../../../../_components/Arrow/Arrow";
import ReadingsBlock from "./ReadingsBlock";
import {useReadings} from "../../../../../hooks/useReadings";
import moment from "moment";
import axios from "01/axios"
import {isNullInArray} from "../../../../../utils/checkArrayForNulls";
import {Modal, Button, Space} from 'antd';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import ButtonTT from "../../../../../tt-components/ButtonTT";
import {useDispatch, useSelector} from "react-redux";
import {selectDisabledState} from "../../../../../Redux/ducks/readings/selectors";
import {setInputFocused, setInputUnfocused} from "../../../../../Redux/ducks/readings/actionCreators";
import {Link} from "react-router-dom";



const ApartmentReadingLine = ({device, sliderIndex}) => {

    const dispatch = useDispatch();

    const disabledState = useSelector(selectDisabledState);

    const {isDisabled} = disabledState.find((el) => el.deviceId === device.id);

    const [isVisible, setIsVisible] = useState(false);

    const [readingsState, setReadingsState] = useState({});

    const [isCancel, setIsCancel] = useState(false)

    const [initialReadings, setInitialReadings] = useState();

    const textInput = React.createRef();

    const handleOk = () => {
        setReadingsState((state) => ({
            ...state,
            currentReadingsArray: initialReadings
        }));
        dispatch(setInputUnfocused())
        setIsVisible(false)
    }

    const handleCancel = () => {
        setIsCancel(true);
        setReadingsState((state) => ({
            ...state,
            currentReadingsArray: initialReadings
        }));
        setIsVisible(false)
    }

    const afterCloseHandler = () => {
        if (isCancel) {
            setIsCancel(false)
            textInput.current.focus()
        }
    }

    useEffect(() => {
        if (!readingsState.currentReadingsArray) return
        const isNull = isNullInArray(readingsState.currentReadingsArray)

        if (!isNull) {
            dispatch(setInputUnfocused())
        }

    }, [readingsState])

    const isActive = device.closingDate === null;

    useReadings(device, setReadingsState, sliderIndex);


    var tabEvent = new Event('keydown', {
        'keyCode' : 9,
        'which' : 9,
        'key' : 'Tab'
    });


    useEffect(() => {

        const onKeyDown = (e) => {
debugger;
            if (!e.isTrusted) return
            if (e.key === 'Enter') {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    code: 9,
                }));
            }
            if (e.code === 'Enter') {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    code: 'Tab',
                    key: 'Tab',
                    charCode: 9,
                    keyCode: 9,
                    view: window,
                    bubbles: true
                }));
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'tab',
                }));
            }
        }
        document.addEventListener('keydown', onKeyDown)

        return () => document.removeEventListener('keydown', onKeyDown)
    },[]);

    if (!readingsState.currentReadingsArray?.length) return 'ЗАГРУЗКА...'

    const onInputChange = (e, index) => {
        e.preventDefault();
        setReadingsState((state) => ({
            ...state,
            currentReadingsArray: state.currentReadingsArray.map((reading, i) => {
                    return i === index ? +e.target.value : reading
                }
            )

        }))

        if (!e.target.value) {
            dispatch(setInputFocused(device.id))
        }
    }

    const formDeviceReadingObject = (deviceItem) => {
        return ({
            deviceId: deviceItem.id,
            value1: +readingsState.currentReadingsArray[0],
            readingDate: moment().toISOString(),
            uploadTime: moment().toISOString(),
            isForced: true
        })
    }

    const sendReadings = (deviceItem) => {
        const deviceReadingObject = formDeviceReadingObject(deviceItem)
        for (let i = 1; i < 4; i++) {
            if (+readingsState.currentReadingsArray[i]) {
                deviceReadingObject[`value${i + 1}`] = +readingsState.currentReadingsArray[i]
            }
        }
        axios.post('/IndividualDeviceReadings/create', deviceReadingObject);
        setInitialReadings(readingsState.currentReadingsArray)
    }

    const currentDeviceReadings = readingsState.currentReadingsArray.map((value, index) => {
        return (
            <ReadingsBlock key={readingsState.currentReadingsArray.id ?? device.id + index}
                           index={index}
                           onChange={(e) => onInputChange(e, index)}
                           value={value}
                           resource={readingsState.resource}
                           sendReadings={() => sendReadings(device)}
                           operatorCabinet
                           textInput={textInput}
                           isDisabled={isDisabled}
            />
        )
    });

    const previousDeviceReadings = readingsState.previousReadingsArray.map((value, index) => (
        <ReadingsBlock key={readingsState.previousReadingsArray.id + 'a'}
                       index={index}
                       onChange={(e) => onInputChange(e, index)}
                       value={value}
                       resource={readingsState.resource}
                       operatorCabinet
                       readingsBlocked
        />
    ));

    const onBlurHandler = (e) => {
        if (e.currentTarget.contains(e.relatedTarget)) return

        const isNull = isNullInArray(readingsState.currentReadingsArray)
        if (isNull) {
            setIsVisible(true);
        } else {
            if (readingsState.currentReadingsArray !== initialReadings) {
                sendReadings(device)
            }
            dispatch(setInputUnfocused())
        }
    }

    const onFocusHandler = (e) => {

        if (e.currentTarget.contains(e.relatedTarget)) return

        setInitialReadings(readingsState.currentReadingsArray);
        const isNull = isNullInArray(readingsState.currentReadingsArray)
        if (isNull) {
            dispatch(setInputFocused(device.id))
        }
    }

    const options = (readingsElems, isCurrent) => [
        {
            value: () => (<DeviceReadingsContainer
                color={isCurrent ? getInputColor(device.resource) : "var(--main-90)"}
                resource={device.resource}
            >
                {readingsElems}
            </DeviceReadingsContainer>),
                isSuccess: readingsState.resource !== 'Electricity' || readingsElems.length === 1
        },
        {
            value: () => (<>
                <DeviceReadingsContainer
                    style={{marginBottom: 8}}
                    color={isCurrent ? "var(--electro)" : "var(--main-90)"}
                    resource={device.resource}
                >
                    {readingsElems[0]}
                </DeviceReadingsContainer>
                <DeviceReadingsContainer
                    color={isCurrent ? "#957400" : "var(--main-90)"}
                    resource={device.resource}
                >
                    {readingsElems[1]}
                </DeviceReadingsContainer>
            </>),
            isSuccess: readingsElems.length === 2
        },
        {
            value: () => (
                <>
                <DeviceReadingsContainer
                    style={{marginBottom: 8}}
                    color={isCurrent ? "var(--electro)" : "var(--main-90)"}
                    resource={device.resource}
                >
                    {[readingsElems[0], readingsElems[1]]}
                </DeviceReadingsContainer>
                <DeviceReadingsContainer
                    color={isCurrent ? "#957400" : "var(--main-90)"}
                    resource={device.resource}
                >
                    {readingsElems[2]}
                </DeviceReadingsContainer>
                    </>
            ),
            isSuccess: true
        }
    ];


    const {icon, color} = DeviceIcons[device.resource];


    return (
        <FullDeviceLine>
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Link
                    className={styles.device__title}
                    to={`/housingMeteringDevices/${device.id}`}
                >
                    <Icon className={styles.icon} icon={icon} fill={color}/>
                    {`${device.model} `}
                    <span className={styles.deviceId}>
                            {` (${device.serialNumber})`}
                    </span>
                </Link>
                <div style={{display: 'flex'}}>
                    <ActiveLine isActive={isActive}/>
                    <DateLine lastCheckingDate={device.lastCheckingDate}
                              futureCheckingDate={device.futureCheckingDate}/>
                    <div style={{
                        marginLeft: 16,
                        color: 'rgba(39, 47, 90, 0.6)'
                    }}>{translateMountPlace(device.mountPlace)}</div>
                </div>
            </div>

            {/*Инпуты с показаниями*/}
            <div>
                {options(previousDeviceReadings, false).find((el) => el.isSuccess).value()}
            </div>

            <div onBlur={onBlurHandler}
                 onFocus={onFocusHandler}
                 style={{display: 'flex', flexDirection: 'column'}}>
            {options(currentDeviceReadings, true).find((el) => el.isSuccess).value()}
            </div>

            <StyledModal
                visible={isVisible}
                title={<Header>Вы действительно хотите уйти без сохранения?</Header>}
                onOk={handleOk}
                onCancel={handleCancel}
                afterClose={afterCloseHandler}
                width={800}
                footer={
                    <Footer>
                        <ButtonTT color={'white'} key="back" onClick={handleCancel}>
                            Отмена
                        </ButtonTT>
                        <ButtonTT color={'red'} key="submit" onClick={handleOk}>
                            Выйти без сохранения
                        </ButtonTT>
                    </Footer>
                }
            >
                <p style={{color: 'var(--main-100)', margin: 0}}>
                    Вы внесли не все показания, если вы покинете страницу, то все изменения, которые были сделаны вами
                    на этой странице не сохранятся
                </p>
            </StyledModal>

        </FullDeviceLine>
    )
}

const FullDeviceLine = styled.div`
  display: grid;
  grid-template-columns: minmax(330px, 1fr) 200px 200px 1fr;
  column-gap: 16px;
  margin-top: 8px;
  align-items: center;
  justify-content: flex-start;
  white-space: nowrap;
  padding: 8px 8px 16px;
  border-bottom: 1px solid #DCDEE4;

`;

export const getInputColor = (resource) => {
    switch (resource) {
        case "HotWaterSupply":
            return "#FF8C68"
        case "ColdWaterSupply":
            return "#79AFFF"
        case "Heat":
            return "Отопление"
        case "Electricity":
            return "#E2B104"
    }
}

export const DeviceReadingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid ${(props) => props.color ? props.color : 'var(--main-90)'};
  border-left-width: 4px;
  max-width: 200px;
  padding: 8px 16px;
  pointer-events: ${(props) => props.isDisabled === true ? 'none' : 'auto'};
  
  &:focus-within {
  box-shadow: var(--shadow);
}

.ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
      box-shadow: none;
}
`;

const Footer = styled.div`
  background-color: var(--bg);
  height: 96px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
  font-weight: 700;
`

const Header = styled.h1`
  font-size: 32px;
  line-height: 1.5;
  font-weight: 300;
  margin: 0;
`

const StyledModal = styled(Modal)`

  .ant-modal-header {
    padding: 24px 32px;
    border: 0;
  }

  .ant-modal-body {
    padding: 0 32px 32px 32px;
  }

  .ant-modal-footer {
    padding: 0;
  }

  .ant-modal-close-x {
    fill: var(--main-100)
  }

  .ant-modal-footer button + button {
    margin-bottom: 0;
    margin-left: 16px;
  }

`

export default ApartmentReadingLine;
