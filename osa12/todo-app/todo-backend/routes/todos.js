const express = require('express');
const { Todo } = require('../mongo');
const router = express.Router();
const { getAsync } = require('../redis');
const { setAsync } = require('../redis');

/* GET todos listing. */
router.get('/', async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post('/', async (req, res) => {
  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });

  const currentCount = await getAsync('added_todos');
  const newCount = (Number(currentCount) || 0) + 1;
  await setAsync('added_todos', newCount);

  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete('/', async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo by id */
singleRouter.get('/', async (req, res) => {
  res.send(req.todo);
});

/* PUT todo (update) */
singleRouter.put('/', async (req, res) => {
  const { text, done } = req.body;

  if (text !== undefined) req.todo.text = text;
  if (done !== undefined) req.todo.done = done;

  await req.todo.save();
  res.send(req.todo);
});

router.use('/:id', findByIdMiddleware, singleRouter);

module.exports = router;
