import React, { useContext } from 'react';
import { Form, Switch } from 'antd';
import { ListWrap, ListItem, Title } from '../../../tt-components/List';
import { Label } from './Styles';
import { Subtitle } from '../../../_components/Headers';
import { NodeContext } from '../index';
import DisableModal from './Modals/DisableModal';
import EnableModal from './Modals/EnableModal';

const Information = () => {
  const {
    node, tasks, showDisable, setShowDisable, showEnable, setShowEnable, visible, setVisible,
  } = useContext(NodeContext);
  const {
    address, diameter,
  } = node;
  const {
    city, street, housingStockNumber, corpus, id,
  } = address;
  const handleSwitchChange = (checked) =>{
    if (checked === true) {
      console.log("true")
      setVisible(prevState => ({...prevState, showEnable: true}))

    }
    if (checked === false) {
      console.log("false")
      setVisible(prevState => ({...prevState, showDisable: true}))
    }

  }
  return (
    <ListWrap>
      <Title>Информация</Title>
      <ListItem>
        <span>Адрес</span>
        <Subtitle to={`/objects/${id}`}>
          {`${city}, ${street}, ${housingStockNumber} ${corpus ? `, к.${corpus}` : ''}`}
        </Subtitle>
      </ListItem>
      <ListItem>
        <span>Тип узла</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Switch size="small" defaultChecked onChange={handleSwitchChange}/>
          <span>Коммерческий учет показетелей прибора</span>
        </div>
      </ListItem>
      <ListItem>
        <span>Статус узла</span>
        <Label color="green">Сдан</Label>
      </ListItem>
      <DisableModal />
      <EnableModal />
    </ListWrap>
  );
};

export default Information;
