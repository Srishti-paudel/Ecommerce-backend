import db from "../database/connection.js";

const Category = db.categories;

// Seed initial categories
const seedCategory = async () => {
    const categoryData = [
        { categoryName: "Electronics" },
        { categoryName: "Groceries" },
        { categoryName: "Foods" }
    ];

    const datas = await Category.findAll();
    if (datas.length === 0) {
        await Category.bulkCreate(categoryData);
        console.log("Categories seeded successfully");
    } else {
        console.log("Categories already seeded");
    }
};

// Add a new category
const addCategory = async (req, res) => {
    const { categoryName } = req.body;
    if (!categoryName) {
        return res.status(400).json({ message: "Please provide categoryName" });
    }
    const category = await Category.create({ categoryName });
    res.status(200).json({ message: "Category created successfully", data: category });
};

// Get all categories
const getCategories = async (req, res) => {
    const data = await Category.findAll();
    res.status(200).json({ message: "Fetched categories", data });
};

// Delete a category by id
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: "Please provide id to delete" });

    const data = await Category.findAll({ where: { id } });
    if (data.length === 0) return res.status(404).json({ message: "No category with that id" });

    await Category.destroy({ where: { id } });
    res.status(200).json({ message: "Category deleted successfully" });
};

// Update a category by id
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { categoryName } = req.body;

    if (!id || !categoryName) {
        return res.status(400).json({ message: "Please provide id and categoryName to update" });
    }

    const data = await Category.findAll({ where: { id } });
    if (data.length === 0) return res.status(404).json({ message: "No category with that id" });

    await Category.update({ categoryName }, { where: { id } });
    res.status(200).json({ message: "Category updated successfully" });
};

// Export functions
export {
    seedCategory,
    addCategory,
    getCategories,
    deleteCategory,
    updateCategory
};
