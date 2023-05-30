import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { useState } from 'react';

export default function Demo() {
  const [discription, setdiscription] = useState();
  return (
    <>
      <CKEditor editor={Editor} data="<p>Hello</p>" id="discription" name="discription"
        onReady={(editor) => {
          // console.log('editor is readt', editor);
        }}
        onChange={(e, editor) => {
          const data = editor.getData();
          setdiscription(data);
          // console.log({ e, editor, data });
        }}
        onBlur={(e, editor) => {
          // console.log('blur', editor);
        }}
        onFocus={(e, editor) => {
          // console.log('Focus', editor);
        }} />

        {
          discription && discription
        }
    </>
  )
}
