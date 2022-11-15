const pool = require('../dbConn')
const TodoRepo = require('../repository/todorepository')

class TodoController{
    async getAll(request, response) {
        const todoRepo = new TodoRepo();
        let res = await todoRepo.getAlltasks();
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

    async deleteTask(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.deleteTaskRepo(request.body.task)
        response.json({
            "status" : "task deleted"
        })
    }

    async UpdateTask(request,response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.Update(request.body.task, request.body.done, request.body.id)
        response.json({
            "status" : "task Updated"
        })
    }

    async UpdateDesc(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.UpdateDescription(request.body.description, request.body.id)
        response.json({
            "status" : "task's Description Updated"
        })

    }

    async TaskStatus(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.TS()

        response.json({
            "status" : "check console"
        })

        console.log(`${JSON.stringify(res.rows[0], '{}', 2)}`);

    }

    async BasicAuth(request, response){
        const todoRepo = new TodoRepo();
        let res = await todoRepo.getBasicAuth()

        if(response.body.basic_token == 'dW1lcjp1bWVy'){
            next()
        }
        
        else {
            response(404)
        }

        response.json({
            "status" : "lol"
        })
    }
}

module.exports = TodoController