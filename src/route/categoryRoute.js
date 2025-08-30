import express from "express";
import {
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory,
    seedCategory
} from "../controller/categoryController.js";

const router = express.Router();

router.post("/seed", seedCategory);
router.post("/", addCategory);
router.get("/", getCategories);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);

export default router;
