import React from 'react';
import { FC } from 'react';
import { WithLoader } from 'ui-kit/sharedComponents/WithLoader';
import { NodeChecksProps } from './NodeChecks.types';
import {
  Button,
  DocumentInfoWrapper,
  DocumentNameWrapper,
  GroupWrapper,
  IconsWrapper,
  NoDocumentText,
  styles,
} from './NodeCheks.styled';
import { Table } from 'ui-kit/Table';
import moment from 'moment';
import { CheckingActDocumentType } from './NodeCheks.constants';
import {
  DocumentIcon,
  DownloadIcon,
  PencilIcon,
  TrashIcon,
} from 'ui-kit/icons';
import { saveDocument } from 'ui-kit/DocumentsService/DocumentsService.api';

export const NodeChecks: FC<NodeChecksProps> = ({
  documents,
  isLoading,
  openCheckNodeModal,
  removeNodeCheck,
  openEditNodeCheckModal,
}) => {
  return (
    <WithLoader isLoading={isLoading}>
      <Table
        elements={documents}
        headerStyles={styles}
        rowStyles={styles}
        columns={[
          {
            label: 'Дата',
            size: '0.7fr',
            render: (nodeCheck) =>
              moment(nodeCheck.checkingDate).format('DD.MM.YYYY'),
            css: (isHeader) => `${!isHeader && 'font-weight: 600'}`,
          },
          {
            label: '№',
            size: '0.4fr',
            render: (nodeCheck) => nodeCheck.registryNumber,
          },
          {
            label: 'Тип',
            size: '0.8fr',
            render: (nodeCheck) => CheckingActDocumentType[nodeCheck.checkType],
          },
          {
            label: 'Заключение',
            size: '2.5fr',
            render: (nodeCheck) => {
              const { checkingAct } = nodeCheck;
              if (!checkingAct) {
                return null;
              }
              const { name } = checkingAct;

              return (
                <DocumentInfoWrapper>
                  <GroupWrapper>
                    <DocumentIcon />
                    {name && <DocumentNameWrapper>{name}</DocumentNameWrapper>}
                    {!name && <NoDocumentText>Нет документа</NoDocumentText>}
                  </GroupWrapper>
                  <IconsWrapper>
                    <PencilIcon
                      onClick={() => openEditNodeCheckModal(nodeCheck)}
                    />
                    <TrashIcon
                      onClick={() => removeNodeCheck(checkingAct.id)}
                    />
                    <DownloadIcon onClick={() => saveDocument(checkingAct)} />
                  </IconsWrapper>
                </DocumentInfoWrapper>
              );
            },
          },
        ]}
      />
      <Button className="ant-btn-link" onClick={() => openCheckNodeModal()}>
        + Создать проверку
      </Button>
    </WithLoader>
  );
};
