import React from "react";
import {Icon} from "../../../_components/Icon";
import styled from "styled-components";
import './edit-button.css'
export const Template = styled.div``;

export const EditButtonTemplate = styled.button`
border: 1px solid #DCDEE4;
box-sizing: border-box;
border-radius: 4px;
width: 48px;
height: 48px;
display: flex;
justify-content: center;
align-items: center;

`;

export const EditButton = () => {
  return (
    <button className='edit-button'>
      <Icon icon={'menu'} />
    </button>
  )
}
export  default EditButton;


export const List = styled.ul`
border:1px solid #DCDEE4;
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
padding:8px 24px;
cursor: pointer;
border-bottom: 1px solid #DCDEE4;
&:hover {
background: #189EE9;
color: #FFFFFF !important;
}
`;


export const Menu = (showPopupHandler) => {
  console.log("showPopupHandler", showPopupHandler)
  return (
    <List>
      <ListItem>Редактировать вычислитель</ListItem>
      <ListItem>Поверить вычислитель</ListItem>
      <ListItem>Выгрузить отчет о общедомовом потреблении</ListItem>
      <ListItem style={{color: "#FC525B"}}>Снять вычислитель с учета</ListItem>
    </List>
  )
}