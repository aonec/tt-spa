import { FC, useMemo } from 'react';
import {
  Info,
  LeftBlock,
  PanelTitle,
  PollStatusWrapper,
  RightBlock,
  Wrapper,
} from './PanelItem.styled';
import { PanelItemStatus, Props } from './PanelItem.types';
import { Skeleton } from 'antd';
import {
  PanelItemStatusIcon,
  PollStateColorLookup,
  PollStateTextLookup,
} from './PanelItem.constants';
import { Button } from 'ui-kit/Button';
import { LinkChevron } from 'ui-kit/shared/ListOpeningChevron/ListOpeningChevron';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Tooltip } from 'ui-kit/shared/Tooltip';
import { EPollState } from 'api/types';

const LeftBlockContainer = ({
  status,
  isLoading,
  title,
}: {
  status: PanelItemStatus;
  isLoading: boolean;
  title: string;
}) => {
  const icon = useMemo(() => {
    if (isLoading) {
      return PanelItemStatusIcon.Info;
    }

    return PanelItemStatusIcon[status];
  }, [isLoading, status]);

  return (
    <LeftBlock>
      {icon}
      <PanelTitle>{title}</PanelTitle>
    </LeftBlock>
  );
};

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
  const infoBlock = useMemo(() => {
    if (isLoadingInfo) {
      return <Skeleton.Input active size="small" />;
    }

    return <Info>{info}</Info>;
  }, [isLoadingInfo, info]);

  const statusText = useMemo(() => {
    if (pollState) {
      return (
        <Tooltip title={dayjs(pollState.doneAt).format('DD.MM.YYYY HH:mm')}>
          <PollStatusWrapper color={PollStateColorLookup[pollState.status]}>
            {PollStateTextLookup[pollState.status]}
          </PollStatusWrapper>
        </Tooltip>
      );
    }

    return <div />;
  }, [pollState]);

  const button = useMemo(() => {
    if (btnText) {
      return (
        <Button
          disabled={
            pollState?.status === EPollState.Pending ||
            pollState?.status === EPollState.Running
          }
          type="ghost"
          size="s"
          onClick={btnOnClick}
        >
          {btnText}
        </Button>
      );
    }

    return <div />;
  }, [pollState, btnText, btnOnClick]);

  return (
    <Wrapper>
      <LeftBlockContainer
        status={status}
        isLoading={isLoadingInfo}
        title={title}
      />
      <RightBlock>
        {infoBlock}
        {statusText}
        {button}
        {link && (
          <Link to={link}>
            <LinkChevron />
          </Link>
        )}
      </RightBlock>
    </Wrapper>
  );
};
