import { FC } from 'react';
import {
  CloseDarkIconSC,
  LeftBlock,
  NameWrapper,
  Wrapper,
} from './DocumentPanel.styled';
import { Props } from './DocumentPanel.types';
import { ClipIcon } from 'ui-kit/icons';
import { checkDocExtension } from 'services/actsJournalService/actsJournalService.utils';

export const DocumentPanel: FC<Props> = ({
  name,
  setViewModalOpen,
  handleDeleteDoc,
  doc,
}) => {
  return (
    <Wrapper>
      <LeftBlock
        onClick={() =>
          setViewModalOpen(doc.url ? checkDocExtension(doc.url) : false)
        }
      >
        <ClipIcon />
        <NameWrapper>{name || 'Документ'}</NameWrapper>
      </LeftBlock>
      <CloseDarkIconSC onClick={() => handleDeleteDoc(doc.id)} />
    </Wrapper>
  );
};
