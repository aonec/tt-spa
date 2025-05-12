import { FC } from 'react';
import {
  CloseDarkIconSC,
  LeftBlock,
  NameWrapper,
  Wrapper,
} from './DocumentPanel.styled';
import { Props } from './DocumentPanel.types';
import { ClipIcon } from 'ui-kit/icons';

export const DocumentPanel: FC<Props> = ({
  name,
  setViewModalOpen,
  handleDeleteDoc,
  docId,
}) => {
  return (
    <Wrapper>
      <LeftBlock onClick={() => setViewModalOpen(true)}>
        <ClipIcon />
        <NameWrapper>{name || 'Документ'}</NameWrapper>
      </LeftBlock>
      <CloseDarkIconSC onClick={() => handleDeleteDoc(docId)} />
    </Wrapper>
  );
};
