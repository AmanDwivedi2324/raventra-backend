import mongoose from "mongoose";

const inventorySchema = mongoose.Schema(
  {
    name: { type: String, required: true }, // e.g., "Mono Perc 540W Panel"
    category: { type: String, required: true }, // e.g., "Solar Panels"
    quantity: { type: Number, required: true, default: 0 },
    unit: { type: String, required: true }, // e.g., "pcs", "meters"
    minLevel: { type: Number, default: 5 }, // Alert if stock goes below this
  },
  { timestamps: true }
);

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;