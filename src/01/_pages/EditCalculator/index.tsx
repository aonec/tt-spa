import React, { useState, useEffect, useRef } from 'react'
import '../../tt-components/antd.scss'
import { useParams } from 'react-router-dom'
// import { Header } from '../../tt-components'
// import EditCalculatorTabs from './components/EditCalculatorTabs'
// import Index from '../../tt-components/Breadcrumb'
import { getCalculator } from './components/apiEditCalculator'
import {CalculatorResponse} from "../../../myApi";
// import EditCalculatorForm from './components/EditCalculatorForm'
// import ModalCalculatorExist from './components/ModalCalculatorExist'

export const EditCalculator = () => {
    const { deviceId } = useParams()
    const [currentTabKey, setTab] = useState('1')
    const [device, setDevice] = useState<CalculatorResponse>()
    const [alertVisible, setAlertVisible] = useState(false)

    function handleChangeTab(value: string) {
        setTab(value)
    }


    useEffect(() => {
        getCalculator(deviceId).then((result) => setCalculator(result))
    }, [])

    if (!calculator) {
        return <div>ЗАГРУЗКА</div>
    }

    return (
           <>
                {/*<Index path={`/calculators/${deviceId}`} />*/}
                {/*<Header>{`${currentCalc.model} (${currentCalc.serialNumber}). Редактирование`}</Header>*/}
                {/*<EditCalculatorTabs />*/}
                {/*<EditCalculatorForm />*/}
                {/*<ModalCalculatorExist />*/}
           </>
    )
}

export default EditCalculator
