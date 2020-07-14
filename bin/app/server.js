const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const midtransRoute = require('./midtrans');

function AppServer(){
    this.server = new express();

    this.server.use(express.json());
    this.server.use(express.urlencoded());
    this.server.use(cookieParser())
    this.server.use(cors());

    this.server.use((req, res, next) => {
       if(req.method === 'OPTIONS'){
           res.send(405);
       }
       return next();
    });

    midtransRoute.routes(this.server);

}

module.exports = AppServer;