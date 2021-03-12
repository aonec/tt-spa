import React, { useContext } from 'react'
import { Menu, Dropdown, Button } from 'antd'
import { MoreOutlined } from '@ant-design/icons'
import styled, { css } from 'styled-components'

const StyledEditButton = styled(Button).attrs((props) => ({
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
  
  li {
        font-size: 16px !important;
        line-height: 32px !important;
    }
`

export const EditButtonTT = (props) => {
    console.log('props', props)
    const { arr, size } = props
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

    const StyledMenu = styled(Menu)`
        .ant-dropdown-menu-item {
            font-size: 32px !important;
        }
    `
    const menu = (
        <StyledMenu>
            {arr.map((item, index) => {
                const { title, itemFunction } = item
                return (
                    <Menu.Item key={index} onClick={itemFunction}>
                        {title}
                    </Menu.Item>
                )
            })}
        </StyledMenu>
    )

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

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <StyledEditButton size={props.size}>
                <MoreOutlined />
            </StyledEditButton>
        </Dropdown>
    )
}

export default EditButtonTT

// import styled, { css } from 'styled-components';
// import {Button} from "antd";
//
// export const Template = styled.div``;
//
// export const EditButtonTemplate = styled.button`
//   border: 1px solid #dcdee4;
//   box-sizing: border-box;
//   border-radius: 4px;
//   width: 48px;
//   height: 48px;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;
//
// export const List = styled.ul`
//   border: 1px solid #dcdee4;
//   position: absolute;
//   right: 0;
//   width: max-content;
//   z-index: 1;
//   background: white;
//   display: none;
// `;
//
// export const ListItem = styled.li`
//   font-size: 16px;
//   line-height: 32px;
//   padding: 8px 24px;
//   cursor: pointer;
//   border-bottom: 1px solid #dcdee4;
//   &:hover {
//     background: #189ee9;
//     color: #ffffff !important;
//   }
// `;
//
// export const EditButtonTT = styled(Button)`
// border: 1px solid #DCDEE4;
// box-sizing: border-box;
// border-radius: 4px;
// width: 48px;
// height: 48px;
// display: flex;
// justify-content: center;
// align-items: center;
//   ${({ size }) => (size === '32'
//   && css`
//         width: 32px;
//         height: 32px;
//       `)
//   || (size === '48'
//     && css`
//         width: 48px;
//         height: 48px;
//       `)};
//
//   ${({ someprop }) => (someprop === 'somevalue'
//   && css`
//         color: blue;
//       `)
//   || (someprop === 'red'
//     && css`
//         color: red;
//       `)};
// `;
