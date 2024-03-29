const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
require('dotenv').config(); // This loads the variables from .env into process.env

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use('/eticket', proxy(`http://localhost:9000`));
app.use('/admin', proxy(`http://localhost:9001`));
app.get('/api', (req, res) => {
    return res.status(200).send({
        name: process.env.APP_NAME,
        version: process.env.VERSION
    })
})
app.listen(8000, () => {
    console.log(`api-gateway is listning the port: http://localhost:${process.env.GATEWAY_PORT}`);
});