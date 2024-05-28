import express from "express";
import mysql from "mysql";
import bodyParser from "body-parser";
import cors from 'cors';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

// Set up Multer for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Get all employees
app.get('/', (req, res) => {
    const sql = "SELECT * FROM employee";
    db.query(sql, (err, result) => {
        if (err) return res.json({ message: err });
        return res.json(result);
    });
});

// Get employee by EmpID
app.get('/employee/:EmpID', (req, res) => {
    const { EmpID } = req.params;
    const sql = "SELECT * FROM employee WHERE EmpID = ?";
    db.query(sql, [EmpID], (err, result) => {
        if (err) return res.json({ message: err });
        if (result.length === 0) return res.status(404).json({ message: 'Employee not found' });
        return res.json(result[0]);
    });
});

// Update employee
app.put('/employee/:EmpID', upload.single('EmpPhoto'), (req, res) => {
    const { EmpID } = req.params;
    const { EmpName, EmpAge, EmpDept } = req.body;
    const EmpPhoto = req.file ? req.file.path : null;

    if (!EmpName || !EmpAge || !EmpDept) {
        return res.status(400).json({ message: 'Missing fields in request body' });
    }

    const sql = EmpPhoto
        ? "UPDATE employee SET EmpName = ?, EmpAge = ?, EmpDept = ?, EmpPhoto = ? WHERE EmpID = ?"
        : "UPDATE employee SET EmpName = ?, EmpAge = ?, EmpDept = ? WHERE EmpID = ?";
    const params = EmpPhoto ? [EmpName, EmpAge, EmpDept, EmpPhoto, EmpID] : [EmpName, EmpAge, EmpDept, EmpID];

    db.query(sql, params, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ message: err });
        }
        return res.json({ message: 'Employee updated successfully', result });
    });
});

// Add new employee
// Add new employee with file upload
app.post('/employee', upload.single('EmpPhoto'), (req, res) => {
    const { EmpName, EmpAge, EmpDept, EmpNumber } = req.body;
    const EmpPhoto = req.file ? req.file.path : null;

    if (!EmpName || !EmpAge || !EmpDept || !EmpNumber) {
        return res.status(400).json({ message: 'All fields (EmpName, EmpAge, EmpDept, EmpNumber) are required' });
    }

    // You can add additional checks for file size, file types, etc. here

    const sql = "INSERT INTO employee (EmpName, EmpAge, EmpDept, EmpNumber, EmpPhoto) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [EmpName, EmpAge, EmpDept, EmpNumber, EmpPhoto], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error adding employee', error: err });
        }
        return res.status(201).json({ message: 'Employee added successfully', result });
    });
});


// Delete employee
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
