const errorHandling = require('../assets/utils/errorHandling')
const { serverError, requiredFields } = require('../assets/config/errors')
const Tasks = require('../models/tasks')

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Tasks.findAll({
      where: {
        userId: req.userId
      },
      order: [['createdAt', 'DESC']]
    })
    return res.status(200).json(tasks)
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}

exports.postTask = async (req, res, next) => {
  const { task } = req.body
  try {
    if (!task) {
      return errorHandling(next, requiredFields)
    }
    const taskResult = await Tasks.create({ task, userId: req.userId })
    return res.status(201).json(taskResult)
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}

exports.putTask = async (req, res, next) => {
  const { id } = req.params
  const { isCompleted } = req.body
  try {
    if (typeof isCompleted !== 'boolean') {
      return errorHandling(next, {
        message: 'isCompleted doit être un booléen.',
        statusCode: 400
      })
    }

    const taskResult = await Tasks.findOne({
      where: { id, userId: req.userId }
    })
    if (!taskResult) {
      return errorHandling(next, {
        message: 'La "tâche à faire" n\'existe pas.',
        statusCode: 404
      })
    }
    taskResult.isCompleted = isCompleted
    const taskSaved = await taskResult.save()
    return res.status(200).json(taskSaved)
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}

exports.deleteTask = async (req, res, next) => {
  const { id } = req.params
  try {
    const taskResult = await Tasks.findOne({
      where: { id, userId: req.userId }
    })
    if (!taskResult) {
      return errorHandling(next, {
        message: 'La "tâche à faire" n\'existe pas.',
        statusCode: 404
      })
    }
    await taskResult.destroy()
    return res
      .status(200)
      .json({ message: 'La "tâche à faire" a bien été supprimée!' })
  } catch (error) {
    console.log(error)
    return errorHandling(next, serverError)
  }
}
