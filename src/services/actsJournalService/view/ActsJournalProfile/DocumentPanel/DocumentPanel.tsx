import { FC } from 'react';
import { NameWrapper, Wrapper } from './DocumentPanel.styled';
import { Props } from './DocumentPanel.types';
import { ClipIcon, XCircleIcon } from 'ui-kit/icons';

export const DocumentPanel: FC<Props> = ({ name }) => {
  return (
    <Wrapper>
      <ClipIcon />
      <NameWrapper>
        {name}
        {'name'}
      </NameWrapper>
      <XCircleIcon />
    </Wrapper>
  );
};
