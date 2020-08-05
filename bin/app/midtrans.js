const midtransHandler = require('../modules/midtrans/handler/api_handler');

const routes = (server) => {
    server.post('/v1/api/payment/generate', midtransHandler.generatePayment);
    server.get('/v1/api/payment/update', midtransHandler.updateStatusPayment)
};

module.exports = {
    routes
};
