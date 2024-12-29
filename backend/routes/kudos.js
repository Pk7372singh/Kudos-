const express = require('express');
const Kudos = require('../models/Kudos');
const User = require('../models/User');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/give', auth, async (req, res) => {
  try {
    const { senderEmail, recipientEmail, message, category } = req.body;

    const kudos = new Kudos({
      sender: senderEmail,
      recipient: recipientEmail,
      message,
      category,
    });

    await kudos.save();

    await User.findOneAndUpdate(
      { email: senderEmail },
      { $push: { kudosSent: kudos._id } }
    );

    await User.findOneAndUpdate(
      { email: recipientEmail },
      { $push: { kudosReceived: kudos._id } }
    );

    res.status(201).send(kudos);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get('/analytics', auth, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email })
      .populate('kudosReceived')
      .populate('kudosSent');

    const topReceivers = await Kudos.aggregate([
      {
        $group: {
          _id: '$recipient',
          kudos: { $sum: 1 },
        },
      },
      {
        $sort: { kudos: -1 },
      },
      {
        $limit: 5,
      },
      {
        $project: {
          name: '$_id',
          kudos: 1,
          _id: 0,
        },
      },
    ]);

    res.send({
      kudosReceived: user.kudosReceived,
      kudosSent: user.kudosSent,
      topReceivers,
    });
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
