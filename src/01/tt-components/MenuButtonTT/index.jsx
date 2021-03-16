import React, { useContext } from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'

const StyledMenuButton = styled(Button).attrs((props) => ({
    form: props.form,
    modal: props.modal,
}))`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    ${(props) =>
        props.size == '48' &&
        css`
            width: 48px;
            height: 48px;
        `}

    ${(props) =>
        props.size == '24' &&
        css`
            width: 24px;
            height: 24px;
        `}
`

export const MenuButtonTT = (props) => {
    console.log('props', props)
    const { menuButtonArr: arr, size } = props

    const menu = (
        <Menu>
            {arr.map((item, index) => {
                const { title, itemFunction } = item
                return (
                    <Menu.Item key={index} onClick={itemFunction}>
                        {title}
                    </Menu.Item>
                )
            })}
        </Menu>
    )

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <StyledMenuButton size={props.size}>
                <MoreOutlined />
            </StyledMenuButton>
        </Dropdown>
    )
}

export default MenuButtonTT

// const arr = [{
//   title: 'Редактировать узел',
//   itemFunction: () => {
//     alert('Редактировать узел');
//   },
// },
// {
//   title: 'Добавить новый прибор',
//   itemFunction: () => {
//     alert('Добавить новый прибор');
//   },
// },
// {
//   title: 'Поставить/Снять узел на коммерческий учёт',
//   itemFunction: () => {
//     alert('Поставить/Снять узел на коммерческий учёт');
//   },
// },
// ];

// const menu = (
//   <Menu>
//     <Menu.Item key="1">
//       Редактировать узел
//     </Menu.Item>
//     <Menu.Item key="2">
//       Добавить новый прибор
//     </Menu.Item>
//     <Menu.Item key="3">
//       Поставить/Снять узел на коммерческий учёт
//     </Menu.Item>
//   </Menu>
// );
