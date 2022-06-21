import { uploadFile } from '01/_api/upload';
import { useEffect, useState } from 'react';
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
  clearFiles: () => void;
  pendingProcessing: boolean;
}

export function useFilesUpload(
  onChange?: (files: FileData[]) => void,
  type?: string
): FileUploader {
  const [files, setFiles] = useState<FileData[]>([]);
  const pendingProcessing = files.some((elem) => elem.status === 'pending');

  const rewriteFile = (id: number, callback: (file: FileData) => FileData) => {
    setFiles((prev) =>
      rewriteArrayElem(prev, (file) => file.id === id, callback)
    );
  };

  useEffect(() => onChange && onChange(files), [files]);

  async function addFile(file: File) {
    const id = new Date().getTime();

    const newFilesListItem: FileData = {
      id,
      fileResponse: null,
      status: 'pending',
    };

    setFiles((prev) => [newFilesListItem, ...prev]);

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
    clearFiles: () => setFiles([]),
    pendingProcessing,
  };
}

const rewriteArrayElem = <T>(
  prev: T[],
  checker: (elem: T) => boolean,
  getNewElem: (elem: T) => T
): T[] => prev.map((elem) => (checker(elem) ? getNewElem(elem) : elem));
