import { FC, useMemo, useState } from 'react';
import {
  ItemHeader,
  PeriodWrapper,
  RangePickerSC,
  ReportName,
  Resource,
  RightBlock,
  Wrapper,
} from './RegularReportItem.styled';
import { Props } from './RegularReportItem.types';
import { CommonInfo } from 'ui-kit/shared/CommonInfo';
import { ContextMenuButton } from 'ui-kit/ContextMenuButton';
import { ListOpeningChevron } from 'ui-kit/shared/ListOpeningChevron';
import {
  GroupReportConfigurationPeriodDictionary,
  NodeStatusTextDictionary,
  ReportTypeDictionary,
  ResourcesNameDictionary,
} from 'dictionaries';
import {
  ContextMenuButtonColor,
  ContextMenuElement,
} from 'ui-kit/ContextMenuButton/ContextMenuButton.types';
import dayjs from 'dayjs';
import { Switch } from 'antd';

export const RegularReportItem: FC<Props> = ({
  report,
  isFirst,
  houseManagements,
  organizations,
  handleDeleteReport,
  handleChangeActivity,
  isReportUpdating,
}) => {
  const [isOpen, setOpen] = useState(isFirst);

  const unloadingType = useMemo(() => {
    if (report.report?.houseManagementId) {
      const houseManagement = houseManagements?.find(
        (houseManagement) =>
          houseManagement.id === report.report?.houseManagementId,
      );
      return `По домоуправлению | ${houseManagement?.name || 'не найдено'}`;
    }
    if (report.report?.managementFirmId) {
      const managementFirm = organizations?.items?.find(
        (managementFirm) =>
          managementFirm.id === report.report?.managementFirmId,
      );
      return `По всей УК | ${managementFirm?.name || 'не найдено'}`;
    }
    if (report.report?.buildingIds?.length) {
      return 'По домам';
    }
    return 'Не найдено';
  }, [report, houseManagements, organizations]);

  const resources = useMemo(() => {
    return (
      report.report?.nodeResourceTypes?.map(
        (resource) => ResourcesNameDictionary[resource],
      ) || ['Нет']
    );
  }, [report]);

  const regularity = report.reportConfigurationDetails
    ?.reportConfigurationPeriod
    ? GroupReportConfigurationPeriodDictionary[
        report.reportConfigurationDetails?.reportConfigurationPeriod
      ]
    : 'Не найдено';

  const reportType = report.report?.reportType
    ? ReportTypeDictionary[report.report?.reportType]
    : 'Не найдено';

  const nodeStatus = useMemo(() => {
    if (report.report?.nodeStatus === null) return 'Все';
    if (!report.report?.nodeStatus) return 'Не найдено';
    return NodeStatusTextDictionary[report.report?.nodeStatus];
  }, [report]);

  const menuButtonArr: ContextMenuElement[] = useMemo(
    () => [
      {
        title: 'Удалить',
        onClick: () => report.id && handleDeleteReport(report.id),
        color: ContextMenuButtonColor.danger,
      },
    ],
    [handleDeleteReport],
  );

  return (
    <Wrapper>
      <ListOpeningChevron isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
      <div>
        <ItemHeader>
          <ReportName onClick={() => setOpen(!isOpen)}>
            {report.report?.fileName || '-'}
          </ReportName>
          <RightBlock>
            <Switch
              size="small"
              checked={report.reportConfigurationDetails?.isActive}
              onChange={() => {
                handleChangeActivity(report);
              }}
              loading={isReportUpdating}
            />
            <ContextMenuButton size="small" menuButtons={menuButtonArr} />
          </RightBlock>
        </ItemHeader>
        {isOpen && (
          <CommonInfo
            isLastUnderline={false}
            items={[
              {
                key: 'Тип выгрузки',
                value: unloadingType,
              },
              {
                key: 'Зона',
                value: resources.map((el) => (
                  <Resource key={el}>{el}</Resource>
                )),
              },
              {
                key: 'Категория узлов',
                value: nodeStatus,
              },
              {
                key: 'Период и детализация',
                value: (
                  <PeriodWrapper>
                    <RangePickerSC
                      disabled
                      small
                      value={[
                        dayjs(report.report?.from),
                        dayjs(report.report?.to),
                      ]}
                    />
                    | {reportType}
                  </PeriodWrapper>
                ),
              },
              {
                key: 'Регулярность',
                value: regularity,
              },
            ]}
          />
        )}
      </div>
    </Wrapper>
  );
};
