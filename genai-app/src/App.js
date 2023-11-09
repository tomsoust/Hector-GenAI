import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, Typography, Box, createTheme, ThemeProvider, Container, CircularProgress, Drawer } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: '#006400', // darker green color
    },
    secondary: {
      main: '#ffffff', // white color
    },
    background: {
      default: '#333333', // dark grey background color
    },
    text: {
      primary: '#fff', // white text color
    },
  },
});

function App() {
  const [question, setQuestion] = useState('');
  const [tone, setTone] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    fetch('/api/hector', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        tone: tone,
        question: question,
      }),
    })
    .then(response => response.json())
    .then(data => {
      setConversations(prevConversations => [...prevConversations, { question: question, answer: '' }]);

      setTimeout(() => {
        setConversations(prevConversations => {
          let conversations = [...prevConversations];
          conversations[conversations.length - 1].answer = data.answer;
          return conversations;
        });
        setQuestion('');
      }, 1000); // 1000 milliseconds = 1 second
    })
    .finally(() => setLoading(false)); // Set loading to false regardless of success or failure
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer
  color="success"
  invertedColors={false}
  variant="soft"
>
  {/* Drawer content */}
</Drawer>
      <Container sx={{ backgroundColor: 'black' }}>
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'grey' }}>
          <Box>
          <Drawer
  color="success"
  invertedColors={false}
  variant="soft"
>
  {/* Drawer content */}
</Drawer>
          {conversations.map((conversation, index) => (
            <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box sx={{ padding: 1, borderRadius: 1, backgroundColor: 'primary.main', color: 'secondary.main', maxWidth: '80%' }}>
                <Typography variant="body1" sx={{ color: 'green' }}>You: {conversation.question}</Typography>
              </Box>
              <Box sx={{ padding: 1, borderRadius: 1, backgroundColor: 'secondary.main', color: 'primary.main', maxWidth: '80%' }}>
                <Typography variant="body1" sx={{ color: 'green' }}>Hector: {conversation.answer}</Typography>
              </Box>
            </Box>
          ))}
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <TextField label="Ask me anything!" variant="outlined" value={question} onChange={e => setQuestion(e.target.value)} sx={{ width: '70%' }} />
            <Select 
  value={tone} 
  onChange={e => setTone(e.target.value)} 
  variant="outlined" 
  sx={{ width: '70%' }}
  MenuProps={{
    PaperProps: {
      style: {
        backgroundColor: '#333333', // dark grey background color
      },
    },
  }}
>
              <MenuItem value="">Select a tone</MenuItem>
              <MenuItem value="surfer stoner dude">Surfer Dude</MenuItem>
              <MenuItem value="sarcastic teenage girl">Sarcastic teenager</MenuItem>
              <MenuItem value="furious">Angry</MenuItem>
              <MenuItem value="formal  english">Butler</MenuItem>
              <MenuItem value="army general">Army General</MenuItem>
              </Select>
            <Button type="submit" variant="contained" color="primary">
              {loading ? <CircularProgress size={24} color="secondary" /> : 'Submit'}
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;