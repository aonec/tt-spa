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
  DisabledExtendedSearchButton,
} from './components';
import { ExtendedSearchProps } from './types';

export const ExtendedSearch: FC<ExtendedSearchProps> = ({
  children,
  isOpen,
  handleClose,
  handleOpen,
  handleApply,
  extendedSearchContent,
  handleClear,
  disabled = false,
}) => {
  if (isOpen) {
    return (
      <ExtendedSearchWrap>
        <Header>
          <HideExtendedSearchButton onClick={handleClose}>
            <ChevronUp />
          </HideExtendedSearchButton>
          <ButtonTT
            style={{ marginLeft: '10px' }}
            small
            color="white"
            onClick={handleClear}
          >
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
    );
  }

  return (
    <SearchWrap>
      {!disabled && (
        <ExtendedSearchButton onClick={handleOpen}>
          <FilerIcon />
        </ExtendedSearchButton>
      )}
      {disabled && (
        <DisabledExtendedSearchButton>
          <FilerIcon />
        </DisabledExtendedSearchButton>
      )}
      <SearchContentWrap>{children}</SearchContentWrap>
    </SearchWrap>
  );
};
