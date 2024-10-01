import express from 'express';
import addRoutes from './routes/add.js';
import spendRoutes from './routes/spend.js';
import balanceRoutes from './routes/balance.js';  // Import the balance route

const app = express();
const PORT = 8000;

app.use(express.json());  // Middleware for parsing JSON requests

// Use the routes
app.use('/add', addRoutes);
app.use('/spend', spendRoutes);
app.use('/balance', balanceRoutes);  // Use the balance route

app.get('/', (req, res) => res.send());  // Root route

app.listen(PORT, () => {
});
