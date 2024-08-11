const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'banner_db'
});

db.connect((err) => {
  if (err) {
    console.error('error connecting:', err);
    return;
  }
  console.log('connected as id ' + db.threadId);
});

// API endpoint to retrieve banner data
app.get('/api/banner', (req, res) => {
  const query = 'SELECT * FROM banners';
  db.query(query, (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error retrieving banner data' });
    } else {
      res.send(rows);
    }
  });
});

// API endpoint to update banner data
app.post('/api/banner', (req, res) => {
  const { description, timer, link } = req.body;
  const query = 'UPDATE banners SET description = ?, timer = ?, link = ?';
  db.query(query, [description, timer, link], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: 'Error updating banner data' });
    } else {
      res.send({ message: 'Banner data updated successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
