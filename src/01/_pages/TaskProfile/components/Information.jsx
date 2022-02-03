import React from 'react';
import styled, { use } from 'reshadow/macro';
import { useHistory } from 'react-router-dom';

import { Loader } from '01/components/Loader';
import { information } from '01/r_comp';
import { InfoSectionTitle } from '01/shared/ui/InfoSection';
import { Space } from '01/shared/ui/Layout/Space/Space';

export const Information = ({
  list = [],
  device = true,
  loading = true,
  ...props
}) => {
  const { push } = useHistory();

  return styled(information)`
    Loader {
      justify-self: center;
    }

    info_value {
      color: black;
    }
  `(
    <information {...props}>
      <InfoSectionTitle>Информация о задаче</InfoSectionTitle>
      <Space />
      <Loader show={loading} size="20">
        <info_list>
          {list.map(({ title, value, url }) => (
            <info_item
              key={title}
              {...use({ url })}
              onClick={url ? () => push(url) : null}
            >
              <span>{title}</span>
              <info_value>{value}</info_value>
            </info_item>
          ))}
        </info_list>
      </Loader>
    </information>
  );
};

export default Information;
