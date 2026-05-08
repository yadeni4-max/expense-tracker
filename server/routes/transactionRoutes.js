const express = require('express');
const router = express.Router();

const Transaction = require('../models/Transaction');
const authMiddleware = require('../middleware/authMiddleware');


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