import React from 'react'
import styled from 'styled-components'
import {Icon} from '01/_components/Icon'
import {IconTT} from "../../../tt-components";
import {CalculatorResponse} from "../../../../myApi";

interface RelatedDevicesInterface {
    device: CalculatorResponse | undefined
}

export const RelatedDevices = ({device}: RelatedDevicesInterface) => {
    if (!device) {
        return null
    }
    const {hubs} = device
    if (!hubs) {
        return null
    }
    const result = hubs.map((value) => {
        const {
            model,
            serialNumber,
            closingDate,
            hub,
            resource,
            id,
        } = value

        const {pipeNumber, entryNumber, hubNumber} =
        hub ?? {
            number: 'X',
            entryNumber: 'X',
            hubNumber: 'X',
        }

        return (
            <ListItem key={id}>
                <NameWrap href={`/housingMeteringDevices/${id}`}>
                    <IconTT icon={(resource || 'device').toLowerCase()} />
                    <Name>{model}</Name>
                    <Serial>{` (${serialNumber})`}</Serial>
                </NameWrap>

                <State>
                    <Icon icon="status" color="#17B45A"/>
                    {`${closingDate !== null ? 'Активен' : 'Не активен'}`}
                </State>
                <Span>{`Ввод: ${entryNumber}`}</Span>
                <Span>{`Узел: ${hubNumber}`}</Span>
                <Span>{`Труба: ${pipeNumber}`}</Span>
            </ListItem>
        )
    })

    return (
        <ListWrap>
                <Title>Приборы</Title>
                {result}
        </ListWrap>
    )
}

export default RelatedDevices

const Template = styled.div``

const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 7fr 4fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`

const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`

const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`

const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`

const Title = styled.h2``

const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`

const ListItem = styled.div`
  display: grid;
  grid-template-columns: 5.5fr 2fr 1.5fr 1.5fr 1.5fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`
const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`
