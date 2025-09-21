const express = require('express');
const { getAsync } = require('../redis');
const router = express.Router();

router.get('/', async (_, res) => {
  const count = await getAsync('added_todos');
  res.json({ added_todos: count || 0 });
});

module.exports = router;
