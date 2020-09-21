import React from 'react'
import styled, { css } from 'reshadow/macro'
import { Menu, EditButton } from './EditButton';
import { Loader } from '01/components/Loader'
import { HeaderWrap } from "../../../_components/Headers";
import { ModalODPU } from "./Modal";
import  {ModalCalculator} from './AddCalculator'

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
`

export const Header = React.memo(({ 0: title, 1: subtitle }) =>
  styled(styles)(
    <h>
      <HeaderWrap
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Loader show={!title} size="48">
          <div>
            <h_title>{title}</h_title>
            <h_subtitle style={{paddingTop: '8px'}}>{subtitle}</h_subtitle>
          </div>
          <div style={{ position: 'relative' }}><Menu />
            {/*<ModalODPU />*/}
            <ModalCalculator />
          </div>
        </Loader>
      </HeaderWrap>
    </h>
  )
)
