import './App.css';
import React, { useRef, useState } from 'react';

// Function to format header
function formatForSheet(header) {
  const namePattern = /Name: (.+?)\n/;
  const nameMatch = header.match(namePattern);
  const emailPattern = /Email: (.+?)\n/;
  const emailMatch = header.match(emailPattern);

  if (nameMatch && emailMatch) {
    return { name: nameMatch[1], email: emailMatch[1] };
  } else {
    return { name: '', email: '' };
  }
}

// Component for the main app
function App() {
  const [header, setHeader] = useState('');
  const [output, setOutput] = useState({ name: '', email: '' });

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {

    if (output.name && output.email) {
      const data = `${output.name}\t${output.email}`;
      navigator.clipboard.writeText(data)
        .then(() => {
          setCopySuccess('Copied!');
        })
        .catch((error) => {
          console.error('Failed to copy:', error);
          setCopySuccess('Failed to copy');
        });
    } 
  };

  const handleInputChange = (event) => {
    setHeader(event.target.value);
    setOutput(formatForSheet(event.target.value));
  };

  return (
    <div className='main'>
      <textarea ref={textAreaRef} value={header} onChange={handleInputChange}></textarea>
      <button onClick={copyToClipboard}>Copy</button>
      {copySuccess}
      <div className='results'>
        <p>Name: {output.name}</p>
        <p>Email: {output.email}</p>
      </div>
    </div>
  );
}

export default App;