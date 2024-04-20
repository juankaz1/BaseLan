// App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    fetchEntries();
  }, []);

  const fetchEntries = async () => {
    try {
      const response = await fetch('http://localhost:4000/entries');
      const data = await response.json();
      setEntries(data.data);
    } catch (error) {
      console.error('Failed to fetch entries:', error);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:4000/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value: inputValue }),
    });
    if (response.ok) {
      fetchEntries();  // Refresh the entries after posting
      setInputValue(''); // Clear input field
    }
  };

  return (
    <div className="App">
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSubmit}>Submit</button>
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>{entry.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
