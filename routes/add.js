let transactions = [];  // In-memory storage for transactions

// Route for adding points
import express from 'express';
const router = express.Router();

router.post('/', (req, res) => {
    const { payer, points, timestamp } = req.body;

    // Add the new transaction to the transactions array
    transactions.push({ payer, points, timestamp });

    res.status(200).send('Points added successfully.');
});

export { transactions };  // Export the transactions array so it can be used in other files
export default router;    // Export the router as the default export
