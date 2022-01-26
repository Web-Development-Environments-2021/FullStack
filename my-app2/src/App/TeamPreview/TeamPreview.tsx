import React,{FC} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { teamInfo } from '../../Interfaces';
import "./TeamPreview.css"
const TeamPreview: FC<teamInfo> = (props: teamInfo) => {
  const { logo,name,id} = props;

  return (
    <Card className="teamCard" sx={{ maxWidth: 180,height:150 , borderRadius:"20px"}}>
      <CardMedia
        component="img"
        height="100"
        image={logo}
        sx={{ width: 100 }}
        style={{display:"inline",marginTop:4,marginBottom:-18}}
      />
      <CardContent>
        <Typography fontFamily={'Aladin,cursive'} gutterBottom variant="h6" component="div">
          {name}
        </Typography>
        </CardContent>
    </Card>
  );
}

export default TeamPreview;