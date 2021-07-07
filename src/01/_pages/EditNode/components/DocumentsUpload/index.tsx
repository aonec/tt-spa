import { Button } from 'antd';
import React, { useState } from 'react';

export const DocumentsUpload = () => {
  const [isModalOpen, setIsModalOpen] = useState();

  return (
    <>
      <Button type="link">+ Добавить документ</Button>
    </>
  );
};
