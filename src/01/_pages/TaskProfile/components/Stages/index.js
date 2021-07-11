import React from 'react';
import { Icon } from '01/components/Icon';
import { Loader } from '01/components';
import {
  Button,
  Circle,
  StageItem,
  StageName,
  Time,
  UserName,
} from './StyledStages';

export const Stages = ({
  items = [],
  revertProps = {},
  state = {},
  panelLoading,
}) => {
  console.log('Stages');
  return (
    <section>
      <h2>Этапы задачи</h2>
      <div>
        {items.map(
          ({ id, name, icon, number, info, status, canRevert, expired }) => (
            <StageItem key={id} status={status} expired={expired}>
              <Circle>{icon ? <Icon icon={icon} /> : number}</Circle>
              <StageName>{name}</StageName>
              <div />
              {info && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gridColumnGap: '8px',
                  }}
                >
                  <UserName>{info.name}</UserName>
                  <Time>{info.time}</Time>
                </div>
              )}
              {canRevert && (
                <Button
                  color="white"
                  {...revertProps}
                  disabled={panelLoading ?? false}
                >
                  Вернуть этап
                  <Loader show={panelLoading ?? false} />
                </Button>
              )}
            </StageItem>
          ),
        )}
      </div>
    </section>
  );
};
