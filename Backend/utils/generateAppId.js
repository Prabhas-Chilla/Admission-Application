const Counter = require('../models/Counter');

async function getNextAppId() {
  const counter = await Counter.findOneAndUpdate(
    { name: 'applicationId' },
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );

  const padded = counter.seq.toString().padStart(4, '0');
  return `App${padded}`;
}

module.exports = getNextAppId;
