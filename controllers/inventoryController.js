import Inventory from "../models/Inventory.js";

// @desc    Get all inventory
// @route   GET /api/inventory
export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find().sort({ name: 1 });
    res.status(200).json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add new item
// @route   POST /api/inventory
export const addItem = async (req, res) => {
  try {
    const { name, category, quantity, unit, minLevel } = req.body;
    const newItem = await Inventory.create({ name, category, quantity, unit, minLevel });
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update stock
// @route   PUT /api/inventory/:id
export const updateItem = async (req, res) => {
  try {
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete item
// @route   DELETE /api/inventory/:id
export const deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Item deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};