import React, { useState, useEffect, createElement } from 'react';
import '../Task.css';
import { Menu, Dropdown, Button, Typography, Select, Progress, Input, Descriptions, Timeline, Table, Tag, Space, Breadcrumb, Steps, Divider, Pagination } from 'antd';
import 'antd/dist/antd.css';
import { HomeOutlined, UserOutlined, LeftOutlined } from '@ant-design/icons';
import { Comment, Avatar, Form, List } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const { Step } = Steps;


const { Text, Link, Title } = Typography;

const { Option } = Select;

export const Comments = () => {

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
      itemLayout="horizontal"
      renderItem={props => <Comment {...props} />}
    />
  );

  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary" className="comments__button">
          Добавить комментарий
      </Button>
      </Form.Item>
    </>
  );


  class CommentsResult extends React.Component {
    state = {
      comments: [],
      submitting: false,
      value: '',
    };

    handleSubmit = () => {
      if (!this.state.value) {
        return;
      }

      this.setState({
        submitting: true,
      });

      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          comments: [
            {
              author: 'Marat',
              avatar: 'https://satamalam.ru/public/icons/personal.svg',
              content: <p>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
            ...this.state.comments,
          ],
        });
      }, 1000);
    };

    handleChange = e => {
      this.setState({
        value: e.target.value,
      });
    };

    render() {
      const { comments, submitting, value } = this.state;

      return (
        <>
          {comments.length > 0 && <CommentList comments={comments} />}
          <Comment
            avatar={
              <Avatar
                src="https://satamalam.ru/public/icons/personal.svg"
                alt="Han Solo"
              />
            }
            content={
              <Editor
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                submitting={submitting}
                value={value}
              />
            }
          />
        </>
      );
    }
  }



  return (

    < div className="comments"  >
      <Title level={4}>Комментарии</Title>
      <CommentsResult />
    </div >


  );
}
