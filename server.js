const express = require('express');
const app = express();
const path = require('path');
const {Campus, Student, initDb} = require('./db')

const port = process.env.PORT || 3000;

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/campuses', (req, res, next) => {
    console.log(Campus)
    return Campus.findAll()
    .then(campuses => res.send(campuses))
})

app.get('/api/students', (req, res, next) => {
    return Student.findAll()
    .then(students => res.send(students))
})


app.listen(port, () => console.log(`listening on port ${port}`))

initDb(true)
