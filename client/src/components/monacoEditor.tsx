import React, { useEffect, useRef } from 'react';
import Editor, { loader, OnChange } from '@monaco-editor/react';

interface IMonacoEditorProps {
  onSubmit: (value: string) => void;
}

const MonacoEditor = ({ onSubmit }: IMonacoEditorProps) => {

  const editorRef = useRef<any>(null);

  useEffect(() => {
    loader.init().then(monaco => {
      monaco.languages.register({ id: 'csharp' });
      monaco.languages.setMonarchTokensProvider('csharp', {
        tokenizer: {
          root: [
            [/\b(using|namespace|class|public|private|protected|static|void|int|string|new|return|for)\b/, 'keyword'],
            [/[{}]/, 'delimiter.bracket'],
            [/[a-z_$][\w$]*/, 'identifier'],
            [/\d+/, 'number'],
            [/\/\/.*$/, 'comment'],
          ],
        },
      });
    });
  }, []);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (editorRef.current) {
      const value = editorRef.current.getValue();
      onSubmit(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Editor
        height="100vh"
        defaultLanguage="csharp"
        defaultValue="// Type your C# code here"
        onMount={handleEditorDidMount}
        // theme="vs-dark"
        options={{
          fontSize: 20,
          minimap: { enabled: false },
          contextmenu: false
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MonacoEditor;

// for (int i = 0; i < 10; i++)
// {
//   Console.WriteLine("hi: " + i);
// }