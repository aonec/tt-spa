import React, {useContext, useState} from 'react';
import {
    Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import {useHistory} from 'react-router-dom';
import getAccessesList from "../../../../_api/utils/getAccessesList";
import {MenuButtonTT} from "../../../../tt-components";
import styled from "styled-components";
import ModalGroupReport from "../../components/Modals/GroupReport";


export const Header = () => {
    const {push} = useHistory();
    const access = getAccessesList();
    const {show} = access

    const [groupReport, setGroupReport] = useState(false);



    const menuButtonArr = [
        {
            title: 'Выгрузка группового отчёта',
            // cb: () => push(`/calculators/edit`),
            cb: () => setGroupReport(true),
            show: show('ReportRead'),
            color: 'default',
            clickable: false
        },
    ];

    return (
        <ObjectHeader>
            <ModalGroupReport visible={groupReport} setVisible={setGroupReport} />
            <Title>Объекты</Title>
            <div style={{position: 'relative'}}>
                <MenuButtonTT menuButtonArr={menuButtonArr}/>
            </div>
        </ObjectHeader>
    );
};

export default Header;

const ObjectHeader = styled(HeaderWrap)`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`
