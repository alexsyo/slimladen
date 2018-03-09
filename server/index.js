const Express = require('express');

const app = Express();
const port = 3000;

app.use('/', (req, res) => res.send("abc"));
app.use('/abc', (req, res) => res.send("asfw"));

app.listen(port);

