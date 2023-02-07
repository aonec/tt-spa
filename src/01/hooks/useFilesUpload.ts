import { uploadFile } from '01/_api/upload';
import { useState } from 'react';
import { DocumentResponse } from './../../myApi';

export interface FileData {
  id: number;
  status?: 'done' | 'failed' | 'pending';
  fileResponse: DocumentResponse | null;
  error?: Error;
  onRemove?(): void;
}

interface FileUploader {
  files: FileData[];
  addFile: (file: File) => Promise<void>;
  removeFile: (id: number) => Promise<void>;
  pendingProcessing: boolean;
}

export function useFilesUpload(
  onChange?: (files: FileData[]) => void,
  type?: string,
  filesInit?: FileData[],
): FileUploader {
  const [files, setFiles] = useState<FileData[]>(filesInit || []);
  const pendingProcessing = files.some((elem) => elem.status === 'pending');

  const rewriteFile = (id: number, callback: (file: FileData) => FileData) => {
    setFiles((prev) => {
      const documents = rewriteArrayElem(
        prev,
        (file) => file.id === id,
        callback,
      );

      onChange && onChange(documents);
      return documents;
    });
  };

  async function addFile(file: File) {
    const id = new Date().getTime();

    const newFilesListItem: FileData = {
      id,
      fileResponse: null,
      status: 'pending',
    };

    setFiles((prev) => {
      const documents = [newFilesListItem, ...prev];
      onChange && onChange(documents);

      return documents;
    });

    try {
      const res = await uploadFile(file, type);

      rewriteFile(id, (file) => ({
        ...file,
        fileResponse: res.newFile,
        status: 'done',
      }));
    } catch (e) {
      rewriteFile(id, (file) => ({
        ...file,
        status: 'failed',
        error: e as Error,
      }));
    }
  }

  async function removeFile(id: number) {
    const fileId = files.find((elem) => elem.id === id)?.fileResponse?.id;

    if (!fileId) return;

    try {
      rewriteFile(id, (file) => ({
        ...file,
        loading: true,
        status: 'pending',
      }));

      // await deleteDoc(fileId);

      setFiles((prev) => {
        const newFiles = prev.filter((elem) => elem.id !== id);
        onChange && onChange(newFiles);

        return newFiles;
      });
    } catch (e) {
      rewriteFile(id, (file) => ({
        ...file,
        status: 'failed',
        error: e as Error,
      }));
    }
  }

  return {
    files,
    addFile,
    removeFile,
    pendingProcessing,
  };
}

const rewriteArrayElem = <T>(
  prev: T[],
  checker: (elem: T) => boolean,
  getNewElem: (elem: T) => T,
): T[] => prev.map((elem) => (checker(elem) ? getNewElem(elem) : elem));
