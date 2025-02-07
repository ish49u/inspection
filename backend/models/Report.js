const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  inspectorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  requestId: { type: mongoose.Schema.Types.ObjectId, ref: "InspectionRequest" },
  filePath: String,
  name: String,
  uploadedAt: { type: Date, default: Date.now },
});

// Ensure MongoDB returns `id` instead of `_id`
reportSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Report", reportSchema);

