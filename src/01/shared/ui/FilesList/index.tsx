import { DocumentResponse } from 'myApi';
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FileIcon } from './file.svg';
import { ReactComponent as UserIcon } from './user.svg';
import moment from 'moment';
import { Flex } from '../Layout/Flex';
import { MenuButtonTT } from '01/tt-components';

interface Props {
  files: DocumentResponse[];
  removeFile: (id: number) => void;
}

const getFormattedDate = (date: string) =>
  moment(date).format('DD.MM.YYYY HH:mm');

export const FilesList: React.FC<Props> = ({ files }) => {
  return (
    <FilesWrap>
      {files.map((file) => (
        <FileItemWrap key={file.id}>
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
          <div style={{ width: 33 }}>
            <MenuButtonTT
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
                  cb: () => {},
                  show: true,
                  color: 'red',
                  clickable: true,
                },
              ]}
            />
          </div>
        </FileItemWrap>
      ))}
    </FilesWrap>
  );
};

const FilesWrap = styled.div`
  padding: 15px;
  border-bottom: 1px solid #dcdee4;
  display: grid;
  grid: minmax(200px, max-content), minmax(200px, max-content),
    minmax(200px, max-content);
  width: 100%;
`;

const Wide = styled.div`
  width: 100%;
`;

const FileItemWrap = styled.div`
  display: flex;
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
