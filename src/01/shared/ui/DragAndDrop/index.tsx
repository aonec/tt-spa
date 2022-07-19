import React, { useCallback } from 'react';
import styled from 'styled-components';
import { ReactComponent as FileUploadIcon } from './upload.svg';

interface Props {
  fileHandler: (files: FileList) => void;
  accept?: string;
  uniqId: string;
  text?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export const DragAndDrop: React.FC<Props> = (props) => {
  const { fileHandler, accept, uniqId, text, style, disabled = false } = props;
  const id = `file-input-${uniqId}`;

  const handleFile = useCallback(
    (files: FileList) => {
      if (disabled) return;

      fileHandler(files);
    },
    [fileHandler, disabled]
  );

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    },
    []
  );

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
      handleFile(event.dataTransfer.files);
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) handleFile(event.target.files);
    },
    [handleFile]
  );

  return (
    <>
      <input
        id={id}
        type="file"
        name="file"
        multiple={false}
        value=""
        onChange={handleChange}
        style={{ display: 'none' }}
        accept={accept}
      />
      <label htmlFor={id} style={{ margin: 0, width: '100%' }}>
        <DragAndDropContainer
          disabled={disabled}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
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
            <div style={{ marginTop: 4 }}>
              {text ||
                'Перетащите ваши файлы в эту область или нажмите для выбора'}
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
  color: #585858;
  background-color: #00000015;
  font-size: 25px;
`;

const DragAndDropContainer = styled.div<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #dcdee4;
  height: 105px;
  border-radius: 4px;
  font-size: 16px;
  transition: 0.3s;
  cursor: pointer;
  stroke-dasharray: 10px;

  ${({ disabled }) =>
    disabled
      ? `
  background: #efefef;
    `
      : `
  &:hover {
    border-color: #428dd8;
    background-color: #eaf5ff;
  }
    `}
`;
