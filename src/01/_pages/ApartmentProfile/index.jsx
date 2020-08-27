import React, { useState, useEffect } from 'react';
import { Route, useParams } from 'react-router-dom';
import styledComponents from 'styled-components';
import styled from 'reshadow/macro';
import moment from 'moment';
import { grid } from '01/r_comp';
import { Loader } from '01/components/Loader';
import { getApartment, getTasks } from '01/_api/apartment_page';
import { Tabs } from './components/Tabs/Tabs';

// Получаем типовые функции по запросам к серверу
import { Tasks } from './components/ApartmentTasks/ApartmentTasks.jsx';
import { ApartmentDevices } from './ApartmentDevicesComponent/ApartmentDevices';

// библиотека обработки дат и локализация СНГ
import 'moment/locale/ru';

// стилизация
import 'antd/dist/antd.css';

import {
  Comments,
  Header,
  Tags,
  Information,
  Owner,
} from './components';

moment.locale('ru');

const Wrapper = styledComponents.div`
  display: grid;
  grid-template-columns: 8fr 4fr;
  padding-bottom: 40px;
`;

const ApartmentProfile = () => {
  const params = useParams();
  const apartmentId = params[1];

  const [apartment, setapartment] = useState({});
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Информация о доме: Город, улица, дом
  const { city, street, number } = { ...apartment.housingStock };
  // Информация по квартире: номер, площадь, кол-во проживающих, кол-во по нормативу
  const {
    apartmentNumber,
    square,
    numberOfLiving,
    normativeNumberOfLiving,
  } = apartment;

  // Собственники
  const homeowners = { ...apartment.homeowners };

  // Константинопольский К.К.
  const { firstName, phoneNumber, personalAccountNumber } = {
    ...homeowners[0],
  };

  useEffect(() => {
    async function getTasksAndApartments() {
      const apartmentData = await getApartment(apartmentId);
      const { items: taskList } = await getTasks(apartmentId);
      setapartment(apartmentData);
      setTasks(taskList);
      setLoading(false);
    }
    getTasksAndApartments();
  }, []);

  return styled(grid)(
    <>
      <Loader show={loading} size="32">
        <Header
          apartmentNumber={apartmentNumber}
          city={city}
          street={street}
          number={number}
        />
      </Loader>

      <Tabs />

      <Route path="/*/(\\d+)" exact>
        <Wrapper>
          <div>
            <Comments />
            <Tags />
            <Information
              style={{ paddingTop: '32px' }}
              numberOfLiving={numberOfLiving || 'Данные обновляются'}
              normativeNumberOfLiving={
                normativeNumberOfLiving || 'Данные обновляются'
              }
              square={square || '74 кв.м.'}
            />
            <Owner
              firstName={firstName}
              personalAccountNumber={personalAccountNumber}
              phoneNumber={phoneNumber}
            />
          </div>
          <div>
            <Tasks tasksArr={tasks} />
          </div>
        </Wrapper>
      </Route>
      {/* <Route
                  path="/objects/(\\d+)/devices/(\\d+)/(testimony|documents|changes)?"
                  component={DeviceProfile}
                  exact
                /> */}
      {/* </grid> */}
      <Route path="/*/(\\d+)/testimony" exact>
        {/* <Documents {...info} /> */}
        <ApartmentDevices />
      </Route>
    </>,
  );
};
export { ApartmentProfile };
