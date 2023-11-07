import React, { useState} from 'react';

import './App.css';


function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    fetch('http://localhost:3000/api/hector', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question,
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setAnswer(data.answer);
      });
  };

  return (
    <div className="App">
      <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{{ answer }} </p>
    </div>
  );
}

export default App;