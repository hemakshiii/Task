import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';

function Home() {
  const [values, setValues] = useState({
    username: '',
    language: '',
    stdin: '',
    code: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (values.username && values.language && values.code && values.stdin) {
    
      const codeWithBreaks = values.code.replace(/\n/g, "<br>");
      const updatedValues = { ...values, code: codeWithBreaks };

      axios.post('http://localhost:5000/form', updatedValues)
        .then(res => {
          console.log("Successfully submitted");
          setValues({
            username: '',
            language: '',
            stdin: '',
            code: ''
          });
          navigate('/display-data'); 
        })
        .catch(err => console.log(err));
    } else {
      alert('Please fill in all fields.'); 
    }
  };

  return (
    <div className='container'>
      <h1>Task</h1>
      <form onSubmit={submitHandler}>
        <label>Username</label>
        <input type="text" placeholder='username' name='username' value={values.username} onChange={handleChange} required />
        <label>Code Language</label>
        <input type="text" placeholder='C++, Java, Python, JavaScript' name='language' value={values.language} onChange={handleChange} required />
        <label>Standard input</label>
        <input type="text" placeholder='stdin' name='stdin' value={values.stdin} onChange={handleChange} required />
        <label>Source Code</label>
        <textarea rows="5" placeholder='Enter source code' name='code' value={values.code} onChange={handleChange} required />
        <button type='submit' className='btn'>Submit</button>
      </form>
      <button style={{ backgroundColor: 'green', color: 'white', padding: '15px', cursor: 'pointer' }} onClick={() => navigate('/display-data')} className='btn'>Display Data</button>
    </div>
  );
}

export default Home;
