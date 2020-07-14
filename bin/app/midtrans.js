const midtransHandler = require('../modules/midtrans/handler/api_handler');

const routes = (server) => {
    server.post('/v1/payment/generate', midtransHandler.generateTransaction);
};

module.exports = {
    routes
};
