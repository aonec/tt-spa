import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getObjectOfDevice } from '01/_api/device_page';
import DeviceIcons from '01/_components/DeviceIcons';
import { Icon } from '01/_components/Icon';

export const Template = styled.div``;

export const h = styled.div`
  display: grid;
  grid-template-rows: 48px 16px;
  grid-gap: 8px;
  align-items: center;
`;

export const Title = styled.h2`
  padding: 0;
  margin: 0;
  font-weight: 300;
  font-size: 32px;
  line-height: 48px;
`;

export const Subtitle = styled.p`
  padding: 0;
  margin: 0;
  opacity: 0.8;
`;

export const Header = ({ list = [], loading = true, ...props }) => {

  const [house, setHouse] = useState();
  const {
    serialNumber, type, model,city,number,street
  } = props;

  const buttonHandler = () => {
    console.log('house', house);
    console.log(city);
  };
  const [icons, setIcons] = useState(DeviceIcons);
  const { icon, color } = { ...icons[type] };


  return (
    <h>
      <Title>
        <Icon icon={icons.Calculator.icon} style={{ width: '24px', height: '24px' }} />
        {model}
        &nbsp;(
        {serialNumber}
        )
      </Title>
      <Subtitle>
        {city}
        ,
        {' '}
        {street}
        ,
        {' '}
        {number}
      </Subtitle>
    </h>
  );
};

export default Header;

// export const Header = React.memo(({ 0: title, 1: subtitle }) =>
//   styled(styles)(
//     <h>
//       <Loader show={!title} size="48">
//         <h_title>{title}</h_title>
//         <h_subtitle>{subtitle}</h_subtitle>
//       </Loader>
//     </h>
//   )
// )

// useEffect(() => {
//   async function getTasksAndApartments() {
//     await getObjectOfDevice(params[0]).then((response) => {
//       setapartment(response.header);
//     });
//   }
//   getTasksAndApartments();
// }, []);
