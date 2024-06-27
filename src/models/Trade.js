const mongoose = require('mongoose');

const TradeSchema = new mongoose.Schema({
  UTC_Time: { type: Date, required: true },
  Operation: { type: String, required: true, enum: ['Buy', 'Sell'] },
  Market: { type: String, required: true },
  Base_Coin: { type: String, required: true },
  Quote_Coin: { type: String, required: true },
  Buy_Sell_Amount: { type: Number, required: true },
  Price: { type: Number, required: true },
  accountId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Account' }
});

module.exports = mongoose.model('Trade', TradeSchema);
