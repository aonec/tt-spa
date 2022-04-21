import { ButtonTT } from '01/tt-components';
import React, { FC } from 'react';
import { ChevronUp, XLg } from 'react-bootstrap-icons';
import { ReactComponent as FilerIcon } from './assets/filter.svg';
import {
  ExtendedSearchButton,
  ExtendedSearchWrap,
  HideExtendedSearchButton,
  SearchContentWrap,
  SearchWrap,
  Content,
  Footer,
  Header,
} from './components';
import { ExtendedSearchProps } from './types';

export const ExtendedSearch: FC<ExtendedSearchProps> = ({
  children,
  open,
  handleClose,
  handleOpen,
  handleApply,
  extendedSearchContent,
}) => {
  return open ? (
    <ExtendedSearchWrap>
      <Header>
        <HideExtendedSearchButton onClick={handleClose}>
          <ChevronUp />
        </HideExtendedSearchButton>
        <ButtonTT style={{ marginLeft: '10px' }} small color="white">
          Очистить <XLg />
        </ButtonTT>
      </Header>
      <Content>{extendedSearchContent}</Content>
      <Footer>
        <ButtonTT color="white" onClick={handleClose}>
          Отмена
        </ButtonTT>
        <ButtonTT
          color="blue"
          onClick={handleApply}
          style={{ marginLeft: '10px' }}
        >
          Применить фильтры
        </ButtonTT>
      </Footer>
    </ExtendedSearchWrap>
  ) : (
    <SearchWrap>
      <ExtendedSearchButton onClick={handleOpen}>
        <FilerIcon />
      </ExtendedSearchButton>
      <SearchContentWrap>{children}</SearchContentWrap>
    </SearchWrap>
  );
};
