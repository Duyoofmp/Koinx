const express = require('express');
const mongoose = require('./src/config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const uploadRoutes = require('./src/routes/uploadRoutes');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/upload-csv', uploadRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
