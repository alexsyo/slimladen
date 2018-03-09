const Express = require('express');

const app = Express();
const port = 8080;

app.use('/', (req, res) => res.send("abc"));
app.use('/abc', (req, res) => res.send("asfw"));

app.listen(port);

