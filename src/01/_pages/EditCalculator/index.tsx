import React, {useState, useEffect} from 'react'
import '../../tt-components/antd.scss'
import {useParams} from 'react-router-dom'
import {Header} from '../../tt-components'
import EditCalculatorTabs from './components/EditCalculatorTabs'
import {Breadcrumb} from '../../tt-components'
import {getCalculator} from './components/apiEditCalculator'
import {CalculatorResponse} from "../../../myApi";
import {useAsync} from "../../hooks/useAsync";
import EditCalculatorForm from './components/EditCalculatorForm'
import ModalCalculatorExist from './components/ModalCalculatorExist'
import {Loader} from "../../components";

export const EditCalculator = () => {
    const {deviceId} = useParams()
    const [tab, setTab] = useState<string>('1')
    const [alert, setAlert] = useState<boolean>(false)
    const [existCalculator, setExistCalculator] = useState<number | null | undefined>();

    const {data: calculator, status, run} = useAsync<CalculatorResponse>()

    useEffect(() => {
        run(getCalculator(deviceId))
    }, [deviceId])

    if (!calculator) {
        return null
    }

    const {model, serialNumber} = calculator

    return (
        <>
            {status === 'error' && (
                <div style={{background: 'red'}}>Что пошло не так. Попробуйте Перезагрузить страницу</div>
            )}
            {status === 'pending' ||
            (status === 'idle' && <Loader show={true} size={64}/>)}
            {status === 'resolved' && (
                <>
                    <Breadcrumb path={`/calculators/${deviceId}`}/>
                    <Header>{`${model} (${serialNumber}). Редактирование`}</Header>
                    <EditCalculatorTabs tab={tab} setTab={setTab}/>
                    <EditCalculatorForm calculator={calculator} tab={tab} setTab={setTab} setAlert={setAlert}
                                        setExistCalculator={setExistCalculator}/>
                    <ModalCalculatorExist existCalculator={existCalculator} setExistCalculator={setExistCalculator}
                                          setVisible={setAlert} visible={alert}/>
                </>
            )}

        </>
    )
}

export default EditCalculator
