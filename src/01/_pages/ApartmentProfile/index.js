export { ApartmentProfile, ApartmentContext } from './ApartmentProfile';

// import React, { useState, useEffect } from 'react';
// import {
//   Route, useRouteMatch, useParams, useHistory,
// } from 'react-router-dom';
// import styled from 'reshadow/macro';
// import styledComponents from 'styled-components';
//
// import { grid } from '01/r_comp';
// import { Loader } from '01/components/Loader';
//
// import { getApartment, getTasks } from '01/_api/apartment_page';
// import { Tabs } from './components/Tabs/Tabs';
//
// import {
//   Comments, Header, Tags, Information, Owner,
// } from './components';
//
// import { Events } from './components/Events';
//
// // Получаем типовые функции по запросам к серверу
// import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';
//
// import { convertDate } from '../../_api/utils/convertDate';
//
// // стилизация
// import 'antd/dist/antd.css';
//
// const ApartmentProfile = () => {
//   const params = useParams();
//   const apartmentId = params[1];
//
//   const [apartment, setapartment] = useState({});
//   const [tasks, setTasks] = useState([]);
//   // const [loading, setLoading] = useState(true);
//
//   const buttonHandler = () => {
//     // console.log("tasks", tasksArr)
//   };
//
//   const Wrapper = styledComponents.div`
//   display: grid;
//   grid-template-columns: 8fr 4fr;
//   padding-bottom: 40px;
// `;
//
//
//   // Получили список задач
//   const tasksList = { ...tasks.items };
//
//   // Информация о доме: Город, улица, дом
//   const { city, street, number } = { ...apartment.housingStock };
//
//   // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
//   const {
//     apartmentNumber,
//     square,
//     numberOfLiving,
//     normativeNumberOfLiving,
//   } = apartment;
//
//   // Собственники
//   const homeowners = { ...apartment.homeowners };
//
//   // Константинопольский К.К.
//   const { firstName, phoneNumber, personalAccountNumber } = {
//     ...homeowners[0],
//   };
//
//   useEffect(() => {
//     getApartment(apartmentId).then((response) => setapartment(response));
//     getTasks(apartmentId).then((response) => setTasks(response));
//   }, []);
//
//   return styled(grid)(
//     <>
//       <Header
//         apartmentNumber={apartmentNumber}
//         city={city}
//         street={street}
//         number={number}
//       />
//
//       <Tabs/>
//
//       <Route path="/*/(\\d+)" exact>
//         <Wrapper>
//           <div>
//             <Comments/>
//             <Tags/>
//             <Information
//               style={{ paddingTop: '32px' }}
//               square={square || 'Данные обновляются'}
//               numberOfLiving={numberOfLiving || 'Данные обновляются'}
//               normativeNumberOfLiving={
//                 normativeNumberOfLiving || 'Данные обновляются'
//               }
//
//             />
//             <Owner
//               firstName={firstName}
//               personalAccountNumber={personalAccountNumber}
//               phoneNumber={phoneNumber}
//             />
//           </div>
//           <div>
//             <Events tasksList={tasksList}/>
//           </div>
//         </Wrapper>
//       </Route>
//
//       <Route path="/*/(\\d+)/testimony" exact>
//
//         <ApartmentDevices/>
//       </Route>
//     </>,
//   );
// };
//
// export { ApartmentProfile };
