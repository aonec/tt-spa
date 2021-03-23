import {Route, useParams, useLocation} from 'react-router-dom'
import React, {useState, useEffect, Dispatch, SetStateAction} from 'react'
import {getCalculatorTasks, getCalculator, getUser} from './apiCalculatorProfile'
import {Grid} from '../../_components'
import {Header} from './components/Header'
import {Tabs} from './components/Tabs'
import {Information} from './components/Information'
import {Events} from './components/Events'
import {Connection} from './components/Connection'
import {RelatedDevices} from './components/RelatedDevices'
import {Loader} from '../../components/Loader'
import Documents from './components/Documents'
import DeregisterDevice from './components/Modals/ModalDeregister'
import ModalCalculatorReport from './components/Modals/ModalCalculatorReport'
import CheckDevice from './components/Modals/ModalCheck'
import Nodes from './components/Nodes'
import {CalculatorResponse} from "../../../myApi";

interface TypeDeviceContext {
    device: CalculatorResponse
    tasks: Array<object>
    loadings: any
    errors: any
    error: any
    deregister: boolean
    setDeregister: Dispatch<SetStateAction<boolean>>
    report: boolean
    setReport: Dispatch<SetStateAction<boolean>>
    check: boolean
    setCheck: Dispatch<SetStateAction<boolean>>
}

export const DeviceContext = React.createContext<Partial<TypeDeviceContext>>({})

export const CalculatorProfile = () => {
    const {deviceId} = useParams()
    const path = `/calculators/${deviceId}/`

    const [isLoading, setIsLoading] = useState(true)
    const [device, setDevice] = useState<CalculatorResponse>()
    const [tasks, setTasks] = useState()
    const [deregister, setDeregister] = useState(false)
    const [report, setReport] = useState(false)
    const [check, setCheck] = useState(false)
    const [error, setError] = useState()
    const [errors, setErrors] = useState()

    const [loadings, setLoadings] = useState({
        device: false,
        tasks: false,
    })

    useEffect(() => {
        setIsLoading(true)
        Promise.allSettled([
            getCalculator(deviceId),
            getCalculatorTasks(deviceId),
        ])
            .then((responses: any) => {
                // const [{value : device}, {value: tasks}] = responses;
                const device = responses[0].value
                const tasks = responses[1].value
                setDevice(device)
                setTasks(tasks.items)
                setIsLoading(false)
            })
            .catch(({resource, message}) => {

            })
            .finally(() => {
                setLoadings((prev) => ({
                    ...prev,
                    device: false,
                    tasks: false,
                }))
                setIsLoading(false)
            })
    }, [])

    if (isLoading) return <Loader show size={32}/>


    const context = {
        device,
        tasks,
        loadings,
        errors,
        error,
        deregister,
        setDeregister,
        report,
        setReport,
        check,
        setCheck,
    }
    return (
        <DeviceContext.Provider value={context}>
            <Header device={device} setReport={setReport} setDeregister={setDeregister}/>
            <Tabs/>
            <Grid>
                <Route path={`${path}`} exact>
                    <Information device={device}/>
                </Route>
                <Route path={`${path}connection`} exact>
                    <Connection device={device}/>
                </Route>
                <Route path={`${path}related`} exact>
                    <RelatedDevices/>
                </Route>
                <Route path={`${path}nodes`} exact>
                    <Nodes/>
                </Route>
                <Route path={`${path}documents`} exact>
                    <Documents/>
                </Route>

                <Events title="Задачи с объектом"/>
            </Grid>
            <DeregisterDevice/>
            <ModalCalculatorReport/>
            <CheckDevice/>
        </DeviceContext.Provider>
    )
}

export default CalculatorProfile
