const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://duyoof:qwertyuiop@atlascluster.tnkmaki.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;
