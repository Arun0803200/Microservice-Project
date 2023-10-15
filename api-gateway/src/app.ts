const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');
require('dotenv').config(); // This loads the variables from .env into process.env

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
app.use(process.env.SUPER_ADMIN_PREFIX, proxy(`http://localhost:${process.env.SUPER_ADMIN_PORT}`));
app.use(process.env.SUPER_ADMIN_PREFIX, proxy(`http://localhost:${process.env.ADMIN_PORT}`));
app.get('/api', (req, res) => {
    return res.status(200).send({
        name: process.env.APP_NAME,
        version: process.env.VERSION
    })
})
app.listen(process.env.GATEWAY_PORT, () => {
    console.log(`api-gateway is listning the port: http://localhost:${process.env.GATEWAY_PORT}`);
});