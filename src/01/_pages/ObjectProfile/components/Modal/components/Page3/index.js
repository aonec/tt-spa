import React from "react";
import './page3.scss'

import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info){
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} документ загружен.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} ошибка загрузки.`);
    }
  },
};


export const Page3 = () => {
  console.log("Page3")
  return (
    <div>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">Добавьте акт выполненных работ</p>
        {/*<p className="ant-upload-hint">ant-upload-hint</p>*/}
      </Dragger>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">Добавьте паспорт прибора</p>
        {/*<p className="ant-upload-hint">ant-upload-hint</p>*/}
      </Dragger>

      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined/>
        </p>
        <p className="ant-upload-text">Добавьте свидетельство о поверке прибора</p>
        {/*<p className="ant-upload-hint">ant-upload-hint</p>*/}
      </Dragger>


      {/*<Dragger {...props}>*/}
      {/*  <p className="ant-upload-drag-icon">*/}
      {/*    <InboxOutlined />*/}
      {/*  </p>*/}
      {/*  <p className="ant-upload-text">Click or drag file to this area to upload</p>*/}
      {/*  <p className="ant-upload-hint">*/}
      {/*    Support for a single or bulk upload. Strictly prohibit from uploading company data or other*/}
      {/*    band files*/}
      {/*  </p>*/}
      {/*</Dragger>*/}
    </div>
  )
}

export default Page3;