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
import { Space } from '01/shared/ui/Layout/Space/Space';

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
                  {panelLoading && (
                    <>
                      <Space w={5} />
                      <Loader show />
                    </>
                  )}
                </Button>
              )}
            </StageItem>
          )
        )}
      </div>
    </section>
  );
};
