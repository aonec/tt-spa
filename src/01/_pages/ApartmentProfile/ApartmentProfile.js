import React from 'react'
import styled from 'reshadow/macro'
import { useParams } from 'react-router-dom'
import { Tabs } from './components/Tabs'

export const ApartmentProfile = () => {
  const params = useParams()
  console.log(params[1])
  return styled()(
    <div>
      Профиль Квартиры
      <h2>id квартиры: {params[1]}</h2>
      <p>Компонент обновляется</p>
      <Tabs />
    </div>
  )
}



// import React, { useState, useEffect } from "react";
// import styled from 'reshadow/macro'
// import { useParams } from 'react-router-dom'
// import { Tabs } from './components/Tabs'
// import { Tags } from './components/Tags'
// import { Information } from './components/Information'
// import { Comments } from './components/Comments'
// import { Owner } from './components/Owner'

// import { Breadcrumb, Button } from 'antd';
// import { SearchOutlined, MoreOutlined } from '@ant-design/icons';
// import 'antd/dist/antd.css';
// import './ApartmentProfile.css';
// export function ApartmentProfile() {
//   const params = useParams();
//   // const [page, setPage] = useState(<Temp />);
//   const someFunc = () => {
//     // console.log(element.id);
//     console.log('someFunc');
//     // localStorage.setItem('param', element.id);
//     //setPage(<Profile />);
//   }
//   console.log(params[1])
//   return styled()(

//     <div className="apartment">
//       <h2 className="apartment__title">Профиль квартиры,id квартиры: {params[1]} </h2>
//       <p className="apartment__subtitle">Компонент обновляется</p>
//       <p className="apartment__subtitle">staging</p>

//       <Breadcrumb>
//         <Breadcrumb.Item>
//           <a href="javascript:history.back()">&#60;	 Назад</a>
//         </Breadcrumb.Item>
//       </Breadcrumb>

//       <div className="apartment__top">
//         <div className="apartment__top-wrap">
//           <h3 className="apartment__top-title">Кв. №41</h3>
//           <Button onClick={someFunc}><MoreOutlined /></Button>
//         </div>
//         <p>Нижнекамск, ул. Мира, 36</p>
//       </div>


//       <Tabs />

//       <Comments />

//       <Tags />

//       <div className="appartment__information">
//         <h3>Информация</h3>
//         <Information />
//       </div>

//       <Owner />


//     </div>
//   )
// }