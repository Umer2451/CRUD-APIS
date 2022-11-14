const pool = require('../dbConn')

class TodoRepo {

    async getAlltasks() {
        return await pool.query('select * from public.todolist')
    }

    async createTaskRepo(task, done, description) {
        return await pool.query('INSERT INTO public.todoList (task,done,description) VALUES($1,$2,$3)'
        , [task, done, description]);
    }
}

module.exports = TodoRepo;
