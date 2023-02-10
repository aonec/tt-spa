import { Tooltip } from 'antd';
import React, { FC } from 'react';
import { TaskInfoItem } from './TaskPoint.styled';
import { TaskPointProps } from './TaskPoint.types';
import { getTaskDotStyle, getTaskTextStyle } from './TaskPoint.utils';

const radius = 10;
const littleRadius = 4;

export const TaskPoint: FC<TaskPointProps> = ({ scale, datum }) => {
  const isAllActive = datum?.isAllActive;

  if (!scale || !datum) {
    return null;
  }
  const { isEmergency, x, y, amount, tasksInfo } = datum;

  const xPos = scale.x(x);
  const yPos = scale.y(y);

  return (
    <g>
      <line
        x1={xPos}
        x2={xPos}
        y1={scale.y(0)}
        y2={yPos}
        stroke={'#DCDEE4'}
        strokeDasharray="5"
      />

      <Tooltip
        title={
          <div>
            {tasksInfo.map((task) => (
              <TaskInfoItem key={task.id}>
                <span>{task.title}</span>
              </TaskInfoItem>
            ))}
          </div>
        }
      >
        <g cursor="pointer">
          <circle
            cx={xPos}
            cy={yPos}
            r={radius}
            style={getTaskDotStyle(isAllActive || false)}
          />
          <text
            x={xPos}
            y={yPos}
            dx={-3}
            dy={4}
            style={getTaskTextStyle(isAllActive || false)}
          >
            {amount}
          </text>
          {isEmergency && (
            <circle
              cx={xPos + radius * Math.sin(Math.PI / 4)}
              cy={yPos - radius * Math.sin(Math.PI / 4)}
              r={littleRadius}
              style={{ fill: '#FC525B' }}
            />
          )}
        </g>
      </Tooltip>
    </g>
  );
};
