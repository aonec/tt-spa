import React from 'react';
import styled, { css } from 'reshadow/macro';
import { Loader } from '01/components/Loader';
import { Menu, EditButton } from './EditButton';
import { HeaderWrap } from '../../../_components/Headers';
import ModalAddDevice from './AddDevice';
import ModalCalculator from './AddCalculator';

const styles = css`
  h {
    display: grid;
    grid-template-rows: 48px 16px;
    grid-gap: 8px;
    align-items: center;
  }
  h_title {
    font-size: 32px;
    font-weight: 300;
  }

  h_subtitle {
    opacity: 0.8;
  }
`;

export const Header = React.memo(({ 0: title, 1: subtitle, corpus}) => styled(styles)(
  <h>
    <HeaderWrap
      style={{
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Loader show={!title} size="48">
        <div>
            {/*если корпус есть, то показываем его*/}
          <h_title>{`${title}`}</h_title>
          <h_subtitle style={{ paddingTop: '8px' }}>{subtitle}</h_subtitle>
          {/*<h_subtitle style={{ paddingTop: '8px' }}>, {corpus}</h_subtitle>*/}
        </div>
        <div style={{ position: 'relative' }}>
          <Menu />
          <ModalAddDevice />
          <ModalCalculator />
        </div>
      </Loader>
    </HeaderWrap>
  </h>,
));

export default Header;
