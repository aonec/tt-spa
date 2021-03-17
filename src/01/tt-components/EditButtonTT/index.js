import React, { useContext } from 'react';
// import { Menu, Dropdown, Button } from 'antd';
// import { MoreOutlined } from '@ant-design/icons';
// import styled, { css } from 'styled-components';
//
// const StyledEditButton = styled(Button).attrs((props) => ({
//   form: props.form,
//   modal: props.modal,
// }))`
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 48px;
//     height: 48px;
//     ${(props) => props.size == '48'
//         && css`
//             width: 48px;
//             height: 48px;
//         `}
//
//     ${(props) => props.size == '24'
//         && css`
//             width: 24px;
//             height: 24px;
//         `}
//
//   li {
//         font-size: 16px !important;
//         line-height: 32px !important;
//     }
// `;
//
// export const EditButtonTT = (props) => {
//   console.log('props', props);
//   const { arr, size } = props;
//
//   const StyledMenu = styled(Menu)`
//         .ant-dropdown-menu-item {
//             font-size: 32px !important;
//         }
//     `;
//   const menu = (
//     <StyledMenu>
//       {arr.map((item, index) => {
//         const { title, cb } = item;
//         return (
//           <Menu.Item key={index} onClick={cb}>
//             {title}
//           </Menu.Item>
//         );
//       })}
//     </StyledMenu>
//   );
//
//   return (
//     <Dropdown overlay={menu} trigger={['click']}>
//       <StyledEditButton size={props.size}>
//         <MoreOutlined />
//       </StyledEditButton>
//     </Dropdown>
//   );
// };
//
// export default EditButtonTT;

const EditButtonTT = () =>{
    return (
        <button>test</button>
    )
}

export default EditButtonTT