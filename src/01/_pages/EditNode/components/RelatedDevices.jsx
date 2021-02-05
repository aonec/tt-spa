import React, { useContext } from 'react';
import _ from 'lodash';
import { EditNodeContext } from '../index';
import { IconTT } from '../../../tt-components/IconTT';
import {
  ListItem, ListWrap, Name, NameWrap, Serial, Span, State,
} from './EditNodeForm';
import { ButtonTT } from "../../../tt-components";
import { Link } from "react-router-dom";

export const RelatedDevices = () => {
  const { node } = useContext(EditNodeContext);
  const { communicationPipes } = node;

  const related = _.flatten(communicationPipes.map((item, index) => {
    const res = item.devices.map((resItem) => {
      return resItem;
    });
    return res;
  }));

  const result = related.map((value) => {
    const {
      model,
      serialNumber,
      closingdate,
      hub,
      resource,
      id,
    } = value;

    const { pipeNumber, entryNumber, hubNumber } = hub === null ? {
      number: 'X',
      hubNumber: 'X',
    } : hub;

    const handleEdit = () => {
      console.log("handleEdit")
    }


    return (
      <ListItem key={id}>
        <NameWrap href={`/housingMeteringDevices/${id}`}>
          <IconTT icon={resource.toLowerCase()} style={{ marginRight: '8px' }}/>
          <Name style={{ marginRight: '8px' }}>{model}</Name>
          <Serial>{` (${serialNumber})`}</Serial>
        </NameWrap>

        <State>
          {closingdate !== null ? <IconTT icon="green"/> : <IconTT icon="red"/>}
          {`${closingdate !== null ? 'Активен' : 'Не активен'}`}
        </State>
        <Span>{`Ввод: ${entryNumber ?? 'Х'}`}</Span>
        <Span>{`Труба: ${pipeNumber ?? 'Х'}`}</Span>
        <Link to={`/housingMeteringDevices/${id}/edit_odpu`} title="Редактирование ОДПУ" style={{display: 'inline-flex', width: 'min-content'}}><IconTT icon='edit'/></Link>
      </ListItem>
    )
  });
  const handleAddOdpu = () => {
    console.log("handleAddOdpu")
  }

  return (
    <ListWrap>
      {result}
      <ButtonTT color='white' small onClick={handleAddOdpu} style={{ marginTop: '24px' }} type='button'>Подключить
        прибор<IconTT icon={'plus'}/></ButtonTT>
    </ListWrap>
  );
};

export default RelatedDevices;
