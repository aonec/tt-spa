import React, { useEffect, useState } from 'react'
import GraphView, { ReportType, ResourceType } from './components/GraphView'
import GraphFilterForm from './components/GraphFilterForm'
import moment from 'moment'
import {
    QueryInterface,
    requestNodeReadings, RequestNodeReadingsFunctionInterface,
} from '../../_api/node_readings_page'
import { useAsync } from '../../hooks/useAsync'
import { Alert } from 'antd'
import { getGraphParams } from './utils'
import styled from 'styled-components'

interface GraphProps {
    nodeId: number
    resource: ResourceType
    pipeCount: 1 | 2
}

export type GraphParamsType =
    | 'inputMass'
    | 'inputPressure'
    | 'inputTemperature'
    | 'inputVolume'
    | 'outputMass'
    | 'outputPressure'
    | 'outputTemperature'
    | 'outputVolume'
    | 'deltaMass'
    | 'deltaPressure'
    | 'deltaTemperature'
    | 'deltaVolume'
    | 'energy'

const Graph: React.FC<GraphProps> = ({ nodeId, resource, pipeCount }) => {
    const { data, status, run } = useAsync<RequestNodeReadingsFunctionInterface>()

    console.log(moment().utcOffset())

    const reportType = 'daily' as ReportType

    const from = moment()
        .subtract(1, 'week')
        .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })

    const to = moment().set({ hour: 23, minute: 0, second: 0, millisecond: 0 })

    const getInitialState = () => {
        return {
            nodeId,
            reportType,
            from,
            to,
        }
    }

    const [graphParam, setGraphParam] = useState(
        () => getGraphParams(resource, pipeCount)[0]
    )
    const [searchQuery, setSearchQuery] = useState<QueryInterface>(
        getInitialState
    )

    useEffect(() => {
        run(requestNodeReadings(searchQuery))
    }, [searchQuery, run])

    return (
        <GraphContainer>
            <GraphFilterForm
                paramsList={getGraphParams(resource, pipeCount)}
                setGraphParam={setGraphParam}
                setSearchQuery={setSearchQuery}
            />

            {(status === 'pending' ||
                status === 'idle') && <div>ЗАГРУЗКА...</div>}

            {status === 'error' && (
                <>
                    <Alert
                        message="Ошибка"
                        description="На сервере произошла непредвиденная ошибка. В скором времени она будет устранена."
                        type="error"
                        showIcon
                        closable
                        style={{ marginBottom: 24, marginTop: 24 }}
                    />
                    <div>
                        <img
                            src={require('./components/FallbackGraph.svg')}
                            alt="546"
                        />
                    </div>
                </>
            )}

            {status === 'resolved' && data && (
                <GraphParent>
                    <GraphView graphParam={graphParam} dataObject={data} />
                </GraphParent>
            )}
        </GraphContainer>
    )
}

const GraphParent = styled.div`
    position: absolute;
    top: 80px;
`

const GraphContainer = styled.div`
    max-width: 670px;
    position: relative;
`

export default Graph
