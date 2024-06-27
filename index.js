const express = require('express');
const mongoose = require('./src/config/database');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const uploadRoutes = require('./src/routes/uploadRoutes');
const tradeRoutes = require('./src/routes/balanceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/apiDocs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/uploadCsv', uploadRoutes);
app.use('/getBalance', tradeRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
