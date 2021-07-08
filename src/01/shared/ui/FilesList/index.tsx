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
  controlType?: 'CONTROL' | 'DELETE';
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
          id: Math.floor(Math.random() * 10 ** 8),
          fileResponse: file,
          status: 'done',
        })
      ) || [],
    [initialFiles]
  );

  const renderFiles = [...(files || []), ...initialFilesData];

  if (!renderFiles) return null;

  return (
    <FilesWrap>
      {renderFiles.map(({ fileResponse: file, id, status }) => {
        const loading = status === 'pending';
        return (
          <FileItemWrap key={file?.id}>
            {file ? (
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
            ) : (
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
            )}
            <div style={{ width: 33 }}>
              {controlType === 'CONTROL' ? (
                <MenuButtonTT
                  disabled={loading}
                  loading={loading}
                  menuButtonArr={[
                    {
                      title: 'удалить',
                      cb: () => removeFile && removeFile(id, file?.id),
                      show: true,
                      color: 'red',
                      clickable: true,
                    },
                  ]}
                />
              ) : (
                controlType === 'DELETE' && (
                  <DropIcon
                    style={{
                      color: 'red',
                      cursor: 'pointer',
                      transform: 'scale(1.15) translateY(-9px)',
                    }}
                    onClick={() =>
                      confirm({
                        title: 'Вы действительно хотите удалить этот файл?',
                        onOk: () => removeFile && removeFile(id, file?.id),
                        cancelText: 'Отмена',
                        okText: 'Да',
                        maskClosable: true,
                      })
                    }
                  />
                )
              )}
            </div>
          </FileItemWrap>
        );
      })}
    </FilesWrap>
  );
};

const getFormattedDate = (date: string) =>
  moment(date).format('DD.MM.YYYY HH:mm');

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
