module.exports = (app, authenticate) => {
  const messages = [];

  app.get('/messages', authenticate, (req, res) => {
    res.json(messages);
  });

  app.post('/messages', authenticate, (req, res) => {
    const { text } = req.body;
    messages.push({ user: req.user.username, text, timestamp: Date.now() });
    res.json({ ok: true });
  });
};
