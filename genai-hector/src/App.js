import React, { useState } from 'react';
import { CircularProgress, Typography, Drawer, List, ListItem, ListItemText } from '@mui/material';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);
  const clearConversations = (event) => {
    event.preventDefault();
    setConversations([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/hector', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tone: tone,
          question: question,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();

      setConversations(prevConversations => [...prevConversations, { question: question, answer: data.answer }]);
      setQuestion('');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='grid-wrapper'>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', transition: 'background-color 0.5s ease-in-out' }}>
      <Drawer open={true} variant="permanent" anchor="left">
        <List>
          <ListItem>
            <ListItemText>
              <Typography variant="h4" style={{ color: '#333333' }}>Hector AI</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <div style={{ flex: 1, marginLeft: '240px', padding: '20px', backgroundColor: '#e6f7ff', transition: 'margin-left 0.5s ease-in-out' }}>
        {loading && <CircularProgress />}
        <div>
          {conversations.map((conversation, index) => (
            <div key={index} style={{ marginBottom: '10px', transition: 'margin-bottom 0.5s ease-in-out' }}>
              <div style={{ backgroundColor: '#0066cc', color: '#ffffff', padding: '8px', borderRadius: '4px', maxWidth: '300px', textAlign: 'right', marginLeft: 'auto' }}>
                <p>You: {conversation.question}</p>
              </div>
              <div style={{ backgroundColor: '#e6f7ff', color: '#0066cc', padding: '8px', borderRadius: '4px', maxWidth: '300px', textAlign: 'left', marginRight: 'auto' }}>
                <p>Hector: {conversation.answer}</p>
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <select value={tone} onChange={e => setTone(e.target.value)} style={{ padding: '8px', borderRadius: '4px', marginBottom: '10px', backgroundColor: '#e6f7ff', color: '#0066cc', border: 'none', transition: 'background-color 0.5s ease-in-out' }}>
            <option value="">Select a tone</option>
            <option value="surfer stoner dude">Surfer Dude</option>
            <option value="sarcastic teenage girl">Sarcastic teenager</option>
            <option value="furious">Angry</option>
            <option value="formal  english">Butler</option>
            <option value=" sexy and flirty">Flirty</option>
            <option value="army general">Army General</option>
          </select>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
            <input type="text" placeholder="Ask me anything!" value={question} onChange={e => setQuestion(e.target.value)} style={{ flex: 1, padding: '8px', borderRadius: '4px', border: 'none', transition: 'background-color 0.5s ease-in-out' }} />
            <button type="submit" style={{ padding: '10px', backgroundColor: '#0066cc', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.5s ease-in-out' }}>
              {loading ? 'Loading...' : 'Submit'}
            </button>
          </div>
          <button onClick={clearConversations} style={{ backgroundColor: '#0066cc', color: '#ffffff', padding: '8px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.5s ease-in-out' }}>
            Clear Conversation
          </button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default App;
