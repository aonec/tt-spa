import {Route, useParams, useLocation} from 'react-router-dom';
import React, {useState, useEffect} from 'react';
import {getCalculatorTasks, getCalculator} from './apiCalculatorProfile';
import {Grid} from '../../_components';

import {Header} from './components/Header';
import {Tabs} from './components/Tabs';
import {Information} from './components/Information';
import {Events} from './components/Events';
import {Connection} from './components/Connection';
import {RelatedDevices} from './components/RelatedDevices';

import {Loader} from '../../components/Loader';
import Documents from './components/Documents';
import DeregisterDevice from './components/Modals/ModalDeregister';
import ModalCalculatorReport from './components/Modals/ModalCalculatorReport';
import CheckDevice from './components/Modals/ModalCheck';
import Nodes from "./components/Nodes";


interface DeviceInterface {
    address: object,
    connection: object,
    futureCheckingDate: string,
    futureCommercialAccountingDate: string,
    hubs: [],
    id: number,
    infoId: null,
    isConnected: boolean,
    lastCheckingDate: string,
    lastCommercialAccountingDate: string,
    model: string,
    nodes: [],
    serialNumber: string,
}

interface TypeDeviceContext {
    device: DeviceInterface,
    building: object,
    tasks: Array<object>,
    related: Array<object>,
    nodes: Array<object>,
    loadings: any,
    errors: any,
    error: any,
    hubs: any,
    deregister: boolean,
    // setDeregister: () => void,
    report: boolean,
    // setReport: () => void,
    check: boolean,
    // setCheck: () => void,
};

export const DeviceContext = React.createContext<Partial<TypeDeviceContext>>({});

export const CalculatorProfile = () => {
    const {deviceId} = useParams();
    const path = `/calculators/${deviceId}/`;

    const [isLoading, setIsLoading] = useState(true);
    const [device, setDevice] = useState<DeviceInterface | undefined>();
    const [building, setBuilding] = useState();
    const [tasks, setTasks] = useState();
    const [related, setRelated] = useState();
    const [hubs, setHubs] = useState();
    const [deregister, setDeregister] = useState(false);
    const [report, setReport] = useState(false);
    const [reportSono, setReportSono] = useState(false);
    const [check, setCheck] = useState(false);
    const [nodes, setNodes] = useState();

    const [error, setError] = useState();
    const [errors, setErrors] = useState();

    // const [loadings, setLoadings] = useState({
    //     device: true,
    //     building: true,
    //     tasks: true,
    //     related: true,
    //     nodes: true
    // });

    const [loadings, setLoadings] = useState({
        device: false,
        building: false,
        tasks: false,
        related: false,
        nodes: false
    });


    const errorsTemplate = {
        device: 'Произошла ошибка запроса устройства',
        building: 'Произошла ошибка при загрузке данных по зданию',
        tasks: 'Произошла ошибка при загрузке данных по задачам',
        related: 'Произошла ошибка при загрузке данных по подключенным устройствам',
        nodes: 'Произошла ошибка при загрузке данных по узлам'
    };

    useEffect(() => {
        setIsLoading(true);
        Promise.allSettled([
            getCalculator(deviceId),
            getCalculatorTasks(deviceId),
        ])
            .then((responses: any) => {
                // const [{value : device}, {value: tasks}] = responses;
                const device = responses[0].value;
                const tasks = responses[1].value;
                setDevice(device);
                setBuilding(device.address);
                setHubs(device.hubs);
                setTasks(tasks.items);
                setRelated(device.hubs);
                setNodes(device.nodes);
                setIsLoading(false);
            })
            .catch(({resource, message}) => {
                // const text = errorsTemplate[resource];
                // setError({resource, text});
            })
            .finally(() => {
                setLoadings((prev) => ({
                    ...prev,
                    device: false,
                    building: false,
                    tasks: false,
                    related: false,
                    nodes: false
                }));
                setIsLoading(false);
            });

    }, []);


    if (isLoading) return <Loader show size={32}/>;

    console.log("nodes", nodes)

    console.log("device", device)
    // address: {id: 705, city: "Нижнекамск", street: "Менделеева", housingStockNumber: "1", corpus: null},
    // connection: {ipV4: "192.168.101.41", port: 4001, deviceAddress: 1},
    // nodes: [(2) [{…}, {…}]],


    const context = {
        device,
        building,
        tasks,
        related,
        nodes,
        loadings,
        errors,
        error,
        hubs,
        deregister,
        setDeregister,
        report,
        setReport,
        check,
        setCheck,
    };
    return (
        <DeviceContext.Provider
            value={{device,
                building,
                tasks,
                related,
                nodes,
                loadings,
                errors,
                error,
                hubs,
                deregister,
                // setDeregister,
                report,
                // setReport,
                check,
                // setCheck
            }}
        >
            <Header/>
            <Tabs/>
            <Grid>
                <Route path={`${path}`} exact>
                    {/*<Information/>*/}
                </Route>
                <Route path={`${path}connection`} exact>
                    <Connection/>
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
    );
};

export default CalculatorProfile;
