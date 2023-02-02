import React from 'react';
import './ErrorPage.css';
import { Button } from 'ui-kit/Button';

const buttonHandler = () => {
  window.open('/');
};

export const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1 className="error-page__title title-40">Ресурсы не найдены</h1>
      <Button
        className="error-page__button"
        data-big
        data-primary
        onClick={buttonHandler}
      >
        <span>Вернуться к работе</span>
      </Button>
      <img className="error-page__image" alt='' src={require('./404.svg')} />
    </div>
  );
};
