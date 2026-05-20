const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');


/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Add a new transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 500
 *               type:
 *                 type: string
 *                 example: income
 *               category:
 *                 type: string
 *                 example: Salary
 *               date:
 *                 type: string
 *                 example: 2026-05-19
 *     responses:
 *       201:
 *         description: Transaction added successfully
 *       500:
 *         description: Server error
 */

// ADD TRANSACTION
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { amount, type, category, date } = req.body;

    const transaction = new Transaction({
      userId: req.user.id,
      amount,
      type,
      category,
      date
    });

    await transaction.save();

    res.status(201).json({
      message: 'Transaction added successfully',
      transaction
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all user transactions
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of user transactions
 *       500:
 *         description: Server error
 */

// GET ALL USER TRANSACTIONS
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    }).sort({ date: -1 });

    res.json(transactions);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


/**
 * @swagger
 * /api/transactions/{id}:
 *   delete:
 *     summary: Delete a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Transaction deleted successfully
 *       500:
 *         description: Server error
 */

// DELETE TRANSACTION
router.delete('/:id', authMiddleware, async (req, res) => {
  try {

    await Transaction.findByIdAndDelete(req.params.id);

    res.json({
      message: 'Transaction deleted'
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


/**
 * @swagger
 * /api/transactions/{id}:
 *   put:
 *     summary: Update a transaction
 *     tags: [Transactions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 300
 *               type:
 *                 type: string
 *                 example: expense
 *               category:
 *                 type: string
 *                 example: Food
 *               date:
 *                 type: string
 *                 example: 2026-05-19
 *     responses:
 *       200:
 *         description: Transaction updated successfully
 *       500:
 *         description: Server error
 */

// UPDATE TRANSACTION
router.put('/:id', authMiddleware, async (req, res) => {
  try {

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      message: 'Transaction updated',
      transaction: updatedTransaction
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });
  }
});


module.exports = router;