// import React, { useEffect, useRef } from 'react';
// import Grid from '@mui/material/Grid2';
// import { Paper, styled } from '@mui/material';
// import ButtonAppBar from './components/button-app-bar';
// import Button from '@mui/material/Button';
// import Editor, { loader } from '@monaco-editor/react';
//
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.primary,
//   fontSize: '20px',
//   height: '100vh',
//   ...theme.applyStyles('dark', {
//     backgroundColor: '#1A2027',
//   }),
// }));
//
// const App = () => {
//
//   const handleEditorSubmit = (value: string) => {
//     console.log('Submitted content:', value);
//   };
//
//   const editorRef = useRef<any>(null);
//
//   useEffect(() => {
//     loader.init().then(monaco => {
//       monaco.languages.register({ id: 'csharp' });
//       monaco.languages.setMonarchTokensProvider('csharp', {
//         tokenizer: {
//           root: [
//             [/\b(using|namespace|class|public|private|protected|static|void|int|string|new|return|for)\b/, 'keyword'],
//             [/[{}]/, 'delimiter.bracket'],
//             [/[a-z_$][\w$]*/, 'identifier'],
//             [/\d+/, 'number'],
//             [/\/\/.*$/, 'comment'],
//           ],
//         },
//       });
//     });
//   }, []);
//
//   const handleEditorDidMount = (editor: any) => {
//     editorRef.current = editor;
//   };
//
//   const handleSubmit = (event: React.FormEvent) => {
//     event.preventDefault();
//     if (editorRef.current) {
//       const value = editorRef.current.getValue();
//       onSubmit(value);
//     }
//   };
//
//   return (
//     <div>
//       <ButtonAppBar>
//         <Button color="success" variant="contained">Compile</Button>
//         <Button variant="outlined" color="success" disabled>History</Button>
//       </ButtonAppBar>
//       <Grid container spacing={1} columns={2}>
//         <Grid size={1}>
//           <form onSubmit={}>
//             <Editor
//               height="100vh"
//               defaultLanguage="csharp"
//               defaultValue="// Type your C# code here"
//               onMount={handleEditorDidMount}
//               // theme="vs-dark"
//               options={{
//                 fontSize: 20,
//                 minimap: { enabled: false },
//                 contextmenu: false
//               }}
//             />
//           </form>
//         </Grid>
//         <Grid size={1}>
//           <Item>Hello, Sharp!</Item>
//         </Grid>
//       </Grid>
//     </div>
//   );
// };
//
// export default App;

import React, { useEffect, useRef } from 'react';
import Grid from '@mui/material/Grid2';
import { Paper, styled } from '@mui/material';
import ButtonAppBar from './components/button-app-bar';
import Button from '@mui/material/Button';
import Editor, { loader } from '@monaco-editor/react';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.primary,
  fontSize: '20px',
  height: '100vh',
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const App = () => {
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
      console.log('Submitted content:', value);
    }
  };

  const handleCompileClick = () => {
    const form = document.getElementById('editorForm') as HTMLFormElement;
    if (form) {
      form.requestSubmit();
    }
  };

  return (
    <div>
      <ButtonAppBar>
        <Button color="success" variant="contained" onClick={handleCompileClick}>Compile</Button>
        <Button variant="outlined" color="success" disabled>History</Button>
      </ButtonAppBar>
      <Grid container spacing={1} columns={2}>
        <Grid size={1}>
          <form id="editorForm" onSubmit={handleSubmit}>
            <Editor
              height="100vh"
              defaultLanguage="csharp"
              defaultValue="// Type your C# code here"
              onMount={handleEditorDidMount}
              options={{
                fontSize: 20,
                minimap: { enabled: false },
                contextmenu: false,
              }}
            />
          </form>
        </Grid>
        <Grid size={1}>
          <Item>Hello, Sharp!</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;