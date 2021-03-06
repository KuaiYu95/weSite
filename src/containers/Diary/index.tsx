import React from 'react'
import { Collapse, Button, Input, Form, Icon, notification, Empty } from 'antd';
import { addDiary, getDiary } from '../../api'
import './index.less'

const { Panel } = Collapse;
const { Item } = Form;
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 22 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
      offset: 18,
    },
  },
};

class DiaryHtml extends React.Component<any, any> {
  state = {
    isWrite: false,
    diarys: [],
    title: '',
    content: '',
    loading: false,
    notShow: false,
  }

  componentDidMount() {
    let confirm = localStorage.getItem('confirm')
    if (confirm !== '0913') {
      this.setState({ notShow: true })
    } else {
      this.getData()
    }
  }

  isWrite = () => {
    let { isWrite } = this.state
    this.setState({
      isWrite: !isWrite
    })
  }

  getData = () => {
    getDiary({}).then((res: any) => {
      let { success, data } = res.data
      let diarys = success ? data.map((it: any, i: number) => {
        let html = <div style={{ padding: '16px 24px', backgroundColor: '#FCFCF4', color: '#7C7C7C' }} key={i + 's'}>
          {it.content.split('\n').map((con: string, idx: number) => {
            return <p style={{ textIndent: '2em', maxWidth: 800, textAlign: 'left' }} key={idx + 't'} >{con}</p>
          })}
        </div>
        return { ...it, html }
      }) : []
      success && this.setState({ diarys })
    })
  }

  submit = (e: any) => {
    let { diarys } = this.state
    this.setState({ loading: true })
    e.preventDefault();
    this.props.form.validateFields((err: any, values: any) => {
      if (!err) {
        let time = new Date().getTime()
        let { title, content } = values
        addDiary({ title, content, time }).then((res: any) => {
          let { success } = res.data
          notification['success']({
            message: '操作提示',
            description: `添加成功，日记数量增至${diarys.length + 1}篇`,
            duration: 2
          })
          success && this.setState({
            title: '',
            content: '',
            loading: false,
            isWrite: false
          }, () => { this.getData() })
        }).catch(() => {
          notification['error']({
            message: '操作提示',
            description: '添加失败，返回报错',
            duration: 2
          })
          this.setState({ loading: false })
        })
      } else {
        notification['error']({
          message: '操作提示',
          description: '添加失败，表单报错',
          duration: 2
        })
        this.setState({ loading: false })
      }
    });
  }

  render() {
    let { isWrite, title, content, diarys, loading, notShow } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <>
        {!notShow ? <div className="daily">
          <p>
            <Button type="primary" onClick={this.isWrite}>
              {isWrite && <Icon type="left" />}
              {isWrite ? '日记列表' : '每日一记'}
              {!isWrite && <Icon type="right" />}
            </Button>
          </p>
          {
            isWrite && <div className="form">
              <Form {...formItemLayout} onSubmit={this.submit}>
                <Item label="标题" key='title'>
                  {getFieldDecorator('title', {
                    initialValue: title,
                    rules: [
                      {
                        required: true,
                        message: '请输入标题',
                      },
                    ],
                  })(<Input size="large" autoComplete="off" />)}
                </Item>
                <Item label="内容" key='content'>
                  {getFieldDecorator('content', {
                    initialValue: content,
                    rules: [
                      {
                        required: true,
                        message: '请输入内容',
                      },
                    ],
                  })(<TextArea rows={17} />)}
                </Item>
                <Item {...tailFormItemLayout} key='sub'>
                  <Button type="primary" htmlType="submit" loading={loading}>
                    <Icon type="save" />提交
                </Button>
                </Item>
              </Form>
            </div>
          }
          {!isWrite && <Collapse bordered={false} accordion expandIcon={({ isActive }) => <Icon type="caret-right" rotate={isActive ? 90 : 0} />}>
            {diarys.map((it: any) => {
              return <Panel header={it.title} key={it._id} extra={new Date(+it.time).toLocaleDateString()}>
                {it.html}
              </Panel>
            })}
          </Collapse>}
        </div> : <Empty description="对不起，您没有权限" style={{ color: '#fff', marginTop: '20vh' }} />}
      </>
    )
  }
}

const Diary = Form.create({ name: 'diary' })(DiaryHtml);
export default Diary