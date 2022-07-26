/* eslint-disable */

import React from 'react';
import styled from '@reshadow/macro';
import { button } from '../../r_comp';

import './AccessDeniedPage.css';

const buttonHandler = () => {
  window.open('/');
};

export const AccessDeniedPage = () =>
  styled(button)(
    <div className="access-denied">
      <h1 className="access-denied__title title-40 white">
        У вас нет доступа к запрашиваемым ресурсам
      </h1>
      <p className="access-denied__subtitle ft-14">
        Если вы уверены, что это ошибка или недоразумение, то, пожалуйста,
        напишите нам в
        <a className="access-denied__link" href="mailto:support@aonec.ru">
          службу поддержки.
        </a>
        В письме не забудьте указать ссылку на страницу.
      </p>
      <button
        className="access-denied__button"
        data-big
        data-primary
        onClick={buttonHandler}
      >
        <span>Вернуться к работе</span>
      </button>
      {/* <img  src="https://satamalam.ru/public/404.svg" /> */}
      <img className="access-denied__image" src={require('./403.svg')} />
    </div>
  );
