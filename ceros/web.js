// dummy express web server to serve static bundles
const express = require('express');
const app = express();
const port = Number(process.env.PORT || 5000);

app.use(express.static('dist'));

app.listen(port, () => console.log(`Listening on port ${port}. Hit CTRL-C to stop the server.`));