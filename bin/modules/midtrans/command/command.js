const midtrans = require('midtrans-client');

class Snap{

    createTransaction(transactionParam) {
        let init =  new midtrans.Snap({
            isProduction: true,
            serverKey: 'Mid-server-ZOG1kc358VSrerfFIQVVjaXb',
            clientKey: 'Mid-client-7Vrfm1NiatBM-pOb'
        });

        let result = async (transactionParam) => {
            let generateTransaction = init.createTransaction(transactionParam)
            let result = {
                token : generateTransaction.token,
                redirect_url : generateTransaction.redirect_url
            }

            console.log(await generateTransaction);
        }

            return {
                result: result(transactionParam)
            };
    }
}

module.exports = Snap;