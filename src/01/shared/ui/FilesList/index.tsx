import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FileIcon } from './file.svg';
import { ReactComponent as UserIcon } from './user.svg';
import moment from 'moment';
import { Flex } from '../Layout/Flex';
import { MenuButtonTT } from '01/tt-components';
import { FileData } from '01/hooks/useFilesUpload';

interface Props {
  files: FileData[];
  removeFile: (id: number) => void;
}

const getFormattedDate = (date: string) =>
  moment(date).format('DD.MM.YYYY HH:mm');

export const FilesList: React.FC<Props> = ({ files, removeFile }) => {
  if (!files) return null;
  return (
    <FilesWrap>
      {files.map(({ fileResponse: file, id, status }) => {
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
              <MenuButtonTT
                disabled={loading}
                loading={loading}
                menuButtonArr={[
                  {
                    title: 'скачать',
                    cb: () => {},
                    show: true,
                    color: 'default',
                    clickable: true,
                  },
                  {
                    title: 'удалить',
                    cb: () => removeFile(id),
                    show: true,
                    color: 'red',
                    clickable: true,
                  },
                ]}
              />
            </div>
          </FileItemWrap>
        );
      })}
    </FilesWrap>
  );
};

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
