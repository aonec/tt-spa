import React from 'react';
import { Menu, Dropdown } from 'antd';
import { Icon } from '../../../_components/Icon';
import { EditButtonWrap } from '../../../tt-components';

const EditButton = () => {
  console.log('EditButton');

  const handleEditButtonWrap = (e) => {
    // e.preventDefault();
  };

  return (
    <EditButtonWrap size="32" disabled={'true'} >
      <Icon icon="menu" />
    </EditButtonWrap>
  );
};

// onClick={handleEditButtonWrap}

export default EditButton;

// import React from 'react';
// import { Menu, Dropdown } from 'antd';
// import { Icon } from '../../../_components/Icon';
// import { EditButtonWrap } from '../../../tt-components';
//
// const EditButton = () => {
//   console.log('EditButton');
//
//   const MenuList = () => {
//     console.log('Menu');
//     return (
//       <Menu>
//         <Menu.Item>
//           <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
//             Редактирование
//           </a>
//         </Menu.Item>
//         <Menu.Item danger>Удалить</Menu.Item>
//       </Menu>
//     );
//   };
//
//   return (
//     <Dropdown overlay={MenuList}>
//       <EditButtonWrap size="32" onClick={(e) => e.preventDefault()}>
//         <Icon icon="menu" />
//       </EditButtonWrap>
//     </Dropdown>
//   );
// };
//
// export default EditButton;
//
//
//
//
