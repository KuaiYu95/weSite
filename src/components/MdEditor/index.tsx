
import * as React from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt(/* Markdown-it options */);

function handleEditorChange({ html, text }:any, props:any) {
  props.getValue(html, text)
}
export default (props:any) => {
  return (
    <MdEditor
      value={props.value}
      renderHTML={(text) => mdParser.render(text)}
      onChange={(e) => handleEditorChange(e, props)}
    />
  )
}