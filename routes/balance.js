import express from 'express';
import { transactions } from './add.js';  // Import the transactions from add.js

const router = express.Router();

router.get('/', (req, res) => {
    let balance = {};  // Object to store the balance for each payer

    // Loop through the transactions and calculate the balance for each payer
    transactions.forEach(transaction => {
        const { payer, points } = transaction;

        if (!balance[payer]) {
            balance[payer] = 0;  // Initialize payer's balance if not already present
        }

        balance[payer] += points;  // Add the transaction points to the payer's balance
    });

    // Respond with the balance object
    res.status(200).json(balance);
});

export default router;
