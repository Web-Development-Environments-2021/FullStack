import logo from './logo.svg';
import './App.css';
import * as React from 'react';

import { Button } from '@mui/material';
import { purple, red } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { sizing } from '@mui/system';
import background from './soccer_field.jpeg'
import { Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';


const options = [1,2,3,4,5,6,7,8,9];


function App() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div className="App" style={{ backgroundImage: `url(${logo})` }}>
      <div className='container' style={{
        position: 'absolute', 
        left: '50%', 
        top: '30%',
        transform: 'translate(-50%, -50%)',
        backgroundColor:"white",
        
    }} >
        <Button variant="contained" color="secondary" >players</Button>
        <Button variant="contained" color="secondary" >teams</Button>
        <TextField fullWidth label="search" id="fullWidth" />
        <Grid container spacing={2} >
        <Grid item xs={12}>
        <p>Filter by:</p>
        </Grid>
          <Grid item xs={6}>
          <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="position" />}
      />  </Grid>
          <Grid item xs={6}>
          <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={["team1","team2"]}
        sx={{ width: 200 }}
        renderInput={(params) => <TextField {...params} label="team" />}
      />  </Grid>
        </Grid>

        </div>
    </div>
  );
}

export default App;
