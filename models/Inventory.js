import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    // Basic Info
    name: { type: String, required: true },
    sku: { type: String, default: "" }, // Item Code
    category: { type: String, required: true },
    brand: { type: String, default: "" },

    // Stock Details
    quantity: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true },
    minLevel: { type: Number, default: 5 },
    location: { type: String, default: "" },

    // Solar Specifics
    capacity: { type: String, default: "" },
    warrantyYears: { type: Number, default: 0 },
    serialNumbers: { type: String, default: "" }, // Stored as comma-separated string for simplicity

    // Financials & Vendors
    purchasePrice: { type: Number, default: 0 },
    supplierName: { type: String, default: "" },
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;