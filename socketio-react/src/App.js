import { useEffect, useState } from 'react';
import {
  initiateSocketConnection,
  disconnectSocket,
  subscribeToList,
  sendItem,
} from './socketio';
import './App.css';

const initialList = [
  {
    id: '1',
    name: 'Eric Vasconcelos',
    active: false,
    status: 'release',
    owner: null,
  },
  {
    id: '2',
    name: 'Ana carolina',
    active: false,
    status: 'release',
    owner: null,
  },
  {
    id: '3',
    name: 'José da silva',
    active: false,
    status: 'release',
    owner: null,
  },
];

function App() {
  const [items, setItems] = useState(initialList);

  useEffect(() => {
    initiateSocketConnection();

    subscribeToList((err, data) => {
      if (err) return;
      setItems((prevItems) => {
        const index = prevItems.findIndex((item) => item.id === data.id);
        const newPrevItems = [...prevItems];
        newPrevItems[index] = data;
        return newPrevItems;
      });
    });

    return () => {
      disconnectSocket();
    };
  }, []);

  const handleActive = (item) => {
    const newItem = {
      ...item,
      active: !item.active,
    };

    sendItem(newItem);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {items.map((item) => {
            const { id, name, active, status, owner } = item;
            return (
              <div key={id} className="item">
                <div className="item-id">id: {id}</div>
                <div className="item-name">name: {name}</div>
                <div className="item-active">
                  active:
                  <button onClick={() => handleActive(item)}>
                    {active ? 'on' : 'off'}
                  </button>
                </div>
                <div className="item-status">status: {status}</div>
                <div className="item-owner">owner: {owner || '-'}</div>
              </div>
            );
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
