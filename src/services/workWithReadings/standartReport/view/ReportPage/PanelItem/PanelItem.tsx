import { FC } from 'react';
import {
  Blue,
  ChevronWrap,
  Info,
  LeftBlock,
  PanelTitle,
  RightBlock,
  Wrapper,
} from './PanelItem.styled';
import { Props } from './PanelItem.types';
import { Skeleton } from 'antd';
import { PanelItemStatusIcon } from './PanelItem.constants';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';

export const PanelItem: FC<Props> = ({
  status,
  title,
  info,
  btnText,
  btnOnClick,
  isLoadingInfo,
  link,
}) => {
  return (
    <Wrapper>
      <LeftBlock>
        {!isLoadingInfo && PanelItemStatusIcon[status]}
        {isLoadingInfo && PanelItemStatusIcon.Info}
        <PanelTitle> {title} </PanelTitle>
      </LeftBlock>
      <RightBlock>
        {isLoadingInfo && <Skeleton.Input active size="small" />}
        {!isLoadingInfo && <Info>{info}</Info>}
        <Blue onClick={btnText ? btnOnClick : void 0}>{btnText}</Blue>
        {link && (
          <ChevronWrap to={link}>
            <ListOpeningChevron isOpen />
          </ChevronWrap>
        )}
      </RightBlock>
    </Wrapper>
  );
};
