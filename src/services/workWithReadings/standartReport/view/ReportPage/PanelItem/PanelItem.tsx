import { FC } from 'react';
import {
  Info,
  LeftBlock,
  PanelTitle,
  PollStatusWrapper,
  RightBlock,
  Wrapper,
} from './PanelItem.styled';
import { Props } from './PanelItem.types';
import { Skeleton } from 'antd';
import {
  PanelItemStatusIcon,
  PollStateColorLookup,
  PollStateTextLookup,
} from './PanelItem.constants';
import { Button } from 'ui-kit/Button';
import { LinkChevron } from 'ui-kit/shared/ListOpeningChevron/ListOpeningChevron';
import { EPollState } from 'api/types';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Tooltip } from 'ui-kit/shared/Tooltip';

export const PanelItem: FC<Props> = ({
  status,
  title,
  info,
  btnText,
  btnOnClick,
  isLoadingInfo,
  link,
  pollState,
}) => {
  const isLoading =
    pollState?.status === EPollState.Running ||
    pollState?.status === EPollState.Pending;

  return (
    <Wrapper>
      <LeftBlock>
        {!isLoadingInfo && PanelItemStatusIcon[status]}
        {isLoadingInfo && PanelItemStatusIcon.Info}
        <PanelTitle>{title}</PanelTitle>
      </LeftBlock>
      <RightBlock>
        {isLoadingInfo && <Skeleton.Input active size="small" />}
        {!isLoadingInfo && <Info>{info}</Info>}
        {pollState ? (
          <Tooltip title={dayjs(pollState.doneAt).format('DD.MM.YYYY HH:mm')}>
            <PollStatusWrapper color={PollStateColorLookup[pollState.status]}>
              {PollStateTextLookup[pollState.status]}
            </PollStatusWrapper>
          </Tooltip>
        ) : (
          <div />
        )}
        {btnText && (
          <Button
            disabled={Boolean(btnText || isLoading)}
            type="ghost"
            size="small"
            onClick={btnOnClick}
          >
            {btnText}
          </Button>
        )}
        {!btnText && <div />}
        {link && (
          <Link to={link}>
            <LinkChevron />
          </Link>
        )}
      </RightBlock>
    </Wrapper>
  );
};
