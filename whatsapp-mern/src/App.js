import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';

function App() {

  useEffect(() => {
    const pusher = new Pusher('a0909c6bc917edc7b906', {
      cluster: 'ap3'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (data) => {
      alert(JSON.stringify(data));
    });
  }, []);

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
