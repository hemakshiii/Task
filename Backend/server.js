
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'program'
});

app.post('/form', (req, res) => {
  const sql = "INSERT INTO program_detail (`username`,`language`,`stdin`,`code`) VALUES(?, ?, ?, ?)";
  const values = [req.body.username, req.body.language, req.body.stdin, req.body.code];
  db.query(sql, values, (err, result) => {
    if (err) {
      // console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data' });
    } else {
      // console.log('Data inserted successfully.');
      return res.status(200).json({ message: 'Data inserted successfully.' });
    }
  });
});

app.get('/data', (req, res) => {
  const sql = "SELECT * FROM program_detail";
  db.query(sql, (err, result) => {
    if (err) {
      // console.error('Error fetching data:', err);
      return res.status(500).json({ error: 'Error fetching data' });
    } else {
      // console.log('Data fetched successfully:', result); 
      return res.status(200).json(result);
    }
  });
});


app.listen(5000, () => {
  console.log('Server is Listening at port 5000');
});
