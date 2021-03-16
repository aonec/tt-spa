import React, { useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';
import { Menu, EditButton } from './EditButton';
import { DeviceContext } from '../CalculatorProfile';
import { DEFAULT_BUILDING, DEFAULT_DEVICE, DEFAULT_ICON } from './Templates';
import {MenuButtonTT} from "../../../tt-components";
import {useHistory} from "react-router-dom";


export const Template = styled.div``;

export const List = styled.ul`
    border: 1px solid #dcdee4;
    position: absolute;
    right: 0;
    width: max-content;
    z-index: 50;
    background: white;
    display: none;
`;

export const ListItem = styled.li`
    font-size: 16px;
    line-height: 32px;
    padding: 8px 24px;
    cursor: pointer;
    border-bottom: 1px solid #dcdee4;
    &:hover {
        background: #189ee9;
        color: #ffffff !important;
    }
`;



export const Header = () => {
  const {
    device,
    building,
    loadings,
    errors,
    error,
    typeODPU,
    calcModel,
  } = useContext(DeviceContext);
  const loadingDevice = _.get(loadings, 'device', true);
  const loadingBuilding = _.get(loadings, 'building', true);
  const { push } = useHistory()

  const menuButtonArr = [
    {
      title: 'Редактировать вычислитель',
      itemFunction: () => {
        // push(`${url}/edit`);
        push(`${url}/edit`);
      },
    },
    {
      title: 'Выгрузить отчет о общедомовом потреблении',
      itemFunction: () => {
        // setAddOdpu(true);
      },
    },
    {
      title: 'Добавить Узел',
      itemFunction: () => {
        // alert('Поставить/Снять узел на коммерческий учёт');
      },
    },
    {
      title: 'Закрыть вычислитель',
      itemFunction: () => {
        // alert('Поставить/Снять узел на коммерческий учёт');
      },
    },
  ];

  const loading = loadingDevice || loadingBuilding;

  const {
    city, street, housingStockNumber, corpus, id,
  } = building || DEFAULT_BUILDING;
  const { model, serialNumber, resource } = device || DEFAULT_DEVICE;
  const { icon, color } = DeviceIcons[resource] || DEFAULT_ICON;

  const errorOfComponent = _.get(error, 'resource', null);

  if (errorOfComponent) {
    return (
      <HeaderWrap>
        <Title>{error.text}</Title>
        <Subtitle>Обратитесь в тех.поддержку</Subtitle>
      </HeaderWrap>
    );
  }

  return (
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Loader show={loading} size="32">
        <div>
          <Title>
            <Icon
              icon={icon}
              color={color}
              size="24"
              style={{ marginRight: '8px' }}
            />
            {`${model || 'Вычислитель'} (${serialNumber})`}
          </Title>
          {/* <ButtonTT onClick={buttonHandler}>TEST</ButtonTT> */}
          <Subtitle to={`/objects/${id}`}>
            {`${city}, ${street}, ${housingStockNumber}${
              corpus ? `, к.${corpus}` : ''
            }`}
          </Subtitle>
        </div>
        <div style={{ position: 'relative' }}>
          <MenuButtonTT menuButtonArr={menuButtonArr} />
        </div>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;
