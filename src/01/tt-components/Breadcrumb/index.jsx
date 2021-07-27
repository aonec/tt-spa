import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

const StyledBreadcrumb = styled.div`
  font-weight: 500;
  color: #272f5a;
  cursor: pointer;

  &:hover {
    color: #189ee9;
  }
`;

export const Breadcrumb = ({ path = null }) => {
  const history = useHistory();

  const onClickHandler = () => (path ? history.push(path) : history.goBack());

  return (
    <div>
      <StyledBreadcrumb onClick={onClickHandler}>&lt; Назад</StyledBreadcrumb>
    </div>
  );
};

export default Breadcrumb;
