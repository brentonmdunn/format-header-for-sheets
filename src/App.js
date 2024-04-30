import './App.css';
import React, { useRef, useState } from 'react';

// Function to format header
function formatForSheet(header) {
  const namePattern = /Name: (.+?)\n/;
  const nameMatch = header.match(namePattern);
  const emailPattern = /Email: (.+?)\n/;
  const emailMatch = header.match(emailPattern);
  const pidPattern = /PID: ([AU]\d{8})\n/;
  const pidMatch = header.match(pidPattern);

  if (nameMatch && emailMatch && pidMatch) {
    return { name: nameMatch[1], email: emailMatch[1] , pid: pidMatch[1]};
  } else {
    return { name: '', email: '', pid: '' };
  }
}

// Component for the main app
function App() {
  const [header, setHeader] = useState('');
  const [output, setOutput] = useState({ name: '', email: '', pid: '' });

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {

    if (output.name && output.email) {
      const data = `${output.name}\t${output.email}\t${output.pid}`;
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
    setCopySuccess('')
  };

  return (
    <div className='main'>
      <textarea ref={textAreaRef} value={header} onChange={handleInputChange}></textarea>
      <button onClick={copyToClipboard}>Copy</button>
      {copySuccess}
      <div className='results'>
        <p>Name: {output.name}</p>
        <p>Email: {output.email}</p>
        <p>PID: {output.pid}</p>
      </div>
    </div>
  );
}

export default App;