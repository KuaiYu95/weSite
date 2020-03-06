import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Form } from 'antd';
interface IProps {
  value: string
}
class CodeBlock extends React.PureComponent<IProps> {
  render() {
    let { value } = this.props
    return (
      <SyntaxHighlighter language="" style={tomorrowNightEighties}>
        {value}
      </SyntaxHighlighter>
    );
  }
}
export default Form.create()(CodeBlock);