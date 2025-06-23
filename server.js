const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON data from requests
app.use(express.json());

// In-memory list to store to-do items
let todos = [];
let idCounter = 1;

// ✅ CREATE a new to-do (POST /todos)
app.post('/todos', (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  const newTodo = {
    id: idCounter++,
    title,
    completed: false,
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// 📄 READ all to-dos (GET /todos)
app.get('/todos', (req, res) => {
  res.json(todos);
});

// 🔍 READ a single to-do by ID (GET /todos/:id)
app.get('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'To-Do not found' });
  }

  res.json(todo);
});

// ✏️ UPDATE a to-do by ID (PUT /todos/:id)
app.put('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, completed } = req.body;

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'To-Do not found' });
  }

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json(todo);
});

// ❌ DELETE a to-do by ID (DELETE /todos/:id)
app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'To-Do not found' });
  }

  const deletedTodo = todos.splice(index, 1);
  res.json(deletedTodo[0]);
});

// 🚀 Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
