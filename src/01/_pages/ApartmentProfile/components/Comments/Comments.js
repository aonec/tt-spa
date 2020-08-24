import React from 'react'
import { Comment, Avatar, Form, List, Input } from 'antd';
import moment from 'moment';
import { UserOutlined } from '@ant-design/icons';
import { Title, Button } from '../../components'

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'коментарий'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item style={{
      margin: '0',
      padding: '0'
    }}>
      <TextArea rows={4} onChange={onChange} value={value} style={{ height: '32px' }} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Добавить комментарий
      </Button>
    </Form.Item>
  </>
);

export class Comments extends React.Component {
  state = {
    comments: [{
      author: 'Тransparent Technologies',
      // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      avatar: <Avatar
      src={require("../../../../../public/icons/personal.svg")}
      alt="Тransparent Technologies"
    />,
      content: <p>Выполнить Задачи с объектом</p>,
      datetime: moment().fromNow(),
    }],
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
            author: 'Тransparent Technologies',
            // avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            avatar: <Avatar
              src={require("../../../../../public/icons/personal.svg")}
              alt="Тransparent Technologies"
            />,
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
          ...this.state.comments,
        ],
      });
      console.log(this.state.comments)
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
        <Title size="24">Комментарии</Title>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={
            <Avatar
              // src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              src={require("../../../../../public/icons/personal.svg")}
              alt="Тransparent Technologies"
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

