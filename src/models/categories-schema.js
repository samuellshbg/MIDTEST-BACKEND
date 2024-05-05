const mongoose = require('mongoose');

const categoriesSchema = {
  name: String,
  type: String,
  description: String,
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
};

module.exports = categoriesSchema;
