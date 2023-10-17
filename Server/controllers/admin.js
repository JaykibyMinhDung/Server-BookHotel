const Hotels = require("../model/hotel");
const Rooms = require("../model/room");
const Transactions = require("../model/transaction");
const User = require("../model/user");

exports.listTransactionsAdmin = () => {
    Transactions.find().then(transactions => {
        return res.status(200).json({
            statusCode: 200,
            message: 'Lấy giao dịch thành công',
            AllListTransaction: transactions
        })
    })
    return
}