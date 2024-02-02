import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 70px;
  width: 100%;
  padding: 14px 16px;

  border-radius: 4px;
  border: 1px solid #f3f5f6;
  background: #fff;

  box-shadow: 0px 8px 16px 0px rgba(78, 93, 146, 0.08),
    0px 4px 4px 0px rgba(78, 93, 146, 0.16);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;

  color: rgba(39, 47, 90, 0.7);
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
`;

export const ActInfo = styled.div`
  margin-top: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ActName = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  color: #272f5a;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px;
`;

export const ActLink = styled.div`
  color: #189ee9;
  cursor: pointer;
`;

export const ellipse = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="4"
    height="4"
    viewBox="0 0 4 4"
    fill="none"
  >
    <circle cx="2" cy="2" r="2" fill="#DCDEE4" />
  </svg>
);
