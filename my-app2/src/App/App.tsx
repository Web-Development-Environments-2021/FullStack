import './App.css';
import * as React from 'react';
import { Button} from '@mui/material';
import { Grid } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { MenuItem } from '@mui/material';
import { FormControl } from '@mui/material';
import PlayerPreview from './PlayerPreview/playerPreview';
import TeamPreview from './TeamPreview/TeamPreview';
import axios from 'axios';
import { requestData } from '../Interfaces';
import { playerInfo } from '../Interfaces';
import { teamInfo } from '../Interfaces';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 58,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? 'rgb(240, 189, 94)' :'rgb(243, 204, 132)',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? 'orange' : 'orange',
    width: 30,
    height: 30,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ?'rgb(240, 189, 94)' :'rgb(243, 204, 132)',
    borderRadius: 20 / 2,
  },
}));
const positionOptions = ["Position",1,2,3,4,5,6,7,8,9];
const teamsOptions=['Team','København', 'Silkeborg', 'Brøndby', 'SønderjyskE', 'Midtjylland', 'AaB', 'OB', 'Randers', 'Nordsjælland', 'Viborg', 'AGF', 'Vejle'];

function App() {
  // const defaultPlayer:playerPreviewProps ={playersData:[]};

  const [players,setplayers]=  React.useState(new Array<playerInfo>());
  const [allPlayers,setAllPlayers]=  React.useState(new Array<playerInfo>());
  const [teams,setteams]=  React.useState(new Array<teamInfo>());
  const [allTeams,setAllTeams]=  React.useState(new Array<teamInfo>());
  const [isSearch,setisSearch]=React.useState(false);
  const [pos, setpos] = React.useState('Position');
  const [team, setTeam] = React.useState('Team');
  const [searchField, setSearchField] = React.useState("");
  const [player_team, setPlayerTeam] = React.useState('  Search Players');

  React.useEffect(() => {
    axios
      .get<requestData>("http://localhost:3000/Team/AllTeamsDetails")
      .then(response => {
        setAllPlayers(JSON.parse(JSON.stringify(response.data.players,null,2)));
        setAllTeams(JSON.parse(JSON.stringify(response.data.teams,null,2)));
      });}, []);
    
    const handleChangePos = (event: SelectChangeEvent) => {
      setpos(event.target.value as string);
    };
    const handleChangeTeam = (event: SelectChangeEvent) => {
      setTeam(event.target.value as string);
    };
    const handleChangeSearch = (e: SelectChangeEvent) => {
      setSearchField(e.target.value);
    };
    function chooseSearch(){
      if (player_team=="  Search Players"){
        setPlayerTeam('  Search Teams')
      }
      else{
        setPlayerTeam('  Search Players')
      }
    }
    function onSearch(){
      if (player_team=="  Search Players"){
        var temp_players: playerInfo[] = [];

        allPlayers.map((player)=>{
          var good=true;
          if (player.name.toLowerCase().includes(searchField)){
            if (pos!='Position' && player.position!=null && player.position.toString()!=pos){
                good=false;
              }
            if (team!='Team' && player.teamName!=team){
              good=false;
            }
            if (good){
              temp_players.push(player);
            }
          }
        })
        setplayers(temp_players)
      }
      else{
        var temp_teams: teamInfo[] = [];
        allTeams.map((team)=>{
        if (team.name.toLowerCase().includes(searchField)){
          temp_teams.push(team);
        }})
        setteams(temp_teams);
      }
      setisSearch(true);
      setSearchField("");
      setpos("Position");
      setTeam("Team");
    }

  const styles = {
    "&.MuiButton-root": {
      backgroundColor:"orange"
    },
    "&.MuiButton-text": {
      color: "grey"
    },
    "&.MuiButton-contained": {
      color: "black"
    },
    "&.MuiButton-outlined": {
      color: "brown"
    }
  };

  return (
    <div className="App" >
    <div className='container' >
    <div className="containSearch">
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">    
          <Stack direction="row"  spacing={1} alignItems="center">
            <Typography style={{fontFamily:"Aladin,cursive"}} >Teams</Typography>
              <MaterialUISwitch sx={{ m: 1 }} defaultChecked onClick={chooseSearch}/>
            <Typography style={{fontFamily:"Aladin,cursive"}}>Players</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <input className="inputField" type = "search" placeholder = {player_team} onChange = {handleChangeSearch} value={searchField}/>
        </Grid>
        {(player_team=='  Search Players')?(
          <Grid container spacing={0} className="containFilter" >
            <Grid item xs={6}>
              <FormControl  className="selectButton">
                <Select 
                style={{height:30,borderRadius:15,width:150,fontFamily:"Aladin,cursiv"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={pos}
                  onChange={handleChangePos}
                >
                {positionOptions.map((p) => (
                    <MenuItem style={{height:30,fontFamily:"Aladin,cursiv"}} value={p}>{p}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl className="selectButton" >
                <Select 
                style={{height:30,borderRadius:15,width:150,fontFamily:"Aladin,cursiv"}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={team}
                  onChange={handleChangeTeam}>
                {teamsOptions.map((t) => (
                    <MenuItem style={{height:30,fontFamily:"Aladin,cursiv"}} value={t}>{t}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>):(<></>)}
        <Grid item xs={12}>
          <Button sx={styles} id='searchButton' variant="contained" onClick={onSearch} >Search</Button>
        </Grid>
      </div>
      {isSearch?(
        <Grid className="componenet_grid" container spacing={1} style={{maxHeight: 407,width:"92%",display:"inline-flex",marginTop:"4px", overflow: 'auto'}}>
        {(player_team=="  Search Players")?(
          players.map((player) => (
            <Grid item xs={1.7}>
              <PlayerPreview  player_id={player.player_id} position={player.position} name={player.name} picture={player.picture} teamName={player.teamName} key={`${player.player_id}`}/>
            </Grid>
          ))):
          (teams.map((team) => (
            <Grid item xs={2}>
              <TeamPreview  logo={team.logo} name={team.name} id={team.id} key={`${team.id}`}/>
            </Grid>
          )))}
        </Grid>):(<></>) }
      </div>
  </div>
  );
}

export default App;
