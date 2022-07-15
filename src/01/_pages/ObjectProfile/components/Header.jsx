import React from 'react';
import styled, { css } from 'reshadow/macro';
import { Loader } from '01/components/Loader';
import { HeaderWrap } from '../../../_components/Headers';
import ModalCalculator from './Modals/AddCalculator';
import ModalAddDevice from './Modals/AddDevice';
import ModalCommonReport from './Modals/CommonReport';
import { MenuButtonTT } from '../../../tt-components';
import { useHistory } from 'react-router-dom';
import getAccessesList from '../../../_api/utils/getAccessesList';

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

export const Header = React.memo(
  ({ 0: title, 1: subtitle, setCommonReport, commonReport, object }) => {
    const access = getAccessesList();
    const { show } = access;
    const { push } = useHistory();

    const additionalAddresses = object?.address?.additionalAddresses || [];

    const additionalAddressesString = additionalAddresses
      .map((elem) => `${elem.street}, ${elem.number}`)
      .join('; ');

    const menuButtonArr = [
      {
        title: 'Добавить узел',
        cb: () => {
          push(`/objects/${object.id}/add_node`);
        },
        show: show('CalculatorUpdate'),
        color: 'default',
      },
      {
        title: 'Выгрузка сводного отчёта',
        cb: () => {
          setCommonReport(true);
        },
        show: true,
        color: 'default',
      },
    ];

    return styled(styles)(
      <h>
        <HeaderWrap
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Loader show={!title} size="48">
            <div>
              <h_title>
                {`${title}`}{' '}
                <span
                  style={{
                    fontSize: '20px',
                    color: '#272F5AAA',
                  }}
                >
                  {additionalAddressesString}
                </span>
              </h_title>
              <h_subtitle style={{ paddingTop: '8px' }}>{subtitle}</h_subtitle>
            </div>
            <div style={{ position: 'relative' }}>
              <MenuButtonTT menuButtonArr={menuButtonArr} />
              <ModalCalculator />
              <ModalAddDevice />
              <ModalCommonReport
                visible={commonReport}
                setVisible={setCommonReport}
              />
            </div>
          </Loader>
        </HeaderWrap>
      </h>
    );
  }
);

export default Header;
