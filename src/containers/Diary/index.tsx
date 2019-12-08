import React from 'react'
import { Collapse, Button, Input, Form, Icon, notification } from 'antd';
import { addDiary, getDiary } from '../../api'
import './index.less'

const { Panel } = Collapse;
const { Item } = Form;
const { TextArea } = Input

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
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
    loading: false
  }

  componentDidMount() {
    this.getData()
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
        let html = <div style={{ padding: '16px 24px', backgroundColor: 'rgba(0, 0, 0, 0.05)' }} key={i + 's'}>
          {it.content.split('---').map((con: string, idx: number) => {
            return <p style={{ textIndent: '2em' }} key={idx + 't'} >{con}</p>
          })}
        </div>
        return { ...it, html }
      }) : []
      success && this.setState({ diarys })
    }).catch(() => {
      notification['error']({
        message: '操作提示',
        description: '添加失败，返回报错',
        duration: 2
      })
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
    let { isWrite, title, content, diarys, loading } = this.state
    const { getFieldDecorator } = this.props.form

    return (
      <div className="daily">
        <p>
          <Button onClick={this.isWrite}>
            {isWrite && <Icon type="left" />}
            {isWrite ? '日记列表' : '每日一记'}
            {!isWrite && <Icon type="right" />}
          </Button>
        </p>
        {
          isWrite && <div>
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
                <Button htmlType="submit" loading={loading}>
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
      </div>
    )
  }
}

const Diary = Form.create({ name: 'diary' })(DiaryHtml);
export default Diary