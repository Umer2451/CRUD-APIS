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


app.get('/', (request, response) => {
  response.json({info : 'Node.js,Express, and Postgres API'})
})

app.get(TODO_BASE_ROUTE, todoController.getAll)

app.delete(TODO_DELETE_ROUTE, todoController.deleteTask)

app.put(TODO_BASE_ROUTE + '/update', todoController.UpdateTask)

app.put(TODO_BASE_ROUTE + '/updatedesc', todoController.UpdateDesc)

app.get(TODO_BASE_ROUTE + '/pending', todoController.TaskStatus)


// app.get('/testdb', async(request, response) => {
//     let res = await pool.query('select * from public.todoList')
//     //console.log(response);
//     response.json({info : res.rows})
// })


app.use(bodyParser.json())

app.use(
  bodyParser.urlencoded({
    extended: true,
  }
  )
)

// app.post('/create', async(req,res)=> {
//   let result = await pool.query('INSERT INTO public.todoList (task,done,description) VALUES($1,$2,$3) ', [req.body.task, req.body.done, req.body.description])
  
//   res.send('Created')
// })

// app.put('/update', async(req,res)=> {
//   let result = await pool.query('Update public.todoList SET task = $1, done = $2 where id = $3', [req.body.task, req.body.done, req.body.id])
  
//   res.send('Updated')
// })

// app.put('/updatedesc', async(req,res)=> {
//   let result = await pool.query('Update public.todoList SET description = $1 where id = $2', [req.body.description, req.body.id])
  
//   res.send('Updated')
// })


// app.delete('/delete', async(req,res) => {
//   let result = await pool.query('delete from public.todolist where task = $1', [req.body.task])
//   res.send('Deleted')
// })

// app.get('/pending', async(request,response) => {

//   //let allfalse = await pool.query('SELECT count(done), task FROM public.todolist where done = false GROUP BY task ORDER BY COUNT(done) DESC;')
//   let sum = await pool.query('select count(nullif(done, false)), count(nullif(done, true)), count(done) from public.todolist')
//   let truer = await pool.query('select count(done) from public.todolist where done = true')
//   let falser = await pool.query('select count(done) from public.todolist where done = false')

//  //response.json({info : allfalse.rows})
//   //response.json({info : total.rows})
//   response.json({ total: sum.rows, done: truer.rows, pending: falser.rows})

//   //var arr = [ sum.rows, truer.rows, falser.rows]

//   let string = sum.rows
//   let stringt = truer.rows
//   let stringthree = falser.rows
//   console.log(string)
//   console.log(stringt)

//   //var arrayLength = arr.length;
//   //for (var i = 0; i < arrayLength; i++) {
//     //console.log(`${JSON.stringify(arr[i], '', 2)}`);

//     //Do something
// })

// app.get('/count', async (req,res)=>{
//   let sum = await pool.query(`select count(*) as total,
//    ount(done) filter (where done = 'true') as Done,
//    count(done) filter (where done = 'false') as Pending
//    from public.todolist `)
//   res.json({todo: result.rows})
//   res.parse(result.rows)

//   response.json({ total: sum.rows})
// })

// app.get('/count', async (request,response)=>{
//   let result = await pool.query(`select count(*) as total,
//    count(done) filter (where done = 'true') as Done,
//    count(done) filter (where done = 'false') as Pending
//    from public.todolist `)
//    //res.json({todo: result.rows})

//   //res.parse(result.rows)
  
//   //var b = result.rows
//   ///var a= JSON.stringify(b)
//   //res.send(a)
//   //console.log(result)
//   var answer = result.rows[0]
//   console.log(`${JSON.stringify(result.rows[0], '{}', 2)}`);
//   truth = `${JSON.stringify(result.rows[0])}`

// })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

