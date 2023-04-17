import * as Icons from './';
import React, { useState } from 'react';
import {
  IconName,
  IconsList,
  IconInfoWrapper,
  IconWrapper,
  Wrapper,
  SearchWrapper,
} from './Icons.styled';
import { message } from 'antd';
import { Input } from 'ui-kit/Input';

export default {
  title: 'Icons',
  parameters: { layout: 'centered' },
};

export const All = () => {
  const [search, setSearch] = useState('');

  return (
    <Wrapper>
      <SearchWrapper>
        <Input
          search
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<Icons.SearchIcon />}
          placeholder="Search"
        />
      </SearchWrapper>
      <IconsList>
        {Object.entries(Icons)
          .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
          .map(([name, Icon]) => (
            <IconInfoWrapper
              onClick={() => {
                navigator.clipboard.writeText(`<${name} />`);
                message.info('Icon copied to clickboard');
              }}
            >
              <IconWrapper>
                <Icon />
              </IconWrapper>
              <IconName>{name}</IconName>
            </IconInfoWrapper>
          ))}
      </IconsList>
    </Wrapper>
  );
};
