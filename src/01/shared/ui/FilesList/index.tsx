import React, { useMemo } from 'react';
import styled from 'styled-components';
import { ReactComponent as FileIcon } from './file.svg';
import { ReactComponent as UserIcon } from './user.svg';
import moment from 'moment';
import { Flex } from '../Layout/Flex';
import { MenuButtonTT } from '01/tt-components';
import { FileData } from '01/hooks/useFilesUpload';
import { DocumentResponse } from 'myApi';
import { ReactComponent as DropIcon } from './drop.svg';
import confirm from 'antd/lib/modal/confirm';

interface Props {
  files?: FileData[];
  removeFile?: (id: number, documentId?: number) => void;
  initialFiles?: DocumentResponse[];
  controlType?: 'CONTROL' | 'DELETE' | "NONE";
}

export const FilesList: React.FC<Props> = ({
  files,
  removeFile,
  initialFiles,
  controlType = 'CONTROL',
}) => {
  const initialFilesData: FileData[] = useMemo(
    () =>
      initialFiles?.map(
        (file): FileData => ({
          id: file.id,
          fileResponse: file,
          status: 'done',
        })
      ) || [],
    [initialFiles]
  );

  const filesToRender = [...(files || []), ...initialFilesData];

  if (!filesToRender) return null;

  const fileInfo = (file: DocumentResponse) => (
    <>
      <Wide>
        <Flex>
          <FileIcon style={{ margin: '5px 10px 0 0' }} />
          <FileName>{file.name}</FileName>
        </Flex>
        <FileType>{file.type}</FileType>
      </Wide>
      <Wide>
        <Flex>
          <UserIcon style={{ margin: '4px 10px 0 0' }} />
          {file.author}
        </Flex>
        <FileCreatedDate>
          {getFormattedDate(file.uploadingTime)}
        </FileCreatedDate>
      </Wide>
    </>
  );

  const pendingInfo = (
    <>
      <Wide>
        <LoadingContent style={{ width: 120 }} />
        <LoadingContent style={{ width: 80, marginTop: 5 }} />
      </Wide>
      <Wide>
        <LoadingContent style={{ width: 120 }} />
        <LoadingContent style={{ width: 80, marginTop: 5 }} />
      </Wide>
    </>
  );

  const controlFile = ({ fileResponse: file, id, status }: FileData) => {
    const loading = status === 'pending';

    const confirmDeletion = () =>
      confirm({
        title: 'Вы действительно хотите удалить этот файл?',
        onOk: () => removeFile && removeFile(id, file?.id),
        cancelText: 'Отмена',
        okText: 'Да',
        maskClosable: true,
      });

    const menuButtonArr = [
      {
        title: 'удалить',
        cb: () => removeFile && removeFile(id, file?.id),
        show: true,
        color: 'red',
        clickable: true,
      },
    ];

    const components = {
      CONTROL: (
        <MenuButtonTT
          disabled={loading}
          loading={loading}
          menuButtonArr={menuButtonArr}
        />
      ),
      DELETE: <StyledDropIcon onClick={confirmDeletion} />,
      NONE: null
    };

    const content = components[controlType];

    console.log(controlType, components, content);

    return <ControlPanelWrap>{content}</ControlPanelWrap>;
  };

  const renderFile = (fileData: FileData) => {
    const { fileResponse: file } = fileData;
    return (
      <FileItemWrap key={file?.id}>
        {file ? fileInfo(file) : pendingInfo}
        {controlFile(fileData)}
      </FileItemWrap>
    );
  };

  return <FilesWrap>{filesToRender.map(renderFile)}</FilesWrap>;
};

const getFormattedDate = (date: string) =>
  moment(date).format('DD.MM.YYYY HH:mm');

const ControlPanelWrap = styled.div`
  width: 33px;
`;

const StyledDropIcon = styled(DropIcon)`
  color: red;
  cursor: pointer;
  transform: scale(1.15) translateY(-9px);
`;

const FilesWrap = styled.div`
  width: 100%;
  margin-top: 10px;
`;

const Wide = styled.div`
  width: 100%;
`;

const FileItemWrap = styled.div`
  border-bottom: 1px solid #dcdee4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;

  :first-child {
    padding-top: 0;
  }
`;

const FileName = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const FileType = styled.div`
  margin-top: 10px;
  margin-left: 22px;
  font-size: 14px;
  color: rgba(39, 47, 90, 0.6);
`;

const FileCreatedDate = styled.div`
  margin-top: 10px;
  margin-left: 22px;
`;

const LoadingContent = styled.div`
  height: 15px;
  border-radius: 3px;
  background: linear-gradient(15deg, #c7c7c7, #f0f0f0);
`;
