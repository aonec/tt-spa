/* eslint-disable */

import React from 'react';
import { useHistory } from 'react-router-dom';
import { Loader, Icon } from '01/components';

export const Events = ({ title = '', loading = true, items = [] }) => {
  const { push } = useHistory();
  return (
    <section>
      <h2>{title}</h2>
      <e_list>
        <Loader show={loading} />
        {items.map(({ id, currentStage, name, perpetrator, timer = {} }) => {
          if (!currentStage) {
            return null;
          }
          return (
            <e_item key={id} onClick={() => push('/tasks/profile/' + id)}>
              <e_title as="h4">{currentStage.name}</e_title>
              <e_name>{name}</e_name>
              <timer>
                <Icon icon="timer" />
                <span>{timer.text}</span>
                <timer_text>{timer.stage.timeStr}</timer_text>
                <before>{timer.stage.before}</before>
              </timer>
              <perp>
                <Icon icon="username2" />
                <user_name>{perpetrator.name}</user_name>
              </perp>
            </e_item>
          );
        })}
      </e_list>
    </section>
  );
};
