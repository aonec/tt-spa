import { deleteDoc } from '01/_api/task_profile_page';
import { uploadFile } from '01/_api/upload';
import { useState } from 'react';
import { DocumentResponse } from './../../myApi';

export interface FileData {
  id: number;
  loading: boolean;
  status?: 'done' | 'failed' | 'pending';
  fileResponse: DocumentResponse | null;
  error?: string;
}

interface FileUploader {
  files: FileData[];
  addFile: (file: File) => Promise<void>;
  removeFile: (id: number) => Promise<void>;
}

export function useFilesUpload(): FileUploader {
  const [files, setFiles] = useState<FileData[]>([]);

  const rewriteFile = (id: number, callback: (file: FileData) => FileData) => {
    setFiles((prev) =>
      rewriteArrayElem(prev, (file) => file.id === id, callback),
    );
  };

  async function addFile(file: File) {
    const id = new Date().getTime();

    const newFilesListItem: FileData = {
      loading: true,
      id,
      fileResponse: null,
      status: 'pending',
    };

    setFiles((prev) => [newFilesListItem, ...prev]);

    try {
      const res = await uploadFile(file);

      rewriteFile(id, (file) => ({
        ...file,
        fileResponse: res.newFile,
        loading: false,
        status: 'done',
      }));
    } catch (e) {
      rewriteFile(id, (file) => ({
        ...file,
        loading: false,
        status: 'failed',
        error: e.message,
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

      await deleteDoc(fileId);

      setFiles((prev) => prev.filter((elem) => elem.id !== id));
    } catch (e) {
      rewriteFile(id, (file) => ({
        ...file,
        loading: false,
        status: 'done',
        error: e.message,
      }));
    }
  }

  return { files, addFile, removeFile };
}

const rewriteArrayElem = <T>(
  prev: T[],
  checker: (elem: T) => boolean,
  getNewElem: (elem: T) => T,
): T[] => prev.map((elem) => (checker(elem) ? getNewElem(elem) : elem));
