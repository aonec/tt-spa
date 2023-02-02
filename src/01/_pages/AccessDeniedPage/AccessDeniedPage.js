import React from 'react';
import './AccessDeniedPage.css';
import { Button } from 'ui-kit/Button';

const buttonHandler = () => {
  window.open('/');
};

export const AccessDeniedPage = () => (
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
    <Button
      className="access-denied__button"
      onClick={buttonHandler}
    >
      <span>Вернуться к работе</span>
    </Button>
    <img className="access-denied__image" alt='' src={require('./403.svg')} />
  </div>
);
