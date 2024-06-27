const csv = require('csv-parser');
const Trade = require('../models/Trade');


const predefinedAccountId = '60d5ec59c4d1b342f8b7e4e3'; 
exports.uploadCsv = async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const results = [];
  const stream = require('stream');
  const bufferStream = new stream.PassThrough();
  bufferStream.end(req.file.buffer);

  bufferStream
    .pipe(csv())
    .on('data', (data) => {
      const [Base_Coin, Quote_Coin] = data.Market.split('/');
      results.push({
        UTC_Time: new Date(data.UTC_Time),
        Operation: data.Operation,
        Market: data.Market,
        Base_Coin,
        Quote_Coin,
        Buy_Sell_Amount: parseFloat(data['Buy/Sell Amount']),
        Price: parseFloat(data.Price),
        accountId: predefinedAccountId 
      });
    })
    .on('end', async () => {
      try {
        const docs = await Trade.insertMany(results);
        res.status(200).send(docs);
      } catch (err) {
        res.status(500).send(err);
      }
    });
};
