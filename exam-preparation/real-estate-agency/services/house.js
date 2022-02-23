const Housing = require("../models/Housing");

exports.getAll = () => Housing.find().lean();
exports.getOne = (housingId) => Housing.findById(housingId).populate("tenants");
exports.create = (housingData) => Housing.create(housingData);
exports.getTopHouses = () =>
  Housing.find().sort({ createdAt: -1 }).limit(3).lean();

exports.addTenant = async (housingId, tenantId) => {
  Housing.findOneAndUpdate(
    { _id: housingId },
    { $push: { tenants: tenantId }, $inc: { availablePieces: -1 } }
  );
};

exports.delete = (housingId) => Housing.findByIdAndDelete(housingId);
exports.updateOne = (housingId, housingData) =>
  Housing.findByIdAndUpdate(housingId, housingData);
exports.search = (text) => Housing.find({ type: text });
