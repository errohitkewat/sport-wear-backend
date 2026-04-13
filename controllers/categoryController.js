const Category = require("../models/Category");

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

exports.createCategory = async (req, res) => {
  try {
    const { title, description, image, isActive } = req.body;

    if (!title || !image) {
      return res.status(400).json({ message: "Title and image are required" });
    }

    const slug = makeSlug(title);

    const existingCategory = await Category.findOne({ slug });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists" });
    }

    const category = await Category.create({
      title,
      description,
      image,
      slug,
      isActive,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({
      createdAt: -1,
    });

    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSingleCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { title, description, image, isActive } = req.body;

    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let slug = category.slug;

    if (title && title !== category.title) {
      slug = makeSlug(title);

      const existingCategory = await Category.findOne({
        slug,
        _id: { $ne: req.params.id },
      });

      if (existingCategory) {
        return res
          .status(400)
          .json({ message: "Category title already exists" });
      }
    }

    category.title = title ?? category.title;
    category.description = description ?? category.description;
    category.image = image ?? category.image;
    category.isActive = isActive ?? category.isActive;
    category.slug = slug;

    await category.save();

    res.json({
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
