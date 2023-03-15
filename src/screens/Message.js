import { AppBar, Avatar, Card, CardContent, IconButton, List, ListItem, TextField, Toolbar, Typography } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import React, { useEffect, useState } from 'react'
import {Menu, MenuItem } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';



import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import SentimentVerySatisfiedRoundedIcon from '@mui/icons-material/SentimentVerySatisfiedRounded';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import { useLocation } from 'react-router';
import {useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';


export default function Message() {


  const {addMessage} = useAuth();
  let {state} = useLocation();

  const doc = state.doc;
  const messages = state.msg.messages;
  const receiver = state.msg.participants.filter(e => e !== state.you)[0]

  const [anchorEl, setAnchorEl] = useState(null);
  const [data, setData] = useState("")

  const navigate = useNavigate()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const sendMsg = ()=>{
      console.log(state);
      addMessage(doc,state.you,data);
  };


  useEffect(() => {
    console.log(data);
  
    
  }, [data])
  


  
  return (
    <div style={{
      height: 600,
      display: 'flex',
      flexDirection: 'column',
      // backgroundColor: 'black'
    }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={()=>navigate(-1)}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" style={{ flex: 1 }}>
            {receiver}
          </Typography>
          <IconButton color="inherit" onClick={handleClick}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Mute Notifications</MenuItem>
            <MenuItem onClick={handleClose}>Block User</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>



      <List sx={{height: 500, overflowY: 'scroll','::-webkit-scrollbar': { width: '5px' },
    '::-webkit-scrollbar-thumb': { 
      background: '#ccc', 
      borderRadius: '10px' 
    },
    
    }}
    >
      {
        messages.map((msg,i) => {
        
        return (<ListItem key={i} style={{justifyContent:  msg.sender !== receiver? 'flex-end': 'flex-start'}}>
                  <Card sx={{ maxWidth: '70%', margin: '10px', 
                    padding: '0px', borderRadius: '12px', 
                    backgroundColor: msg.sender !== receiver? '#DCF8C6' : '#FFF' }}>
                    <CardContent sx={{ display: 'flex', alignItems: 'center', gap: '12px', }}>
                      <Avatar sx={{ width: '40px', height: '40px' }} alt={msg.sender !== receiver ? 'You' : 'Sender'} />
                      <Typography variant="subtitle1">{msg.msg }</Typography>
                    </CardContent>
                  </Card>
                </ListItem>);
          }
        )
      }
      </List>
      <div style={{ marginTop: 'auto',alignSelf: 'center', flexDirection: 'row' }}>
        {/* <TextField
        name='messagebox'
        type='email'
        variant="outlined"
        label="Message"
  
        />
        <IconButton color="primary"  >
          <SendIcon   sx={{ fontSize: 30, }} />
        </IconButton> */}

<Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: 492,borderRadius: '10px'}}
    >
      <IconButton sx={{ p: '10px' }} aria-label="emoji">
        <SentimentVerySatisfiedRoundedIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        fullWidth
        type="text"
        value={data}
        onChange={e => setData(e.target.value)}
        placeholder="Type a message"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="attachment">
        <AttachFileOutlinedIcon />
      </IconButton>
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton sx={{ p: '10px' }} aria-label="camera">
        <CameraAltOutlinedIcon />
      </IconButton>
      <IconButton color="primary" onClick={sendMsg} >
          <SendIcon   sx={{ fontSize: 30, }} />
        </IconButton> 
    </Paper>
    
      </div>

    </div>

  )
}
