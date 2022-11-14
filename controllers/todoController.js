const pool = require('../dbConn')
const TodoRepo = require('../repository/todorepository')

class TodoController{
    async getAll(request, response) {
        const TodoRepo = new TodoRepo();
        let res = await TodoRepo.getAllTasks();
        response.json({
            todo : res.rows
        })
    }

    async createTask(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.createTaskRepo(request.body.task, request.body.done, request.body.description);

        response.json({
            "status" : "task created"
        })
    }

}