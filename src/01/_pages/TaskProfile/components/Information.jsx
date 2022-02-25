import React from 'react';
import styled, { use } from 'reshadow/macro';
import { Link, useHistory, useParams } from 'react-router-dom';

import { Loader } from '01/components/Loader';
import { information } from '01/r_comp';
import { useStore } from 'effector-react';
import { $task, TaskGate } from '01/features/tasks/displayTask/models';
import styledComponent from 'styled-components';

export const Information = ({
  list = [],
  device = true,
  loading = true,
  ...props
}) => {
  const { push } = useHistory();

  const task = useStore($task);

  const isHousingDeviceMalfunction =
    task?.type === 'HousingDeviceMalfunction' ||
    task?.type === 'HousingDeviceMalfunctionNonCommercial';

  const params = useParams();

  return styled(information)`
    Loader {
      justify-self: center;
    }
  `(
    <information {...props}>
      <TaskGate id={Number(params[0])} />
      <h2>Подробная информация</h2>
      <Loader show={loading} size="20">
        <info_list>
          {list.map(({ title, value, url }) => {
            const link =
              task?.pipeNode?.id && `/nodes/${task?.pipeNode?.id}/stats`;

            const isNodeStatLink =
              title === 'Причина задачи' && isHousingDeviceMalfunction && link;

            return (
              <info_item
                key={title}
                {...use({ url })}
                onClick={url ? () => push(url) : null}
              >
                <span>{title}</span>
                {isNodeStatLink ? (
                  <StatisticLink to={link}>{value}</StatisticLink>
                ) : (
                  <span>{value}</span>
                )}
              </info_item>
            );
          })}
        </info_list>
      </Loader>
    </information>
  );
};

const StatisticLink = styledComponent(Link)`
  color: #FC525B;
  &:hover {
    color: #FC525B;
  }
`;

export default Information;
