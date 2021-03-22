import React, {useContext, useState} from 'react';
import {
    Icon, Loader, HeaderWrap, Title, Subtitle,
} from '01/_components';
import {useHistory} from 'react-router-dom';
import useAccessesList from "../../../../_api/utils/useAccessesList";
import {MenuButtonTT} from "../../../../tt-components";
import styled from "styled-components";


export const Header = () => {
    const {push} = useHistory();
    const access = useAccessesList();
    const {show} = access

    const menuButtonArr = [
        {
            title: 'Выгрузка группового отчёта',
            // cb: () => push(`/calculators/edit`),
            cb: () => alert('Выгрузка группового отчёта'),
            show: show('ReportRead'),
            color: 'default',
            clickable: false
        },
    ];

    return (
        <ObjectHeader>
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
