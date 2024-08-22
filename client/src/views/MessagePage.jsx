import { Container, Grid } from '@mui/material';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../components/UserList';
import Navbar from '../components/Navbar';
import Chat from '../components/Chat';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import io from 'socket.io-client';

const MessagePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [reciver, setReciver] = useState({});
  const [loading, setLoading] = useState(true);

  const [socket] = useState(() => io('http://localhost:8000'));

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      getAuth();
    } else {
      getAllFriends(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (user && reciver._id) {
      socket.emit('joinRoom', { ownerId: user._id, reciverId: reciver._id });
    }
  }, [user, reciver._id, socket]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off('message'); // Cleanup listener on unmount
    };
  }, [socket]);

  const getAuth = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/check-auth', { withCredentials: true });
      setUser(response.data.user);
      getAllFriends(response.data.user._id);
    } catch (error) {
      console.error('Error checking authentication', error);
      navigate('/403');
    }
  };

  const getAllFriends = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8000/api/follows/allfrind/${id}`);
      const friendsList = res.data.friends;
      if (friendsList.length > 0) {
        getMessages(friendsList[0]._id);
      }
      setFriends(friendsList);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching friends', err);
    }
  };

  const createMessage = async (sender, reciver, content) => {
    try {
      const res = await axios.post('http://localhost:8000/api/messages/send', { sender, reciver, content }, { withCredentials: true });
      const message = res.data.message;
      socket.emit('privateMessage', { senderId: sender._id, reciverId: reciver._id, message });
      setMessages((prevMessages) => [...prevMessages, message]);
    } catch (err) {
      console.error('Error sending message', err);
    }
  };

  const getMessages = async (friendId) => {
    try {
      const recv = friends.find((friend) => friend._id === friendId);
      if (recv) {
        setReciver(recv);
        socket.emit('joinRoom', { ownerId: user._id, reciverId: recv._id });
        setMessages([]);
        const res = await axios.get(`http://localhost:8000/api/messages/${friendId}/${user._id}`, { withCredentials: true });
        setMessages(res.data.messages);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <Container>
        <Grid container spacing={1}>
          <Grid item xs={4} marginTop={15}>
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
