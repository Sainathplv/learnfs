require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');  // Import Sequelize instance
const authRoutes = require('./routes/auth');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

// Start the server after connecting to DB
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected successfully');
    return sequelize.sync({ alter: true });  // Ensure DB schema is updated
  })
  .then(() => {
    app.listen(process.env.PORT || 5001, () => {
      console.log(`Server running on port ${process.env.PORT || 5001}`);
    });
  })
  .catch(err => console.error('Database connection error:', err));