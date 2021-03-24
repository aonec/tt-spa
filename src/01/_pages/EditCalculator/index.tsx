import React, {useState, useEffect} from 'react'
import '../../tt-components/antd.scss'
import {useParams} from 'react-router-dom'
import {Header} from '../../tt-components'
import EditCalculatorTabs from './components/EditCalculatorTabs'
import {Breadcrumb} from '../../tt-components'
import {getCalculator} from './components/apiEditCalculator'
import {CalculatorResponse} from "../../../myApi";
import {useAsync} from "../../hooks/useAsync";
import {DEFAULT_CALCULATOR} from "../../tt-components/localBases";
import EditCalculatorForm from './components/EditCalculatorForm'
import ModalCalculatorExist from './components/ModalCalculatorExist'

export const EditCalculator = () => {
    const {deviceId} = useParams()
    const [tab, setTab] = useState<string>('1')
    const [alert, setAlert] = useState<boolean>(false)
    const [existCalculator, setExistCalculator] = useState<boolean>(false);

    const {data: calculator, status, run} = useAsync<CalculatorResponse>()

    useEffect(() => {
        run(getCalculator(deviceId))
    }, [deviceId])

    const {model, serialNumber} = calculator || DEFAULT_CALCULATOR

    if (!calculator) {
        return null
    }

    return (
        <>
            {status === 'error' && (
                <div style={{background: 'red'}}>ОШИБКА</div>
            )}
            {status === 'pending' ||
            (status === 'idle' && <div>ЗАГРУЗКА...</div>)}
            {status === 'resolved' && (
                <>
                <Breadcrumb path={`/calculators/${deviceId}`}/>
                <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
                <EditCalculatorTabs tab={tab} setTab={setTab}/>
                <EditCalculatorForm calculator={calculator} tab={tab} setTab={setTab} setAlert={setAlert}/>
                <ModalCalculatorExist existCalculator={existCalculator} setExistCalculator={setExistCalculator} setVisible={setAlert} visible={alert}/>
                </>
            )}

        </>
    )
}

export default EditCalculator
