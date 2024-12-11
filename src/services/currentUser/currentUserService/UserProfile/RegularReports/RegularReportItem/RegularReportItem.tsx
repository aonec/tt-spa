import { FC, useState } from 'react';
import {
  ItemHeader,
  ReportName,
  RightBlock,
  Wrapper,
} from './RegularReportItem.styled';
import { Props } from './RegularReportItem.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { Switch } from 'antd';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';

export const RegularReportItem: FC<Props> = ({ report, isFirst }) => {
  const [isOpen, setOpen] = useState(isFirst);
  return (
    <Wrapper>
      <ListOpeningChevron isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
      <div>
        <ItemHeader>
          <ReportName onClick={() => setOpen(!isOpen)}>
            {report.report.fileName}
          </ReportName>
          <RightBlock>
            <Switch size="small" checked={true} onChange={() => {}} />
            <ContextMenuButton size="small" />
          </RightBlock>
        </ItemHeader>
        {isOpen && (
          <CommonInfo
            isLastUnderline={false}
            items={[
              {
                key: 'Тип выгрузки',
                value: 'По всей УК | УК “Уютный дом”',
              },
              {
                key: 'Зона',
                value: 'ХВС | ХВС',
              },
              {
                key: 'Категория узлов',
                value: 'Коммерческий учет',
              },
              {
                key: 'Период и детализация',
                value: 'С начала месяца | Суточная',
              },
              {
                key: 'Регулярность',
                value: '1 раз в меяц',
              },
            ]}
          />
        )}
      </div>
    </Wrapper>
  );
};
