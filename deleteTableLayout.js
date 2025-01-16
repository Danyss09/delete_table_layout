const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();

app.use(bodyParser.json());

// Database connection setup
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: 'dani0919', // replace with your MySQL password
    database: 'TableCreateDb'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL: ', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Delete Table Layout endpoint
app.delete('/delete-table/:tableId', (req, res) => {
    const tableId = req.params.tableId;

    if (!tableId) {
        return res.status(400).json({ message: 'Table ID is required' });
    }

    const query = 'DELETE FROM Tables WHERE TableID = ?';
    connection.query(query, [tableId], (err, result) => {
        if (err) {
            console.error('Error deleting table: ', err);
            return res.status(500).json({ message: 'Error deleting table' });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Table not found' });
        }

        res.status(200).json({ message: 'Table deleted successfully' });
    });
});

app.listen(3000, () => {
    console.log('Delete Table Layout microservice is running on port 3000');
});
