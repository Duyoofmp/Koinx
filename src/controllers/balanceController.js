const Trade = require('../models/Trade');

exports.getBalance = async (req, res) => {
  const { timestamp } = req.body;
  if (!timestamp) {
    return res.status(400).send('Timestamp is required.');
  }

  try {
    const trades = await Trade.find({ UTC_Time: { $lt: timestamp } });
    
    const balances = {};
    
    for (const trade of trades) {
      const amount = trade.Operation === 'Buy' ? trade.Buy_Sell_Amount : -trade.Buy_Sell_Amount;
      if (!balances[trade.Base_Coin]) {
        balances[trade.Base_Coin] = 0;
      }
      balances[trade.Base_Coin] += amount;
    }
    
    res.status(200).json(balances);
  } catch (err) {
    res.status(500).send(err);
  }
};
