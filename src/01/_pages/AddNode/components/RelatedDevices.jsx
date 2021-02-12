import React, {useContext} from 'react';
import styled from 'styled-components';
import {Icon} from '01/_components/Icon';
import DeviceIcons from '01/_components/DeviceIcons';
import {IconTT} from "../../../tt-components";
import {AddNodeContext} from "../index";
import _ from 'lodash'


const Div = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const RelatedDevices = () => {


    const {
        handleCancel,
        currentTabKey,
        setTab,
        handleChangeTab,
        handleNext,
        node,
        setNode,
        housingStockId,
        calculators,
        addCalculator,
        setAddCalculator,
        addOdpu,
        setAddOdpu,
        communicationPipes,
        setCommunicationPipes,
        housingStock
    } = useContext(AddNodeContext);

    const devices = communicationPipes.map((communicationPipe) => {
        const {devices} = communicationPipe
        return devices.map((device) => {
            return device
        })
    })
    const res = _.flatten(devices)

    const result = res.map((device) => {
            const {
                model,
                serialNumber,
                closingdate,
                hub,
                resource,
                id,
                pipe,
                housingStockId,
            } = device;

            const {pipeNumber, entryNumber, hubNumber} = pipe

            return (
                <ListItem key={id}>
                    <NameWrap href={`/housingMeteringDevices/${id}`}>
                        <IconTT icon={resource.toLowerCase()}/>
                        <Name>{model}</Name>
                        <Serial>{` (${serialNumber})`}</Serial>
                    </NameWrap>

                    <State>
                        <Icon icon="status" color="#17B45A"/>
                        {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
                    </State>
                    <Span>{`Ввод: ${entryNumber}`}</Span>
                    {/*<Span>{`Узел: ${hubNumber}`}</Span>*/}
                    <Span>{`Труба: ${pipeNumber}`}</Span>
                    <Div> <IconTT icon={'edit'} style={{marginLeft: 8}}/>
                        <IconTT icon={'del'} style={{marginLeft: 8}}/></Div>
                </ListItem>
            );
        }
    );

    return (
        <ListWrap>
            {result}
        </ListWrap>
    );
};

export default RelatedDevices;

export const Template = styled.div``;

export const NameWrap = styled.a`
  display: grid;
  grid-template-columns: 1fr 7fr 4fr;
  align-items: center;

  &:hover {
    h3,
    p {
      color: var(--primary-100);
    }
  }
`;

export const Name = styled.h3`
  padding: 0;
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
`;

export const Serial = styled.p`
  padding: 0;
  margin: 0;
  color: rgba(39, 47, 90, 0.6);
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  color: rgba(39, 47, 90, 0.8);
`;

export const Title = styled.h2``;

export const ListWrap = styled.div`
  display: grid;
  height: min-content;
}
`;

export const ListItem = styled.div`
  display: grid;
  grid-template-columns: 5.5fr 2fr 1.5fr 1.5fr 1.5fr;
  grid-template-rows: 48px;
  align-items: center;
  border-bottom: 1px solid var(--frame);
  opacity: 0.8;
`;
export const Span = styled.span`
  color: rgba(39, 47, 90, 0.6);
`;
