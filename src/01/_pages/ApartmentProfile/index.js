import React from 'react';
import 'antd/dist/antd.css';
import { Button, Breadcrumb } from 'antd';
import {
  MoreOutlined, UserOutlined, LeftOutlined
} from '@ant-design/icons';

import { Comments } from './components/Comments/Comments'
import { Tags } from './components/Tags/Tags'
import { Information } from './components/Information/Information'
import { Owner } from './components/Owner/Owner'

import "./ApartmentProfile.scss"

import { Tabs } from './components/Tabs/Tabs'
import { button } from '01/r_comp';
import { useObjectInformation, useFetchPage, useDeviceChanges } from "./hooks"

import { getInfo, getApartment } from '../../_api/apartment_page';

import { useParams } from 'react-router-dom'

export function ApartmentProfile() {
  const buttonHandler = (event) => {
    console.log('buttonHandler')
    console.log(event.target)
    const a = document.querySelector('.block')
    console.log(a)
    a.classList.add('visible')
  }

  const params = useParams()
  console.log(params[1])

  const Block = () => {

    return (
      <ul className="block">
        <li><a>Редактировать квартиру</a></li>
        <li><a>Добавить собственника</a></li>
        <li><a>Добавить прибор учета</a></li>
        <li><a>Удалить квартиру</a></li>
      </ul>
    )
  }

  let b;

  async function c() {
    try {
      const res = await getApartment()
      // console.log(replaceURL(url))
      ///HousingStocks/755/devices/1325866
      // console.log("getInfo", url)
      console.log('res', res);
      //console.log({ ...res, info: true, header: createTitleObject(res) });
      // return { ...res, info: true, header: createTitleObject(res) }
      return res
    } catch (error) { }
  }

  const a = c();


  const funcGetApartment = () => {
    // console.log('funcGetApartment')
    // console.log('getInfo', getInfo());
    // console.log("getApartment", getApartment(`/objects/664/apartments/1125376`));
    console.log('getApartment', getApartment());
    console.log(a)
  }


  return (
    <div>
      <button onClick={funcGetApartment}>getApartment</button>
      <Breadcrumb>
        <Breadcrumb.Item href="/">
          <LeftOutlined />
          <span>Назад</span></Breadcrumb.Item>
      </Breadcrumb>
      <div className="apartment-header">
        <div className="apartment-header__wrap">
          <h1 className="title-32">Кв. №41</h1>
          <p>Нижнекамск, ул. Мира, 36</p>
        </div>
        <div className="apartment-header__button-wrap">
          <Button className="apartment-header__button" onClick={(event) => { buttonHandler(event) }}><MoreOutlined /></Button>
          <Block />
        </div>

      </div>

      <Comments />
      <Tags />
      <Information />
      <Owner />

    </div>

  )
}