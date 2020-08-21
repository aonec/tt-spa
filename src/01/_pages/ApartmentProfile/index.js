import React from "react"
import styled from "reshadow/macro"
import 'antd/dist/antd.css';
import { Route, useRouteMatch, useParams, useHistory } from "react-router-dom"
import { grid } from "01/r_comp"
import { Tabs } from "./components/Tabs/Tabs"
import axios from '01/axios';
import { MoreOutlined } from '@ant-design/icons';
import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"
import { getApartment, getInfo } from "./api"


import { Title } from './components/Title'
import { Text } from './components/Text'
import { Tags } from './components/Tags/Tags'
import { Information } from './components/Information/Information'
import { Owner } from './components/Owner/Owner'



import { EditButton } from './components/EditButton'
import "./ApartmentProfile.css";

function reducer(state, action) {
  const { type, data } = action
  switch (type) {
    case "success":
      return { ...state, ...data }
    default:
      console.error("objid", type)
      return state
  }
}

export const ApartmentProfile = () => {
  const [state, dispatch] = React.useReducer(reducer, {})
  useFetchPage(state, dispatch)
  const { 0: objid } = useParams()
  const { push } = useHistory()
  const info = useObjectInformation(state)
  const changes = useDeviceChanges(state);
  const { header = [], events = [], aparts = [] } = state
  console.log("changes", changes);


  const Block = () => {
    return (
      <ul className="block">
        <li><a className="block__link">Редактировать квартиру</a></li>
        <li><a className="block__link">Добавить собственника</a></li>
        <li><a className="block__link">Добавить прибор учета</a></li>
        <li><a className="block__link">Удалить квартиру</a></li>
      </ul>
    )
  }

  // const buttonHandler = (event) => {
  //   console.log('buttonHandler')
  //   console.log(event.target)
  //   const a = document.querySelector('.block')
  //   console.log(a)
  //   a.classList.toggle('visible')
  // }



  const URL = "HousingStocks"
  const replaceURL = (url = "") => url.replace(/objects/, URL)

  function createTitleObject(data) {
    const { street, number, city } = data
    return [`${street}, ${number}`, city]
  }

  let tess;

  async function f(url = "") {
    const res = await axios.get(replaceURL(url))
    console.log('result', res); // "готово!"
    tess = res;
    console.log('tess', tess)
  }
  f(`/objects/755/devices/1325866`);

  const a = f(`/objects/755/devices/1325866`);
  const buttonHandler = () => {
    console.log(tess)
  }





  return styled(grid)(
    <>

      {/* <Breadcrumb>
        <Breadcrumb.Item href="/">
          <LeftOutlined />
          <span>Назад</span></Breadcrumb.Item>
      </Breadcrumb> */}

      <div className="apartment-header">
        <div className="apartment-header__wrap">
          <Title size="32">Кв. №41</Title>
          <Text>Нижнекамск, ул. Мира, 36</Text>
        </div>

        <div className="apartment-header__button-wrap">
          <EditButton onClick={(event) => { buttonHandler(event) }}><MoreOutlined /></EditButton>
          <Block />
        </div>
      </div>
      <Tabs />

      {/* <grid> */}
      <Route path="/*/(\\d+)" exact>
        {/* <Information {...info} /> */}
        {/* <Events title="Задачи с объектом" {...events} /> */}

        <Tags />
        <Information />
        <Owner />
        <button onClick={buttonHandler}>getApartment</button>


      </Route>
      {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
      {/* </grid> */}
      <Route path="/*/(\\d+)/testimony" exact>
        {/* <Documents {...info} /> */}
        <h2>Компонент Приборы Учета</h2>
      </Route>


    </>
  )
}







// export function ApartmentProfile() {
//   const buttonHandler = (event) => {
//     console.log('buttonHandler')
//     console.log(event.target)
//     const a = document.querySelector('.block')
//     console.log(a)
//     a.classList.toggle('visible')
//   }

//   const params = useParams()
//   console.log(params[1])



//   const funcGetApartment = () => {
//     getApartment()
//     getInfo();
//   }

//   return (
//     <div>
//       <Breadcrumb>
//         <Breadcrumb.Item href="/">
//           <LeftOutlined />
//           <span>Назад</span></Breadcrumb.Item>
//       </Breadcrumb>


//       <div className="apartment-header">
//         <div className="apartment-header__wrap">
//           <Title size="32">Кв. №41</Title>
//           <Text>Нижнекамск, ул. Мира, 36</Text>
//         </div>

//         <div className="apartment-header__button-wrap">
//           <EditButton onClick={(event) => { buttonHandler(event) }}><MoreOutlined /></EditButton>
//           <Block />
//         </div>
//       </div>

//       <Tabs />
//       <Tags />
//       <Information />
//       <Owner />
//       <button onClick={funcGetApartment}>getApartment</button>
//     </div>

//   )
// }
