import express from 'express';
import { transactions } from './add.js';  // Corrected import path

const router = express.Router();

router.post('/', (req, res) => {
    let points = req.body.points;
    let spentPoints = [];

    // Sort transactions by their timestamp
    const sortedTransactions = transactions.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Spending points starting from the oldest transaction
    for (const transaction of sortedTransactions) {
        if (points <= 0) break; // When all points are spent, break the loop

        const { payer, points: transactionPoints } = transaction;  // Fixed spelling

        if (transactionPoints > 0) {  // Only spend from transactions with positive points
            const pointsToDeduct = Math.min(points, transactionPoints);  // Deduct as much as needed or available
            transaction.points -= pointsToDeduct;  // Deduct from this transaction
            points -= pointsToDeduct;  // Subtract from the total points to be spent

            // Track how many points were spent from each payer
            const existingSpent = spentPoints.find(spent => spent.payer === payer);
            if (existingSpent) {
                existingSpent.points -= pointsToDeduct;  // Update the existing record
            } else {
                spentPoints.push({ payer, points: -pointsToDeduct });  // Create a new record
            }
        }
    }

    // If not all points were spent, return an error
    if (points > 0) {
        return res.status(400).send('Not enough points to spend.');
    }

    // Respond with the list of payers and points deducted
    res.status(200).json(spentPoints);
});

export default router;
