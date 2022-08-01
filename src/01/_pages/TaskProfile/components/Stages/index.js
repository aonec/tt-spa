/* eslint-disable */

/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button,
  Circle,
  StageItem,
  StageName,
  Time,
  UserName,
} from './StyledStages';
import { Icon, Loader } from '../../../../components';
import { Space } from '../../../../shared/ui/Layout/Space/Space';

export const Stages = ({
  items = [],
  revertProps = {},
  state = {},
  panelLoading,
}) => {
  return (
    <section>
      <h2>Этапы задачи</h2>
      <div>
        {items.map(
          ({ id, name, icon, number, info, status, canRevert, expired }) => {
            return (
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
                    <Space w={panelLoading ? 10 : "0"} />
                    <Loader show={panelLoading ?? false} />
                  </Button>
                )}
              </StageItem>
            );
          }
        )}
      </div>
    </section>
  );
};
