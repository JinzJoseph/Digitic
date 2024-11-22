const Brand = require("../models/brandModel");
const asynHandler = require("express-async-handler");
const validateMongodbId = require("../utils/validateMongodbId");

const createBand = asynHandler(async (req, res) => {
  try {
    const newCategory = await Brand.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const updateBrand = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const updateCategory = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updateCategory);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteBrand = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteCategory = await Brand.findByIdAndDelete(id);
    res.json(deleteCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getBrand = asynHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getCategory = await Brand.findById(id);
    res.json(getCategory);
  } catch (error) {
    throw new Error(error);
  }
});
const getAllBrand = asynHandler(async (req, res) => {
  try {
    const getAllCategory = await Brand.find();
    res.json(getAllCategory);
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createBand,
  updateBrand,
  deleteBrand,
  getBrand,
  getAllBrand,
};
