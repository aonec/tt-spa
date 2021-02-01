import React, { useContext } from 'react';
import { Form, Switch } from 'antd';
import { ListWrap, ListItem, Title } from '../../../tt-components/List';
import { Label } from './Styles';
import { Subtitle } from '../../../_components/Headers';
import { NodeContext } from '../index';
import DisableModal from './Modals/DisableModal';
import EnableModal from './Modals/EnableModal';
import moment from 'moment'
import _ from "lodash";
import { nodeStatusList, serviceZoneList } from "../../../tt-components/localBases";

const Information = () => {
  const {
    node,
    tasks,
    showDisable,
    setShowDisable,
    showEnable,
    setShowEnable,
    visible,
    setVisible,
    switched,
    setSwitched,
    calculator
  } = useContext(NodeContext);
  const {
    serviceZone, nodeStatus, lastCheckingDate, futureCheckingDate
  } = node;

  const {
    address, diameter,
  } = calculator;
  const {
    city, street, housingStockNumber, corpus, id,
  } = address;
  const handleSwitchChange = (checked) => {
    if (checked === true) {
      console.log("true")
      setVisible(prevState => ({ ...prevState, showEnable: true }))
      setSwitched(true)

    }
    if (checked === false) {
      console.log("false")
      setVisible(prevState => ({ ...prevState, showDisable: true }))
      setSwitched(false)
    }

  }

  const getServiceZone = _.find(serviceZoneList, { value: serviceZone }).label;
  const getNodeStatus = _.find(nodeStatusList, { value: nodeStatus }).label;


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
        <span>Зона</span>
        <div>{getServiceZone}</div>
      </ListItem>
      <ListItem>
        <span>Коммерческий учет показателей приборов</span>
        <div>{getNodeStatus}</div>
      </ListItem>
      <ListItem>
        <span>Дата начала действия акта-допуска</span>
        <div>{moment(lastCheckingDate).format('DD.MM.YYYY')}</div>
      </ListItem>
      <ListItem>
        <span>Дата окончания действия акта-допуска</span>
        <div>{moment(futureCheckingDate).format('DD.MM.YYYY')}</div>
      </ListItem>


      {/*<ListItem>*/}
      {/*  <span>Тип узла</span>*/}
      {/*  <div style={{ display: 'flex', alignItems: 'center' }}>*/}
      {/*    <Switch size="small" checked={switched} onChange={handleSwitchChange}/>*/}
      {/*    <span>Коммерческий учет показетелей прибора</span>*/}
      {/*  </div>*/}
      {/*</ListItem>*/}
      {/*<ListItem>*/}
      {/*  <span>Статус узла</span>*/}
      {/*  <Label color="green">Сдан</Label>*/}
      {/*</ListItem>*/}
      <DisableModal/>
      <EnableModal/>
    </ListWrap>
  );
};

export default Information;
