import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getObjectOfDevice } from '01/_api/device_page';
import { DeviceContext } from '../DeviceProfile';

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
  const DeviceContextResult = useContext(DeviceContext);

  const {
    calculator,
    canBeEdited,
    closingDate,
    commercialAccountingDate,
    diameter,
    futureCheckingDate,
    housingStockId,
    id,
    ipV4,
    lastCheckingDate,
    model,
    resource,
    serialNumber,
    type,
    underTransaction,
    url,
  } = { ...DeviceContextResult };

  const [houseId, setHouseId] = useState();
  const [house, setHouse] = useState();
  const {
    areaOfNonResidential,
    city,
    constructionDate,
    corpus,
    district,
    houseArea,
    houseCategory,
    index,
    isThereElevator,
    number,
    numberOfApartments,
    numberOfEntrances,
    numberOfFloors,
    region,
    street,
    totalArea,
    totalLivingArea,
  } = { ...house };
  const buttonHandler = () => {
    // console.log('houseId', houseId);
    console.log('house', house);
    console.log(city);
  };

  useEffect(() => {
    // console.log('housingStockId', housingStockId);
    async function getTasksAndApartments() {
      await getObjectOfDevice(housingStockId).then((response) => setHouse(response));
    }
    getTasksAndApartments();
    console.log('useEffect');
  }, [housingStockId]);

  return (
    <h>
      <button onClick={buttonHandler}>house</button>
      <Title>
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
