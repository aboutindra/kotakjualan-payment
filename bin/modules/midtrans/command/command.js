require('dotenv').config()
const midtrans = require('midtrans-client');
const db = require('../../../utils/database/mongodb/connection');
const queryDomain = require('./../query/domain');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');

class Snap{

    constructor() {
        this.db = new queryDomain(db);
    }

    async createPayment(paymentParam) {
        console.log("\nParam : ", paymentParam)
        let init =  new midtrans.Snap({
            isProduction: true,
            serverKey: process.env.MIDTRANS_SERVER_KEY_PRODUCTION,
            clientKey: process.env.MIDTRANS_CLIENT_KEY_PRODUCTION
        });

        let result = async (transactionParam) => {
            let orderId = uuidv4();
            let snapParameter = {
                'transaction_details' : {
                    'order_id' : orderId,
                    'gross_amount' : transactionParam.gross_amount,
                },
                'item_details' : transactionParam.item_details,
                'expiry' : {
                    'unit' : 'minute',
                    'duration' : '9000'
                },
                'callbacks' : {
                    'finish' : process.env.URL_PAYMENT_PRODUCTION + '/v1/api/payment/update?id_payment=' + orderId
                }
            }
            let generateTransaction = await init.createTransaction(snapParameter);
            let insertParam = {
                'isPaid' : false,
                'createdAt' : new Date(),
                'updatedAt' : new Date(),
                ...snapParameter.transaction_details,
                ...generateTransaction,
                ...transactionParam,
            }

            let insertHistoryPayment = await this.db.insertPayment(insertParam);
            let status = {
                ...generateTransaction,
                ...insertHistoryPayment
            }
            return status
        }

            return await result(paymentParam);
    }

    async updateStatusPayment(idPayment, updatedData){
        let findUpdate;
        let statusOrder;

        let statusUpdate = await this.db.updatePayment(idPayment, updatedData)

        if(statusUpdate.code == 200){
            findUpdate = await this.db.find(idPayment);
            statusOrder = {
                'status':200,
                'message' : await axios.post(process.env.URL_ORDER_PRODUCTION + '/v1/api/order/insert', findUpdate )
            }
        } else {
            statusOrder = {
                ...statusUpdate
            }
        }


        return statusOrder
    }

}

module.exports = Snap;
