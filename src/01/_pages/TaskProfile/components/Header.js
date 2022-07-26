/* eslint-disable */

import React from 'react';
import styled, { css } from '@reshadow/macro';

import { Loader } from '01/components';
import * as s from '01/r_comp';
import { Space } from '01/shared/ui/Layout/Space/Space';
import { Flex } from '01/shared/ui/Layout/Flex';
import { Icon } from '01/shared/ui/Icon';

const styles = css`
  h {
    display: grid;
    grid-template-rows: 48px 16px 16px;
    grid-gap: 8px;
    align-items: center;
  }
  h_title {
    font-size: 32px;
  }

  h_name,
  span,
  before {
    opacity: 0.8;
  }

  time_line {
    & span,
    & time {
      opacity: 0.8;
    }

    & span {
      position: relative;
      &::after {
        content: 'Время на задачу';
        position: absolute;
        width: max-content;
        left: 0;
        top: -100%;
        margin-top: -8px;
        opacity: 0.6;
      }
    }
  }

  timer,
  time_line {
    & span {
      margin: 0 4px;
      &[|fail] {
        color: var(--error);
        opacity: 1;
        &::before {
          content: '-';
        }
      }
    }
  }

  timer {
    display: inline-flex;
    opacity: 0.6;
  }

  Icon {
    margin-right: 8px;
  }
`;

export const Header = React.memo(
  ({ title = '', name = '', timeline = null, timer = null, state }) =>
    styled(
      styles,
      s.time_line
    )(
      <h>
        <Loader show={!title} size="48" />
        <Flex>
          {state?.type === 'IndividualDeviceCheck' && (
            <>
              <Icon
                name={state?.individualDevice?.resource}
                style={{ transform: 'scale(1.4)' }}
              />
              <Space w={10} />
            </>
          )}
          <div>
            <span style={{ fontSize: 32 }}>{title}</span>
          </div>
        </Flex>
        {name && (
          <>
            <h_name>{name}</h_name>
            <time_line>
              <line_wrap>
                <line as="span" style={timeline.style} />
              </line_wrap>
              <span>{timeline.timeStr}</span>
              <before>{timeline.before}</before>
            </time_line>
          </>
        )}
        {timer && (
          <timer>
            <Icon {...timer.icon} />
            <timer_text as="span">{timer.text}</timer_text>
            <span>{timer.stage?.timeStr}</span>
            <time>{timer.stage?.before}</time>
          </timer>
        )}
      </h>
    )
);
