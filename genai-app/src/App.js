import React, { useState } from 'react';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    fetch('/api/hector', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    tone: 'hippie',
    question: question,
  }),
})
  .then(response => response.json())
  .then(data => {
    console.log(data)
    setAnswer(data.answer)
  })
}

  return (
    <div className="App">
      <input type="text" value={question} onChange={e => setQuestion(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>

      <p>{answer}</p>
    </div>
  );
}

export default App;