import React, {useState, useEffect, useRef} from 'react'
import '../../tt-components/antd.scss'
import {useParams} from 'react-router-dom'
import {Header} from '../../tt-components'
import EditCalculatorTabs from './components/EditCalculatorTabs'
import {Breadcrumb} from '../../tt-components'
import {getCalculator} from './components/apiEditCalculator'
import {CalculatorResponse, CalculatorResponseSuccessApiResponse} from "../../../myApi";
import {useAsync} from "../../hooks/useAsync";
import {RequestNodeReadingsFunctionInterface} from "../../_api/node_readings_page";
import {DEFAULT_CALCULATOR} from "../../tt-components/localBases";
// import EditCalculatorForm from './components/EditCalculatorForm'
// import ModalCalculatorExist from './components/ModalCalculatorExist'

export const EditCalculator = () => {
    const {deviceId} = useParams()
    const [tab, setTab] = useState<string>('1')
    const [alertVisible, setAlertVisible] = useState<boolean>(false)

    const {data: calculator, status, run} = useAsync<CalculatorResponse>()

    useEffect(() => {
        run(getCalculator(deviceId))
    }, [deviceId])

    const {model, serialNumber} = calculator || DEFAULT_CALCULATOR

    return (
        <>
            {status === 'error' && (
                <div style={{background: 'red'}}>ОШИБКА</div>
            )}
            {status === 'pending' ||
            (status === 'idle' && <div>ЗАГРУЗКА...</div>)}
            {status === 'resolved' && (
                <Breadcrumb path={`/calculators/${deviceId}`}/>
            )}

            <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
            <EditCalculatorTabs tab={tab} setTab={setTab}/>
            {/*<EditCalculatorForm />*/}
            {/*<ModalCalculatorExist />*/}
        </>
    )
}

export default EditCalculator
