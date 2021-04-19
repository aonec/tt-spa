import React from 'react';
import styled, { css, use } from 'reshadow/macro';
import { Loader, Icon } from '01/components';
import styledComp from 'styled-components';
import { Icon as IconTT } from '../../../tt-components/Icon';

import { time_line } from '01/r_comp';
import { Link, useHistory } from 'react-router-dom';
import DeviceIcons from '../../../_components/DeviceIcons';

const styles = css`
  task_item {
    cursor: pointer;
    padding: 8px;
    &:hover {
      color: var(--primary-100);
      box-shadow: var(--shadow);
    }
  }

  row {
    display: flex;
    align-items: center;
  }

  row:not(:first-child) {
    margin-top: 8px;
  }

  row > *:not(:last-child, Icon) {
    margin-right: 16px;
  }

  Icon,
  IconTT {
    margin-right: 8px;
    color: var(--main-80);
  }

  task_name,
  num {
    margin-left: auto;
  }

  time_line,
  timer {
    & span {
      margin: 0 4px;
      &[|fail] {
        color: var(--error);
        opacity: 1;
      }
    }
  }
  device,
  timer,
  addr,
  cal,
  num,
  executor {
    display: inline-flex;
  }

  device_model {
    margin-right: 4px;
  }

  device,
  task_name,
  time_line > span,
  time,
  addr {
    opacity: 0.8;
  }

  timer,
  device_number,
  cal,
  num,
  executor {
    opacity: 0.6;
  }

  task_title {
    width: 65%;
  }
`;

const TaskItem = styledComp(Link)`
display: flex;
width: 100%;
padding-left: 0px;
cursor: pointer;
    // padding: 8px;
    &:hover {
      color: var(--primary-100);
      // box-shadow: var(--shadow);
    }
`;

export const TasksList = ({ items }) => {
  const { push } = useHistory();

  return styled(
    styles,
    time_line
  )(
    items?.map(
      ({
        id,
        timeline = {},
        timer,
        currentStage,
        name,
        device,
        address,
        calendar,
        perpetrator,
        showExecutor,
        node,
      }) => {
        const { icon, color } = DeviceIcons[node?.resource] || {};
        debugger;
        return (
          <task_item
            to={`/tasks/${id}`}
            key={id}
            onClick={() => push(`/tasks/${id}`)}
          >
            {/* one */}
            <row>
              <TaskItem to={`/tasks/${id}`} key={id}>
                <task_title as="h4">
                  {currentStage ? currentStage.name : name}
                </task_title>
                <task_name>{currentStage && name}</task_name>
              </TaskItem>
            </row>
            {/* two */}
            {timeline && (
              <time_line>
                <line_wrap>
                  <line as="span" style={timeline.style} />
                </line_wrap>
                <span {...use({ fail: timeline.fail })}>
                  {timeline.timeStr}
                </span>
                <time>{timeline.before}</time>
              </time_line>
            )}
            {/* tree */}
            <row>
              <timer>
                <Icon {...timer.icon} />
                <timer_text as="span">{timer.text}</timer_text>
                <span {...use({ fail: timer?.stage?.fail ?? null })}>
                  {timer.stage?.timeStr ?? timer.final.timeStr}
                </span>
                <time>{timer.stage?.before ?? timer.diff.timeStr}</time>
              </timer>
              {showExecutor && (
                <executor>
                  <Icon icon="username2" />
                  {perpetrator.name}
                </executor>
              )}
            </row>
            {/* four */}
            <row>
              {device && (
                <device>
                  <Icon icon={device.icon} fill={device.fill} />
                  <device_model as="span">{device.model}</device_model>{' '}
                  <device_number as="span">
                    ({device.serialNumber})
                  </device_number>
                </device>
              )}
              {node ? (
                <device>
                  <IconTT icon={icon} fill={color} />
                  <device_model as="span">{node.id}</device_model>{' '}
                  <device_number as="span">({node.id})</device_number>
                </device>
              ) : null}
              <addr>
                <Icon icon="map" />
                {/* {address} */}
                {address.city}, {address.street}, {address.housingStockNumber}
                {address.corpus ? `, к.${address.corpus}` : ''}
              </addr>
              <num>
                <Icon icon="number" />
                {id}
              </num>
              <cal>
                <Icon icon="calendar" />
                {calendar}
              </cal>
            </row>
          </task_item>
        );
      }
    ) ?? <Loader show size="32" />
  );
};
