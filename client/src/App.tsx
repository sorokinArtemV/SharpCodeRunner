import React, {useEffect, useRef, useState} from 'react';
import Grid from '@mui/material/Grid2';
import {CircularProgress, Paper, styled} from '@mui/material';
import ButtonAppBar from './components/button-app-bar';
import Button from '@mui/material/Button';
import Editor, {loader} from '@monaco-editor/react';

const Item = styled(Paper)(({theme}) => ({
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
    const [output, setOutput] = useState('Hello, Sharp!');
    const [isLoading, setIsLoading] = useState(false);
    const [isResultError, setIsResultError] = useState(false);
    const editorRef = useRef<any>(null);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        loader.init().then(monaco => {
            monaco.languages.register({id: 'csharp'});
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

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (editorRef.current) {
            const value = editorRef.current.getValue();
            console.log('Submitted content:', value);

            try {
                setIsLoading(true);
                setIsResultError(false);

                const response = await fetch('http://localhost:8080/api/codeexecution/execute', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({code: value}),
                });

                if (!response.ok) throw new Error('Network response was not ok');

                const result = await response.json();
                console.log('Success:', result);

                if (result.errorMessage) {
                    setOutput(result.errorMessage);
                    setIsResultError(true);
                } else {
                    setOutput(result.result);
                }
            } catch (error) {
                console.error('Error:', error);
                setOutput('An error occurred while processing your request.');
            } finally {
                setIsLoading(false);
            }
        }
    };

    const handleCompileClick = () => {
        if (formRef.current) {
            formRef.current.requestSubmit();
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
                    <form id="editorForm" ref={formRef} onSubmit={handleSubmit}>
                        <Editor
                            height="100vh"
                            defaultLanguage="csharp"
                            defaultValue="// Type your C# code here"
                            onMount={handleEditorDidMount}
                            options={{
                                fontSize: 20,
                                minimap: {enabled: false},
                                contextmenu: false,
                            }}
                        />
                    </form>
                </Grid>
                <Grid size={1}>
                    <Item style={isResultError ? {color: 'red'} : {}}>
                        {isLoading ? <CircularProgress/> : output}
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
};

export default App;


// for (int i = 0; i < 3; i++)
// {
//   Console.WriteLine("hi: " + i);
// }