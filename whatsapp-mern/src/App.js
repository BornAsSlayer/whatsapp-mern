import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import React, { useState, useEffect } from 'react';
import axios from './axios';

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/messages/sync')
      .then(response => {
        console.log(response.data)
        setMessages(response.data);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('a0909c6bc917edc7b906', {
      cluster: 'ap3',
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, []);

  console.log(messages);

  return (
    <div className="app">
      <div className='app__body'>
        <Sidebar />
        <Chat />
      </div>

    </div>
  );
}

export default App;
