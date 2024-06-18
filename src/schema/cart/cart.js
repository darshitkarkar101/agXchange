const mongoose = require("mongoose");
const enums = require("../../../json/enums.json");
const { SimpleDB } = require("aws-sdk");

module.exports = (connection) => {
  const cartSchema = new mongoose.Schema(
    {
      uid: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
      pid : { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      isInsurance : { type: Boolean, default: false },
      total : { type: Number },
      status : { type: String },
      description : { type: String },
      adminUserComments : { type: String },
      adminSellerComments : { type: String },
      sid : { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
      sellerComments : { type: String },
    },
    {
      autoCreate: true,
      timestamps: true,
    }
  );

  // return logsSchema;
  return connection.model("cart", cartSchema, "cart");
};
