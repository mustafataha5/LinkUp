import { Container, Grid } from '@mui/material'
import React from 'react'
import UserList from '../components/UserList' ;
import Navbar from '../components/Navbar' ;
import Chat from '../components/Chat';

const MessagePage = () => {
  return (
    <div>
        <Navbar />
        <Container >
           <Grid container spacing={1}>

                <Grid item xs={4}>
                        <UserList />
                </Grid>
                <Grid  
                item xs={8}
                sx={{
                  height: "100vh",  
                }}
                >
                    <Chat 
                   
                    name="you" 
                    messages={''}

                    ></Chat>
                </Grid>

           </Grid>
        </Container>
    </div>
  )
}

export default MessagePage
