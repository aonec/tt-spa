import React from 'react';
import styled from 'styled-components';
import { button } from '01/r_comp';
import { Icon } from '01/components/Icon';
import { Loader } from '01/components';
import test from 'reshadow'
import { ButtonTT } from "../../../tt-components";


//     &[|status] {
//       --status-color: var(--main-80);
//       --status-border: var(--bg);
//       --status-bg: var(--bg);
//       --stage-name-opacity: 0.6;
//       --span: 1;
//     }
//     &[|status="Done"] {
//       --status-color: var(--primary-100);
//       --status-border: var(--primary-100);
//       --status-bg: #fff;
//       --span: 2;
//     }
//
//     &[|status="InProgress"] {
//       --stage-name-opacity: 0.8;
//       --status-color: #fff;
//       --status-bg: var(--primary-100);
//       --status-border: var(--primary-100);
//     }


const StageItem = styled.div.attrs(props => ({
  status: props.status,
}))`
    
     display: grid;
     grid-template-columns: auto auto 1fr;
     grid-row-gap: 8px;
     grid-column-gap: 16px;
     padding-bottom: 20px;
     position: relative;
       &:not(:last-child)::before {
         content: "";
         position: absolute;
         border: 1px solid;
         border-color: var(--primary-100);
         bottom: 2px;
         top: 34px;
         left: 16px;
       }
  `
const Circle = styled.span`
       grid-row: 1 / var(--span);
       width: 32px;
       height: 32px;
       border-radius: 50%;
       border: 1px solid var(--status-border);
       display: inline-grid;
       place-items: center;
       color: var(--status-color);
       background: var(--status-bg);
`

const StageName = styled.div`
       grid-column: 2 / -1;
       opacity: var(--stage-name-opacity);
       align-self: center;
`

const Time = styled.div`
       grid-column: 2;
       grid-row: 2;
       font-size: 12px;
       opacity: 0.32;
`

const UserName = styled.div`
       grid-column: 2;
       grid-row: 2;
       font-size: 12px;
       opacity: 0.32;
`

const Button = styled(ButtonTT)`
       grid-column: 2 / -1;
       justify-self: start;
`



export const Stages = ({
  items = [], revertProps = {}, state = {}, panelLoading,
}) => {
  console.log('Stages');
  return (
    <section>
      <h2>Этапы задачи</h2>
      <div>
        {items.map(({
          id, name, icon, number, info, status, canRevert,
        }) => (
          <StageItem key={id} status={status}>
            <Circle>{icon ? <Icon icon={icon} /> : number}</Circle>
            <StageName>{name}</StageName>
            {info && (
            <>
              <UserName>{info.name}</UserName>
              <Time>{info.time}</Time>
            </>
            )}
            {canRevert && (
            <Button size="small" {...revertProps} disabled={panelLoading ?? false}>
              <span>Вернуть этап</span>
              <Loader show={panelLoading ?? false} />
            </Button>
            )}
          </StageItem>
        ))}
      </div>
    </section>
  );
};
