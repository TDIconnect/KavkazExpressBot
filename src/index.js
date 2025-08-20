const express = require('express');
const crypto = require('crypto');
const bot = require('./bot');

// launch bot
bot.launch().catch(err => console.error('Bot launch failed', err));

const app = express();
app.use(express.json());
app.use(express.static('public'));
const users = [];
const sessions = {};

// create default admin account on first run
function ensureAdmin() {
  if (!users.some(u => u.role === 'admin')) {
    users.push({ id: crypto.randomUUID(), username: 'admin', password: 'admin', role: 'admin' });
  }
}
ensureAdmin();

function authenticate(req, res, next) {
  const token = req.headers['x-session'];
  if (token && sessions[token]) {
    req.user = sessions[token];
    next();
  } else {
    res.status(401).json({ error: 'unauthenticated' });
  }
}

// admin signup (only allowed if no admin exists)
app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (users.some(u => u.role === 'admin')) {
    return res.status(400).json({ error: 'admin already exists' });
  }
  const user = { id: crypto.randomUUID(), username, password, role: 'admin' };
  users.push(user);
  res.json({ ok: true });
});

// login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: 'invalid credentials' });
  const token = crypto.randomUUID();
  sessions[token] = { id: user.id, username: user.username, role: user.role };
  res.json({ token });
});

// admin creates users
app.post('/users', authenticate, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'forbidden' });
  const { username, password, role } = req.body;
  const user = { id: crypto.randomUUID(), username, password, role };
  users.push(user);
  res.json({ id: user.id });
});

// current user info
app.get('/me', authenticate, (req, res) => {
  res.json(req.user);
});

require('./routes/chat')(app, authenticate);

app.listen(3000, () => console.log('server running on 3000'));
