import React, { useContext, useEffect } from 'react';
import { Link as LinkTitle } from 'react-router-dom';
import styled, { css } from 'reshadow/macro';

import { title_section, getDeviceIconProps } from 'styles/helper';
import { Icon, SimpleListItem } from 'components';
import { TaskIdContext } from './contex';

export const DeviceList = ({ styles, ...props }) => {
  const [{ device, housingStockId }] = useContext(TaskIdContext);

  if (!device) return null;
  const {
    id,
    serialNumber,
    model,
    diameter,
    lastCheckingDate,
    futureCheckingDate,
    commercialAccountingDate,
  } = device;

  return styled(styles, title_section)(
    <div>
      <LinkTitle to={`/housingstocks/${housingStockId}/devices/${id}`}>
        <Icon fill="rgba(var(--main),.8)" {...getDeviceIconProps(device)} />
        <span>{`${model} (${serialNumber})`}</span>
      </LinkTitle>
      <ul>
        {[
          // { title: "Связь с прибором", value: "a" },
          // { title: "ID узла", value: "a" },
          {
            title: 'Постановка на учет',
            value: new Date(commercialAccountingDate).toLocaleDateString(),
          },
          diameter && { title: 'Диаметр', value: diameter },
          {
            title: 'Окончание срока эксплуатации',
            value: new Date(futureCheckingDate).toLocaleDateString(),
          },
          {
            title: 'Последняя поверка приборов',
            value: new Date(lastCheckingDate).toLocaleDateString(),
          },
          // { title: "Форм-фактор", value: "a" },
          // { title: "Документ", value: "a" },
        ]
          .filter((item) => item)
          .map((item) => (
            <SimpleListItem key={item.title} {...item} />
          ))}
      </ul>
    </div>,
  );
};

export default DeviceList;

DeviceList.defaultProps = {
  styles: css`
    LinkTitle {
      display: grid;
      grid-template-columns: repeat(3, auto);
      grid-gap: 8px;
      justify-content: start;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      line-height: 1;
      color: rgb(var(--main));
      & > span {
        opacity: 0.8;
        font-weight: normal;
      }
    }
  `,
};
