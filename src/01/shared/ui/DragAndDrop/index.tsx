import React from 'react';
import styled from 'styled-components';
import { ReactComponent as FileUploadIcon } from './upload.svg';

interface Props {
  fileHandler(files: FileList): void;
  supportingFormats?: string;
  accept?: string;
  uniqId: string;
  text?: string;
  style?: React.CSSProperties;
}

export const DragAndDrop: React.FC<Props> = (props) => {
  const { fileHandler, accept, uniqId, text, style } = props;
  const id = `file-input-${uniqId || ''}`;
  return (
    <>
      <input
        id={id}
        type="file"
        name="file"
        multiple={false}
        value=""
        onChange={(event) =>
          event.target.files && fileHandler(event.target.files)
        }
        style={{ display: 'none' }}
        accept={accept}
      />
      <label htmlFor={id} style={{ margin: 0, width: '100%' }}>
        <DragAndDropContainer
          onDragOver={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          onDrop={(event) => {
            event.preventDefault();
            event.stopPropagation();
            fileHandler(event.dataTransfer.files);
          }}
          style={{
            margin: '0',
            ...style,
          }}
        >
          <div>
            <Center>
              <UploadFileIconContainer>
                <FileUploadIcon />
              </UploadFileIconContainer>
            </Center>
            <div>
              {text
                ? text
                : 'Перетащите ваши файлы в эту область или нажмите для выбора'}
            </div>
          </div>
        </DragAndDropContainer>
      </label>
    </>
  );
};

const Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadFileIconContainer = styled(Center)`
  width: 33px;
  height: 33px;
  border-radius: 50%;
  color: #3a3a3a;
  background-color: #e6e6e6;
  font-size: 25px;
`;

const DragAndDropContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #dcdee4;
  height: 100px;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.3s;
  cursor: pointer;
  stroke-dasharray: 10px;

  :hover {
    border-color: #428dd8;
    background-color: #eaf5ff;
  }
`;
