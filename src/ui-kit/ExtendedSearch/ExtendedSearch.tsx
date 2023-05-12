import React, { FC } from 'react';
import { ChevronUp } from 'react-bootstrap-icons';
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
  ClearIconSC,
  Title,
} from './ExtendedSearch.styled';
import { Button } from 'ui-kit/Button';
import { ExtendedSearchProps } from './ExtendedSearch.types';

export const ExtendedSearch: FC<ExtendedSearchProps> = ({
  children,
  isOpen,
  handleClose,
  handleOpen,
  handleApply,
  extendedSearchContent,
  handleClear,
  disabled = false,
  isShowClearButton = true,
  title,
}) => {
  if (isOpen) {
    return (
      <ExtendedSearchWrap>
        <Header>
          <HideExtendedSearchButton onClick={handleClose}>
            <ChevronUp />
          </HideExtendedSearchButton>
          {isShowClearButton && (
            <Button
              type="ghost"
              onClick={handleClear}
              size="small"
              icon={<ClearIconSC />}
            >
              Очистить
            </Button>
          )}
          {title && <Title>{title}</Title>}
        </Header>
        <Content>{extendedSearchContent}</Content>
        <Footer>
          <Button onClick={handleClose} type="ghost">
            Отмена
          </Button>
          <Button onClick={handleApply}>Применить фильтры</Button>
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
