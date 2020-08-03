const { Router } = require('express')
const tasksController = require('../controllers/tasks')
const isAuth = require('../middlewares/isAuth')

const TasksRouter = Router()

TasksRouter.route('/')

  // Récupère les tâches à faire d'un user
  .get(isAuth, tasksController.getTasks)

  // Poster une nouvelle tâche à faire
  .post(isAuth, tasksController.postTask)

TasksRouter.route('/:id')

  // Permet de mettre une tâche à faire en isCompleted ou !isCompleted
  .put(isAuth, tasksController.putTask)

  // Supprimer une tâche à faire
  .delete(isAuth, tasksController.deleteTask)

module.exports = TasksRouter
