import React, { useState} from 'react';
import axios from 'axios';
import './App.css';


function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    axios.post('http://localhost:3000/run_python_code', { question })
      .then(response => {
        setAnswer(response.data.answer);
      });
  };

  return (
    <div className="App">
      <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <p>{answer}</p>
    </div>
  );
}

export default App;