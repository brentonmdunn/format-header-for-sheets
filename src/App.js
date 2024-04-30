import './App.css';
import React, { useRef, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const formatForSheet = (header) => {
  const namePattern = /Name: (.+?)\n/;
  const nameMatch = header.match(namePattern);
  const emailPattern = /Email: (.+?)\n/;
  const emailMatch = header.match(emailPattern);
  const pidPattern = /PID: ([AU]\d{8})\n/;
  const pidMatch = header.match(pidPattern);

  return { 
    name: nameMatch ? nameMatch[1] : '', 
    email: emailMatch ? emailMatch[1] : '', 
    pid: pidMatch ? pidMatch[1] : '' 
  };
}

function App() {
  const [header, setHeader] = useState('');
  const [output, setOutput] = useState({ name: '', email: '', pid: '' });
  const [copySuccess, setCopySuccess] = useState('Copy');
  const textAreaRef = useRef(null);

  const copyToClipboard = (e) => {
    const data = `${output.name ? output.name : ''}\t${output.email ? output.email : ''}\t${output.pid ? output.pid : ''}`;
    navigator.clipboard.writeText(data)
      .then(() => {
        setCopySuccess('Copied!');
      })
      .catch((error) => {
        console.error('Failed to copy:', error);
        setCopySuccess('Failed to copy');
      });
  };

  const handleInputChange = (event) => {
    setHeader(event.target.value);
    setOutput(formatForSheet(event.target.value));
    setCopySuccess('Copy')
  };

  const handleClear = (e) => {
    setCopySuccess('Copy')
    setHeader('')
    setOutput({ name: '', email: '', pid: '' })
  }

  return (
    <div className='main'>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={15}
        ref={textAreaRef} 
        value={header} 
        onChange={handleInputChange}
      />
      <div class="container">
        <div className='copy'>
          <Button variant="contained" onClick={copyToClipboard}>{copySuccess}</Button>
        </div>
        <div className="clear">
          <Button variant="outlined"  onClick={handleClear}>clear</Button>
        </div>
        <div className='results'>
          <p>Name: <span className="to-copy">{output.name}</span></p>
          <p>Email: <span className="to-copy">{output.email}</span></p>
          <p>PID: <span className="to-copy">{output.pid}</span></p>
        </div>
      </div>
    </div>
  );
}

export default App;