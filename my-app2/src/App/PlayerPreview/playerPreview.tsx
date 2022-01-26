import React,{FC} from 'react';
import "./PlayerPreview.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { playerInfo } from '../../Interfaces';
const PlayerPreview: FC<playerInfo> = (props: playerInfo) => {
  const { player_id,position,name,picture,teamName} = props;

  return (
    <Card className="playercard"  sx={{ width: 140, height:170 }} style={{ borderRadius:"20px" }}>
      <CardMedia className='imgcard'
        component="img"
        image={picture}
        sx={{ width: 80 }}
        style={{display:"inline",marginTop:8,marginBottom:-18}}

      />
      
      <CardContent className='content'>
        <Typography gutterBottom fontFamily={'Aladin,cursive'} variant="body2" component="div">
          {name}
        </Typography>
        <Typography fontFamily={'Aladin,cursive'} fontSize={12} color="text.secondary">
          team: {teamName}
          <br></br>
          position: {position}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PlayerPreview;