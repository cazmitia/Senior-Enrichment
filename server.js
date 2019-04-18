const express = require('express');
const app = express();
const path = require('path');
const {Campus, Student, initDb} = require('./db')

const port = process.env.PORT || 3000;

app.use(express.json())

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

app.post('/api/campuses', (req, res, next) => {
    return Campus.create(req.body)
    .then((campus) => res.json(campus))
})

app.post('/api/students', (req, res, next) => {
    return Student.create(req.body)
    .then((student => res.send(student)))
})

app.delete('/api/campuses/:id', (req, res, next) => {
    return Campus.destroy({where: {id: req.params.id}})
    .then(res.sendStatus(204))
})

app.delete('/api/students/:id', (req, res, next) => {
    return Student.destroy({where: {id: req.params.id}})
    .then(res.sendStatus(204))
})

app.put('/api/students/:id', (req, res, next) => {
    return Student.findByPk(req.params.id)
    .then(student => student.update(req.body))
    .then(student => res.send(student))
    .catch(next)
})
app.listen(port, () => console.log(`listening on port ${port}`))

initDb(true)
