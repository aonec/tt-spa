import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import {
  Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import DeviceIcons from '01/_components/DeviceIcons';

import { DeviceContext } from '../DeviceProfile';

export const Template = styled.div``;

export const Header = (loading=true) => {
  const { device, building ,states } = useContext(DeviceContext);

  // const states = {
  //   deviceState: { loading: false, error: 'Произошла ошибка запроса устройства' },
  //   tasksState: { loading: false, error: 'Произошла ошибка при загрузке данных по сети' }
  // }

  const loadingDevice = _.get(states, 'deviceState.loading', true);
  const loadingBuilding = _.get(states, 'buildingState.loading', true);

  loading = loadingDevice || loadingBuilding;

  console.log("deviceState",states)

  if(device)
  
  // if(mistake) {
  //   return (
  //     <HeaderWrap >
  //       <Title style={{color: 'red'}}>
  //         Данные не получены
  //       </Title>
  //       <Subtitle style={{color: 'red'}}>Обратитесь в тех.поддержку</Subtitle>
  //     </HeaderWrap>
  //   )
  // }

  const buttonHandler = () => {
    console.log(device, building);
  };

  const { city, street, number } = building || { city: null, street: null, number: null };
  const { model, serialNumber, resource } = device || { model: null, serialNumber: null, resource: null };
  const { icon, color } = DeviceIcons[resource];



  return (
    <HeaderWrap>
      <Loader show={loading} size="32">
        <Title>
          <Icon
            icon={icon}
            color={color}
            size="24"
            style={{ marginRight: '8px' }}
          />
          {`${model} (${serialNumber})`}
        </Title>
        {/* <button onClick={buttonHandler}>button</button> */}
        <Subtitle>{`${city}, ${street}, ${number}`}</Subtitle>
      </Loader>
    </HeaderWrap>
  );
};

export default Header;


// import React, { useState, useContext } from 'react';
// import styled from 'styled-components';
// import DeviceIcons from '01/_components/DeviceIcons';
// import { Icon } from '01/_components/Icon';
// import { Loader } from '01/components';
// import { DeviceContext } from '../DeviceProfile';
//
// export const Template = styled.div``;
//
// export const HeaderWrap = styled.div`
//   display: grid;
//   grid-template-rows: 48px 16px;
//   grid-gap: 8px;
//   align-items: center;
// `;
//
// export const Title = styled.h2`
//   padding: 0;
//   margin: 0;
//   font-weight: 300;
//   font-size: 32px;
//   line-height: 48px;
// `;
//
// export const Subtitle = styled.p`
//   padding: 0;
//   margin: 0;
//   opacity: 0.8;
// `;
//
// export const Header = ({ list = [], loading = true, ...props }) => {
//   // const DeviceProfileContext = useContext(DeviceContext);
//   const { device, building } = useContext(DeviceContext);
//
//   const buttonHandler = () => {
//     console.log(device, building);
//   };
//
//   // сначала получаем объекты с данными
//   if (device && building) {
//     const { city, street, number } = building;
//     const { model, serialNumber, resource } = device;
//     const { icon, color } = DeviceIcons[resource];
//
//     return (
//       <HeaderWrap>
//         <Title>
//           <Icon
//             icon={icon}
//             color={color}
//             size="24"
//             style={{ marginRight: '8px' }}
//           />
//           {`${model} (${serialNumber})`}
//         </Title>
//         {/* <button onClick={buttonHandler}>button</button> */}
//         <Subtitle>{`${city}, ${street}, ${number}`}</Subtitle>
//       </HeaderWrap>
//     );
//   }
//   // пока не получили данные - показываем Loader
//
//   return <Loader show size="32" />;
// };
//
// export default Header;
