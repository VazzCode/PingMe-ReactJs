import { Button, TextField, List, ListItemButton, ListItemText, Avatar, AppBar, Toolbar, IconButton, MenuItem, Menu, Typography} from '@mui/material';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {collection, doc, getDoc ,getDocs, query} from 'firebase/firestore';
import React, { useState , useEffect} from 'react'
import { Link , useNavigate } from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {db} from "../firebase";
import { async } from '@firebase/util';

export default function Home() {

	// const firestore = firebase.firestore();

    const {currentUser, logout, getSnap} = useAuth()
	const [messages, setMessages] = useState([])
    const [data, setData] = useState();
    const navigate = useNavigate();
	

	const [anchorEl, setAnchorEl] = useState(null);

    const fetchPost = async ()=>{

    	try{

      		const docSnap = await getSnap("users", currentUser && currentUser.email);
			// getDoc(doc(db, "users", currentUser && currentUser.email))
        	setData(docSnap.data());
			docSnap.data().messages.forEach(async dat =>{
				// setMessages(prev =>   [ ...prev , getDoc(doc(db,"messages", data)).data() ])

				let d = await getSnap("messages", dat);
				// getDoc(doc(db,"messages", dat))

				setMessages(prev => [...prev, d.data()]);
			})

		}catch(e){
			console.log(e);
		}
    }

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	  };
	
	  const handleClose = async (e) => {
		let pressed = e.target.innerText;
		if (pressed === "Mute Notifications"){
			console.log(pressed)
		}
		if (pressed === "Logout"){
			console.log(pressed)
			await logout(); 
			navigate("/");
		}
		setAnchorEl(null);
	  };

	useEffect(() => {
		setMessages([])
		fetchPost();
	}, [])

	useEffect(() => {
		console.log(messages);
	}, [messages])

  	return (
		<div style={{ height: 700,minWidth: 492}}>
		<AppBar position="static">
			<Toolbar>
			<Typography variant="h6" style={{ flex: 1 }}>
				Messages
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
				<MenuItem onClick={handleClose}>Logout</MenuItem>
			</Menu>
			</Toolbar>
		</AppBar>
			
			<List >
				{messages.map((msg,i) =>{
					return (
				 <ListItemButton
					key={i}
					sx={{ '&:hover': {bgcolor: '#f5f5f5'}, borderRadius: '10px', }}
					onClick={()=> {
						console.log("clicked ",msg.messages)
						navigate('/message',{state:{msg: msg,you: data.Name}})
					}}
				 	>
					 	<div style={{ display: 'flex', alignItems: 'center', gap: '12px'}}> <Avatar sx={{ width: '40px', height: '40px' }} alt={msg.sender === 'vasuuu' ? 'You' : 'Sender'} />
						<ListItemText primary={msg.participants.filter(e => e !== data.Name)[0]} secondary={msg.messages[msg.messages.length -1].msg} sx={{ color: 'black'}}/></div>
				 </ListItemButton>
				)})}
			</List>


			
			
			{/* <h3>E-Maidl: {data && data.Email}</h3>
			<h3>Username: {data && data.Name}</h3>
			<h3>Mobile Number: {data && data.Mobile}</h3> */}
			
			{/* <Button variant='contained' onClick={async()=>{await logout(); navigate("/")}}>Log out</Button>     */}
		</div>
  	)
}