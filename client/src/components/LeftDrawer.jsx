import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import navBarList from '../consts/navBarList' ; 
import { useNavigate } from 'react-router-dom';


const LeftDrawer = () => {
    const navigate = useNavigate()
    const drawerWidth = 240;
    return (
        <div>
           <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: "#555",
            color: "white",
            zIndex:'10',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {navBarList.map((item, index) => (
            <ListItem 
            onClick={()=>{navigate("/"+item.route)}}
            key={item.id} 
            disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{color:'white'}}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
        </div>
    )
}

export default LeftDrawer
