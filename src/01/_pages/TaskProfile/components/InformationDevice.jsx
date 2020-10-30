import React from 'react';
import styled, { use, css } from 'reshadow/macro';
import { useHistory } from 'react-router-dom';

import { Icon } from '01/components';
import { information } from '01/r_comp';

const style = css`
  device_title {
    display: flex;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      color: var(--primary-100);
    }
  }

  d_model {
    margin: 0 8px;
  }
  s_number {
    font-weight: 400;
    opacity: 0.6;
  }
`;

export const InformationDevice = ({
  list = [],
  icon = {},
  model = '',
  number = '',
  hidden = true,
  url = '',
  id = '',
  type = '',
  ...props
}) => {
  const { push } = useHistory();
  const path = type === 'Calculator' ? `/calculators/${id}` : `/housingMeteringDevices/${id}`;

  if (hidden) return null;
  return styled(information, style)(
    <information {...props}>
      <device_title as="h3" onClick={() => push(path)}>
        <Icon {...icon} />
        <d_model>{model}</d_model>
        <s_number>{`(${number})`}</s_number>
      </device_title>
      <info_list>
        {list.map(({ title, value, url }) => (
          <info_item
            key={title}
            {...use({ url })}
            onClick={url ? () => push('') : null}
          >
            <span>{title}</span>
            <span>{value}</span>
          </info_item>
        ))}
      </info_list>
    </information>,
  );
};

export default InformationDevice;
