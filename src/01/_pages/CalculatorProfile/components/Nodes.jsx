import React, {useContext} from 'react'
import styled from 'styled-components'
import {Loader} from '01/components'
import _ from 'lodash'
import {DeviceContext} from '../CalculatorProfile'
import {IconTT} from '../../../tt-components'
import {TitleWrap} from '../../EditNode/components/Header'
import {resources} from "../../../tt-components/localBases";

export const Nodes = () => {
    const {device, loadings} = useContext(DeviceContext)
    const loading = _.get(loadings, 'nodes', true)
    const {nodes} = device;
console.log("device",device)
    const result = nodes.map((value) => {
        const {
            id,
            number,
            nodeStatus,
            serviceZone,
            lastCheckingDate,
            futureCheckingDate,
            resource,
        } = value

        const NodeStatus = ({nodeStatus}) => {
            let icon
            if (nodeStatus === 'Сдан на коммерческий учет') {
                icon = (
                    <IconTT
                        icon="ok"
                        size={16}
                        style={{marginRight: '8px'}}
                    />
                )
            }
            return (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '8px',
                    }}
                >
                    {icon}
                    <Span>{nodeStatus}</Span>
                </div>
            )
        }

        return (
            <ListItem key={id}>
                <NameWrap href={`/nodes/${id}`}>
                    <IconTT
                        icon={'node'}
                        size={24}
                        style={{marginRight: '8px'}}
                    />
                    <Name>{`Узел ${number}`}</Name>
                </NameWrap>

                <NodeStatus nodeStatus={nodeStatus}/>
                <Span>{serviceZone}</Span>
                <Span>{_.find(resources, {value: resource}).label}</Span>
            </ListItem>
        )
    })

    return (
        <ListWrap>
            {/* <button onClick={buttonHandler}>related</button> */}
            <Loader show={loading} size="32">
                <Title>Узлы</Title>
                {result}
            </Loader>
        </ListWrap>
    )
}

export default Nodes

export const Template = styled.div``

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 11fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`

export const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`

export const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`

export const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`

export const Title = styled.h2``

export const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 3fr 5fr 2fr 2fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`
export const Span = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  color: rgba(39, 47, 90, 0.7);
`
