import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayData() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const truncateCode = (code) => {
    let truncatedCode = code.substring(0, 100); 
    truncatedCode = truncatedCode.replace(/\n/g, '<br>'); 
    return truncatedCode;
  };

  return (
    <div className='contain'>
      <h1>Database Results</h1>
      <table className='table'>
        <thead>
          <tr>
            <th>Username</th>
            <th>Language</th>
            <th>Standard Input</th>
            <th>Code</th>
            <th>TimeStamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.username}</td>
              <td>{item.language}</td>
              <td>{item.stdin}</td>
              <td dangerouslySetInnerHTML={{ __html: truncateCode(item.code) }}></td> 
              <td>{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayData;
