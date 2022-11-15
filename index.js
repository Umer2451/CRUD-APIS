const { json } = require('body-parser')
const bodyParser = require('body-parser')
const { response, application } = require('express')
const express = require('express')
const app = express()
const port = 3000
const pool = require('./dbConn')
const TodoRepo = require('./repository/todorepository')
const TodoController = require('./controllers/todoController')

const TODO_BASE_ROUTE = '/main'
const TODO_DELETE_ROUTE = '/deletetask'

const todoController = new TodoController()


app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  }
  )
)


app.get('/', (request, response) => {
  response.json({info : 'Node.js,Express, and Postgres API'})
})

app.get(TODO_BASE_ROUTE, todoController.getAll)

app.delete(TODO_DELETE_ROUTE, todoController.deleteTask)

app.put(TODO_BASE_ROUTE + '/update', todoController.UpdateTask)

app.put(TODO_BASE_ROUTE + '/updatedesc', todoController.UpdateDesc)

app.get(TODO_BASE_ROUTE + '/pending', todoController.TaskStatus)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

