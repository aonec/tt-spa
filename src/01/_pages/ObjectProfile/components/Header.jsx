import React from 'react';
import { Loader } from '01/components/Loader';
import { HeaderWrap } from '../../../_components/Headers';
import ModalCalculator from './Modals/AddCalculator';
import ModalAddDevice from './Modals/AddDevice';
import ModalCommonReport from './Modals/CommonReport';
import { MenuButtonTT } from '../../../tt-components';
import { useHistory } from 'react-router-dom';
import getAccessesList from '../../../_api/utils/getAccessesList';

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

    return (
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
