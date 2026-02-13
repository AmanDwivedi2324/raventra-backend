import express from "express";
import { getInventory, addItem, updateItem, deleteItem } from "../controllers/inventoryController.js";

const router = express.Router();

router.get("/", getInventory);
router.post("/", addItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;