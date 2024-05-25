import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: "3306",
    password: "password",
    database: "kumardb1"
});


db.connect((err) => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

// get operation

app.get('/', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: err });
        return res.json(result);
    });
});

// put operation

app.put('/employee/:EmpID', (req, res) => {
    const { EmpID } = req.params;
    const { EmpName, EmpAge, EmpDept } = req.body;

    if (!EmpName || !EmpAge || !EmpDept) {
        return res.status(400).json({ message: 'Missing fields in request body' });
    }

    const sql = "UPDATE employee SET EmpName = ?, EmpAge = ?, EmpDept = ? WHERE EmpID = ?";
    db.query(sql, [EmpName, EmpAge, EmpDept, EmpID], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ message: err });
        }
        return res.json({ message: 'Employee updated successfully', result });
    });
});

//post operation

app.post('/employee', (req, res) => {
    const { EmpName, EmpAge, EmpDept } = req.body;
    if (!EmpName || !EmpAge || !EmpDept) {
        return res.status(400).json({ message: 'All fields (EmpName, EmpAge, EmpDept) are required' });
    }
    
    const sql = "INSERT INTO employee (EmpName, EmpAge, EmpDept) VALUES (?, ?, ?)";
    db.query(sql, [EmpName, EmpAge, EmpDept], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ message: err });
        }
        return res.json({ message: 'Employee added successfully', result });
    });
});


//delete opeartion


app.delete('/employee/:EmpID', (req, res) => {
    const { EmpID } = req.params;
    const sql = "DELETE FROM employee WHERE EmpID = ?";
    db.query(sql, [EmpID], (err, result) => {
        if (err) return res.json({ message: err });
        return res.json({ message: 'Employee deleted successfully', result });
    });
});


app.listen(3000, () => {
    console.log("hello from backend");
});
