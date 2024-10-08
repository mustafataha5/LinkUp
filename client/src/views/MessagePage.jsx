import { Container, Grid, CircularProgress } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import io from 'socket.io-client';
import AdminNavbar from '../components/AdminNavbar'; 

const MessagePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reciver, setReciver] = useState({});
  const [loading, setLoading] = useState(true);

  const socketUrl = 'http://51.20.56.131:8000'; // Update this to your public IP or domain
const [socket, setSocket] = useState(() => io(socketUrl, { transports: ['websocket'] }));

  const navigate = useNavigate();

  useEffect(() => {
    getAuth(); 
  }, []);

  useEffect(() => {
    return () => {
      console.log('Cleaning up socket');
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    socket.on('status', (data) => {
      LogOut(); 
    });
    if (user && reciver._id) {
      console.log('Socket connected:', socket.id);
      console.log('Emitting joinRoom with:', { senderId: user._id, reciverId: reciver._id });
      socket.emit('joinRoom', { senderId: user._id, reciverId: reciver._id });

      socket.on('message', (message) => {
        console.log('Received message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    }

    return () => {
      console.log('Cleaning up socket listeners');
      socket.off('message');
    };
  }, [user, reciver._id, socket]);

  const getAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
      setUser(response.data.user);
      getAllFriends(response.data.user._id);
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/401');
      } else if (error.response.status === 403) {
        navigate('/403');
      } else {
        navigate('/403');
      }
    }
  };

  const getAllFriends = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/follows/allfrind/${id}`);
      const friendsList = res.data.friends;
      if (friendsList.length > 0) {
        setReciver(friendsList[0]);
        getMessages(friendsList[0]._id);
        setLoading(false);
      }
      setFriends(friendsList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching friends', err);
    }
  };

  const createMessage = async (senderId, reciverId, content) => {
    try {
      const res = await axios.post('http://localhost:8000/api/messages/send', { sender: senderId, reciver: reciverId, content }, { withCredentials: true });
      const message = res.data.message;
      socket.emit('privateMessage', { senderId, reciverId, message });
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  const getMessages = async (friendId) => {
    try {
      const recv = friends.find((friend) => friend._id === friendId);
      if (recv) {
       
        setReciver(recv);
        const senderId = user._id;
        socket.emit('joinRoom', { senderId, reciverId: recv._id });
        setMessages([]);
        const res = await axios.get(`http://localhost:8000/api/messages/${friendId}/${user._id}`, { withCredentials: true });
        setMessages(res.data.messages);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  const LogOut = () => {
    axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
      .then(() => {
        setUser(null);
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  if (loading) {
    return (
      <>
        {user && (user.role === 'user' ? <Navbar /> : <AdminNavbar />)}
        <Container>
          <Grid container spacing={1} alignItems="center" justifyContent="center" style={{ height: '100vh' }}>
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }

  return (
    <div>
      {user.role === 'user' ? 
        <Navbar />
        : 
        <AdminNavbar />
      }
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={4} marginTop={15}  >
            <UserList
              onCardClick={getMessages}
              owner={user}
              initialUsers={friends}
              reciver={reciver}
              index={4}
            />
          </Grid>
          <Grid
            item xs={8}
            sx={{
              height: '100vh',
              
            }}
          >
            <Chat
              owner={user}
              reciver={reciver}
              messages={messages}
              createMessage={createMessage}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default MessagePage;
