import React from 'react';
import MonacoEditor from './components/monacoEditor';
import Grid from '@mui/material/Grid2';
import { Paper, styled } from '@mui/material';
import ButtonAppBar from './components/button-app-bar';

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

  const handleEditorSubmit = (value: string) => {
    console.log('Submitted content:', value);
  };


  return (
    <div>
      <ButtonAppBar/>
      <Grid container spacing={1} columns={2}>
        <Grid size={1}>
          <MonacoEditor onSubmit={handleEditorSubmit}/>
        </Grid>
        <Grid size={1}>
          <Item>Hello, Sharp!</Item>
        </Grid>
      </Grid>
    </div>
  );
};

export default App;